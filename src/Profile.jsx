import './index.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { auth, db } from './firebase'
import { signOut } from 'firebase/auth'
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore'

function Profile({ user }) {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (user) fetchMyPosts()
  }, [user])

  const fetchMyPosts = async () => {
    const q = query(collection(db, 'posts'), where('author', '==', user.email))
    const snapshot = await getDocs(q)
    setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
  }

  const handleDelete = async (postId) => {
    await deleteDoc(doc(db, 'posts', postId))
    fetchMyPosts()
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  if (!user) {
    return (
      <div>
        <nav>
          <h1>Think Hub</h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/forum">Forums</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
        <div className="form-container">
          <div className="form-box">
            <h2>Please Login! 👋</h2>
            <p>You need to login to view your profile!</p>
            <Link to="/login"><button className="form-btn">Go to Login</button></Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <nav>
        <h1>Think Hub</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/forum">Forums</Link></li>
          <li><Link to="/profile">👤 {user.email.split('@')[0]}</Link></li>
          <li><a href="#" onClick={handleLogout}>Logout</a></li>
        </ul>
      </nav>

      {/* PROFILE HEADER */}
      <div className="profile-header">
        <div className="profile-avatar">
          {user.email[0].toUpperCase()}
        </div>
        <h2>{user.email.split('@')[0]}</h2>
        <p>{user.email}</p>
        <button className="form-btn logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* MY POSTS */}
      <div className="discussion-container">
        <h2 className="my-posts-title">📝 My Posts ({posts.length})</h2>

        {posts.length === 0 && (
          <p style={{textAlign:'center', padding:'40px', color:'#888'}}>
            You haven't posted anything yet! 🚀
          </p>
        )}

        {posts.map(post => (
          <div className="discussion-item my-post-item" key={post.id}>
            <div className="discussion-info">
              <Link to={`/discussion/${post.id}`} className="discussion-link">
                <h3>{post.title}</h3>
              </Link>
              <p>{post.category} · 👍 {post.likes} Likes · 💬 {post.replies} Replies</p>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(post.id)}>
              🗑️ Delete
            </button>
          </div>
        ))}
      </div>

      <footer>
        <p>© 2024 Think Hub. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Profile