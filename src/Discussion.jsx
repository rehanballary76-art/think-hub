import './index.css'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { db, auth } from './firebase'
import { signOut } from 'firebase/auth'
import { doc, getDoc, setDoc, collection, addDoc, getDocs, orderBy, query, updateDoc, increment } from 'firebase/firestore'

function Discussion({ user }) {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [replies, setReplies] = useState([])
  const [reply, setReply] = useState('')
  const [liked, setLiked] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchPost()
    fetchReplies()
  }, [])

  const fetchPost = async () => {
    const docRef = doc(db, 'posts', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setPost({ id: docSnap.id, ...docSnap.data() })
    }
  }

  const fetchReplies = async () => {
    const q = query(collection(db, 'posts', id, 'replies'), orderBy('date', 'asc'))
    const snapshot = await getDocs(q)
    setReplies(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
  }

  const handleReply = async () => {
    if (!auth.currentUser) {
      navigate('/login')
      return
    }
    if (!reply) return
    await addDoc(collection(db, 'posts', id, 'replies'), {
      content: reply,
      author: auth.currentUser.email,
      date: new Date()
    })
    await updateDoc(doc(db, 'posts', id), {
      replies: increment(1)
    })
    setReply('')
    fetchReplies()
    fetchPost()
  }

  const handleLike = async () => {
    if (!auth.currentUser) {
      navigate('/login')
      return
    }
    if (liked) {
      alert('You already liked this post! 😊')
      return
    }
    const likeRef = doc(db, 'posts', id, 'likedBy', auth.currentUser.uid)
    const likeSnap = await getDoc(likeRef)
    if (likeSnap.exists()) {
      alert('You already liked this post! 😊')
      setLiked(true)
      return
    }
    setLiked(true)
    await setDoc(likeRef, { liked: true })
    await updateDoc(doc(db, 'posts', id), {
      likes: increment(1)
    })
    fetchPost()
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

      {post && (
        <div className="discussion-header">
          <h2>{post.title}</h2>
          <p>Posted by <span className="author">{post.author}</span> · {post.category}</p>
        </div>
      )}

      <div className="discussion-main">

        {post && (
          <div className="main-post">
            <div className="post-avatar">Q</div>
            <div className="post-content">
              <h4>{post.author}</h4>
              <p>{post.title}</p>
              {post.body && <p style={{color:'#666', marginTop:'8px'}}>{post.body}</p>}
              <div className="post-actions">
                <button
                  onClick={handleLike}
                  disabled={liked}
                  style={{opacity: liked ? 0.5 : 1, cursor: liked ? 'not-allowed' : 'pointer'}}>
                  👍 Like ({post.likes})
                </button>
              </div>
            </div>
          </div>
        )}

        <h3 className="replies-title">💬 Replies ({replies.length})</h3>

        {replies.map((r, index) => (
          <div className="main-post reply" key={index}>
            <div className="post-avatar blue">
              {r.author[0].toUpperCase()}
            </div>
            <div className="post-content">
              <h4>{r.author}</h4>
              <p>{r.content}</p>
            </div>
          </div>
        ))}

        <div className="reply-box">
          <h3>✍️ Write a Reply</h3>
          <textarea
            placeholder="Share your thoughts..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}>
          </textarea>
          <button className="form-btn reply-submit" onClick={handleReply}>
            Post Reply
          </button>
        </div>

      </div>

      <footer>
        <p>© 2024 Think Hub. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Discussion