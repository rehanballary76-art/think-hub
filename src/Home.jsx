import './index.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { auth, db } from './firebase'
import { signOut } from 'firebase/auth'
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore'

function Home({ user }) {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ posts: 0, users: 0 })
  const [popular, setPopular] = useState([])

  useEffect(() => {
    fetchStats()
    fetchPopular()
  }, [])

  const fetchStats = async () => {
    const postsSnap = await getDocs(collection(db, 'posts'))
    const usersSnap = await getDocs(collection(db, 'users'))
    setStats({
      posts: postsSnap.size,
      users: usersSnap.size
    })
  }

  const fetchPopular = async () => {
    const q = query(collection(db, 'posts'), orderBy('likes', 'desc'), limit(3))
    const snapshot = await getDocs(q)
    setPopular(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  return (
    <div>

      <nav>
        <h1>Think Hub</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/forum">Forums</Link></li>
          {user ? (
            <>
              <li><Link to="/profile">👤 {user.email.split('@')[0]}</Link></li>
              <li><a href="#" onClick={handleLogout}>Logout</a></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>

      <div className="hero">
        <h2>Welcome to Think Hub 💡</h2>
        <p>A place to share knowledge, ask questions and discuss ideas!</p>
        <Link to="/register"><button>Get Started</button></Link>
      </div>

      {/* STATS SECTION */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>📝 {stats.posts}</h3>
          <p>Total Posts</p>
        </div>
        <div className="stat-card">
          <h3>👥 {stats.users}</h3>
          <p>Total Users</p>
        </div>
        <div className="stat-card">
          <h3>🌐 1</h3>
          <p>Active Community</p>
        </div>
      </div>

      {/* POPULAR POSTS */}
      {popular.length > 0 && (
        <div className="popular-section">
          <h2>🏆 Most Popular Posts</h2>
          {popular.map(post => (
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
      )}

      {/* FORUM CARDS */}
      <div className="forums">
        <h2>Popular Discussion Topics</h2>
        <div className="forum-grid">

          <Link to="/forum" className="discussion-link">
            <div className="forum-card">
              <h3>💻 Web Development</h3>
              <p>Discuss HTML, CSS, JavaScript, React and more!</p>
              <span>120 Posts</span>
            </div>
          </Link>

          <Link to="/forum" className="discussion-link">
            <div className="forum-card">
              <h3>🤖 Artificial Intelligence</h3>
              <p>Talk about AI, Machine Learning and Data Science!</p>
              <span>98 Posts</span>
            </div>
          </Link>

          <Link to="/forum" className="discussion-link">
            <div className="forum-card">
              <h3>📱 Mobile Development</h3>
              <p>Discuss Android, iOS and React Native apps!</p>
              <span>75 Posts</span>
            </div>
          </Link>

          <Link to="/forum" className="discussion-link">
            <div className="forum-card">
              <h3>🔒 Cyber Security</h3>
              <p>Learn and discuss about hacking and security!</p>
              <span>60 Posts</span>
            </div>
          </Link>

          <Link to="/forum" className="discussion-link">
            <div className="forum-card">
              <h3>🎮 Game Development</h3>
              <p>Share your game projects and get feedback!</p>
              <span>45 Posts</span>
            </div>
          </Link>

          <Link to="/forum" className="discussion-link">
            <div className="forum-card">
              <h3>☁️ Cloud Computing</h3>
              <p>Discuss AWS, Azure, Google Cloud and more!</p>
              <span>55 Posts</span>
            </div>
          </Link>

        </div>
      </div>

      <footer>
        <p>© 2024 Think Hub. All rights reserved.</p>
      </footer>

    </div>
  )
}

export default Home