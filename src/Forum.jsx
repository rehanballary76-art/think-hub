import './index.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { db, auth } from './firebase'
import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore'

function Forum() {
  const [posts, setPosts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Web Development')
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    if (search === '') {
      setFiltered(posts)
    } else {
      setFiltered(posts.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      ))
    }
  }, [search, posts])

  const fetchPosts = async () => {
    const q = query(collection(db, 'posts'), orderBy('date', 'desc'))
    const snapshot = await getDocs(q)
    const postList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setPosts(postList)
    setFiltered(postList)
  }

  const handleNewPost = async () => {
    if (!auth.currentUser) {
      navigate('/login')
      return
    }
    if (!title) return
    await addDoc(collection(db, 'posts'), {
      title: title,
      category: category,
      author: auth.currentUser.email,
      likes: 0,
      replies: 0,
      date: new Date()
    })
    setTitle('')
    setShowForm(false)
    fetchPosts()
  }

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

      <div className="forum-header">
        <h2>💬 All Discussions</h2>
        <p>Browse and join conversations on any topic!</p>
        <button className="form-btn new-post-btn"
          onClick={() => setShowForm(!showForm)}>
          + New Post
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Search discussions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
      </div>

      {showForm && (
        <div className="new-post-form">
          <input type="text" placeholder="Enter your question title..."
            value={title} onChange={(e) => setTitle(e.target.value)} />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Web Development</option>
            <option>Artificial Intelligence</option>
            <option>Mobile Development</option>
            <option>Cyber Security</option>
            <option>Game Development</option>
            <option>Cloud Computing</option>
          </select>
          <button className="form-btn" onClick={handleNewPost}>Post Question</button>
        </div>
      )}

      <div className="discussion-container">
        {filtered.length === 0 && (
          <p style={{textAlign:'center', padding:'40px', color:'#888'}}>
            No posts found! 🔍
          </p>
        )}
        {filtered.map(post => (
          <Link to={`/discussion/${post.id}`} className="discussion-link" key={post.id}>
            <div className="discussion-item">
              <div className="discussion-info">
                <h3>{post.title}</h3>
                <p>Posted by <span className="author">{post.author}</span> · {post.category}</p>
              </div>
              <div className="discussion-stats">
                <span>👍 {post.likes} Likes</span>
                <span>💬 {post.replies} Replies</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <footer>
        <p>© 2024 Think Hub. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Forum