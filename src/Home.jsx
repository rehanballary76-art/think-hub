import './index.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { auth, db } from './firebase'
import { signOut } from 'firebase/auth'
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore'

function Home({ user, dark, setDark }) {
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
          <li>
            <button className="dark-toggle" onClick={() => setDark(!dark)}>
              {dark ? '☀️' : '🌙'}
            </button>
          </li>
        </ul>
      </nav>

      <div className="hero">
        <h2>Welcome to Think Hub 💡</h2>
        <p>A place to share knowledge, ask questions and discuss ideas!</p>
        <Link to="/forum"><button>Get Started</button></Link>
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
        <h2>Explore Knowledge Topics</h2>
        <div className="forum-grid">

          <Link to="/forum" className="discussion-link">
            <div className="forum-card">
              <h3>💻 Technology</h3>
              <p>Discuss software, hardware, programming and the latest tech trends!</p>
              <span>Technology</span>
            </div>
          </Link>

          <Link to="/forum" className="discussion-link">
            <div className="forum-card">
              <h3>🔬 Science</h3>
              <p>Explore physics, chemistry, biology and scientific discoveries!</p>
              <span>Science</span>
            </div>
          </Link>

          <Link to="/forum" className="discussion-link">
            <div className="forum-card">
              <h3>📚 Education</h3>
              <p>Share study tips, resources and learning strategies!</p>
              <span>Education</span>
            </div>
          </Link>

          <Link to="/forum" className="discussion-link">
            <div className="forum-card">
              <h3>💼 Business</h3>
              <p>Discuss entrepreneurship, marketing and career growth!</p>
              <span>Business</span>
            </div>
          </Link>

          <Link to="/forum" className="discussion-link">
            <div className="forum-card">
              <h3>🎨 Arts & Culture</h3>
              <p>Share creative ideas, art, music and cultural discussions!</p>
              <span>Arts</span>
            </div>
          </Link>

          <Link to="/forum" className="discussion-link">
            <div className="forum-card">
              <h3>🏥 Health</h3>
              <p>Discuss fitness, mental health and wellness topics!</p>
              <span>Health</span>
            </div>
          </Link>

          <Link to="/forum" className="discussion-link">
            <div className="forum-card">
              <h3>🌍 World Affairs</h3>
              <p>Discuss global news, politics and international topics!</p>
              <span>World</span>
            </div>
          </Link>

          <Link to="/forum" className="discussion-link">
            <div className="forum-card">
              <h3>🤖 Artificial Intelligence</h3>
              <p>Explore AI, machine learning and the future of technology!</p>
              <span>AI</span>
            </div>
          </Link>

          <Link to="/forum" className="discussion-link">
            <div className="forum-card">
              <h3>🎮 Entertainment</h3>
              <p>Talk about games, movies, music and pop culture!</p>
              <span>Entertainment</span>
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