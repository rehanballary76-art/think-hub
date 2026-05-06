import './index.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { db, auth } from './firebase'
import { signOut } from 'firebase/auth'
import { collection, addDoc, getDocs, orderBy, query, updateDoc, doc, increment, getDoc, setDoc } from 'firebase/firestore'

function Forum({ user, dark, setDark }) {
  const [posts, setPosts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState('')
  const [category, setCategory] = useState('Technology')
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Popular')
  const [likedPosts, setLikedPosts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    let result = [...posts]
    if (search) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (filter === 'Popular') {
      result.sort((a, b) => b.likes - a.likes)
    } else if (filter === 'Newest') {
      result.sort((a, b) => b.date?.seconds - a.date?.seconds)
    } else if (filter === 'Unanswered') {
      result = result.filter(p => p.replies === 0)
    }
    setFiltered(result)
  }, [search, posts, filter])

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
      body: body,
      tags: tags,
      category: category,
      author: auth.currentUser.email,
      likes: 0,
      replies: 0,
      date: new Date()
    })
    setTitle('')
    setBody('')
    setTags('')
    setShowForm(false)
    fetchPosts()
  }

  const handleLike = async (postId) => {
    if (!auth.currentUser) {
      navigate('/login')
      return
    }
    if (likedPosts.includes(postId)) {
      alert('You already liked this post! 😊')
      return
    }
    setLikedPosts([...likedPosts, postId])
    const likeRef = doc(db, 'posts', postId, 'likedBy', auth.currentUser.uid)
    const likeSnap = await getDoc(likeRef)
    if (likeSnap.exists()) {
      alert('You already liked this post! 😊')
      return
    }
    await setDoc(likeRef, { liked: true })
    await updateDoc(doc(db, 'posts', postId), {
      likes: increment(1)
    })
    fetchPosts()
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  const allTags = [...new Set(posts.flatMap(p => p.tags ? p.tags.split(',').map(t => t.trim()) : []))]

  return (
    <div>
      <nav>
        <h1>Think Hub</h1>
        <div className="nav-search">
          <input
            type="text"
            placeholder="🔍 Search questions, tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="nav-search-bar"
          />
        </div>
        <ul>
          {user ? (
            <>
              <li><Link to="/profile">👤 {user.email.split('@')[0]}</Link></li>
              <li><a href="#" onClick={handleLogout}>Logout</a></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Log In</Link></li>
              <li><Link to="/register" className="signup-btn">Sign Up</Link></li>
            </>
          )}
          <li>
            <button className="dark-toggle" onClick={() => setDark(!dark)}>
              {dark ? '☀️' : '🌙'}
            </button>
          </li>
        </ul>
      </nav>

      <div className="forum-layout">

        <div className="left-sidebar">
          <Link to="/" className="sidebar-link">🏠 Home</Link>
          <Link to="/forum" className="sidebar-link active-link">🔍 Explore</Link>
          {user && <Link to="/profile" className="sidebar-link">👤 Profile</Link>}
        </div>

        <div className="main-content">

          <div className="forum-top">
            <div>
              <h2>Explore Topics</h2>
              <p>Discover, learn, and grow together</p>
            </div>
            <button className="ask-btn" onClick={() => setShowForm(!showForm)}>
              + Ask Question
            </button>
          </div>

          <div className="filter-tabs">
            {['Popular', 'Newest', 'Unanswered'].map(tab => (
              <button
                key={tab}
                className={`filter-tab ${filter === tab ? 'active-tab' : ''}`}
                onClick={() => setFilter(tab)}>
                {tab === 'Popular' ? '📈' : tab === 'Newest' ? '🕐' : '❓'} {tab}
              </button>
            ))}
          </div>

          {showForm && (
            <div className="new-post-form">
              <input type="text" placeholder="Question title..."
                value={title} onChange={(e) => setTitle(e.target.value)} />
              <textarea placeholder="Describe your question..."
                value={body} onChange={(e) => setBody(e.target.value)}
                rows="3" style={{padding:'14px 18px', border:'2px solid #eee', borderRadius:'10px', fontSize:'14px', outline:'none', fontFamily:'Poppins, sans-serif'}} />
              <input type="text" placeholder="Tags (comma separated e.g. science, health)"
                value={tags} onChange={(e) => setTags(e.target.value)} />
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Technology</option>
                <option>Science</option>
                <option>Education</option>
                <option>Business</option>
                <option>Arts & Culture</option>
                <option>Health</option>
                <option>World Affairs</option>
                <option>Artificial Intelligence</option>
                <option>Entertainment</option>
              </select>
              <button className="form-btn" onClick={handleNewPost}>Post Question</button>
            </div>
          )}

          {filtered.length === 0 && (
            <p style={{textAlign:'center', padding:'40px', color:'#888'}}>
              No posts found! 🔍
            </p>
          )}

          {filtered.map(post => (
            <div className="post-card" key={post.id}>
              <div className="vote-section">
                <button
                  className="vote-btn"
                  onClick={() => handleLike(post.id)}
                  disabled={likedPosts.includes(post.id)}
                  style={{opacity: likedPosts.includes(post.id) ? 0.5 : 1, cursor: likedPosts.includes(post.id) ? 'not-allowed' : 'pointer'}}>
                  ▲
                </button>
                <span className="vote-count">{post.likes}</span>
                <button className="vote-btn down">▼</button>
              </div>
              <div className="post-body">
                <Link to={`/discussion/${post.id}`} className="post-title-link">
                  <h3>{post.title}</h3>
                </Link>
                {post.body && <p className="post-preview">{post.body}</p>}
                <div className="post-tags">
                  {post.tags && post.tags.split(',').map((tag, i) => (
                    <span key={i} className="tag">#{tag.trim()}</span>
                  ))}
                </div>
                <div className="post-meta">
                  <span className="replies-count">💬 {post.replies} Answers</span>
                  <span>Posted by <span className="author">{post.author}</span></span>
                  <span className="post-category">📁 {post.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="right-sidebar">
          <div className="sidebar-card">
            <h4>📈 Trending Tags</h4>
            {allTags.length === 0 && <p style={{color:'#888', fontSize:'13px'}}>No tags yet!</p>}
            {allTags.map((tag, i) => (
              <div key={i} className="trending-tag">
                <span>#{tag}</span>
              </div>
            ))}
          </div>

          <div className="sidebar-card">
            <h4>🏆 Top Questioners</h4>
            {[...new Map(posts.map(p => [p.author, p])).values()].slice(0, 3).map((p, i) => (
              <div key={i} className="top-user">
                <div className="top-user-avatar">{p.author[0].toUpperCase()}</div>
                <div>
                  <p>{p.author.split('@')[0]}</p>
                  <small>{posts.filter(post => post.author === p.author).length} asked</small>
                </div>
                <span className="medal">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer>
        <p>© 2024 Think Hub. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Forum