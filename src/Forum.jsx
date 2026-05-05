import './index.css'
import { Link } from 'react-router-dom'

function Forum() {
  return (
    <div>

      {/* NAVBAR */}
      <nav>
        <h1>Think Hub</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/forum">Forums</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>

      {/* FORUM HEADER */}
      <div className="forum-header">
        <h2>💬 All Discussions</h2>
        <p>Browse and join conversations on any topic!</p>
        <button className="form-btn new-post-btn">+ New Post</button>
      </div>

      {/* DISCUSSION LIST */}
      <div className="discussion-container">

        <Link to="/discussion" className="discussion-link">
          <div className="discussion-item">
            <div className="discussion-info">
              <h3>How to learn React in 30 days? 🚀</h3>
              <p>Posted by <span className="author">Rehan</span> · Web Development</p>
            </div>
            <div className="discussion-stats">
              <span>👍 24 Likes</span>
              <span>💬 12 Replies</span>
            </div>
          </div>
        </Link>

        <Link to="/discussion" className="discussion-link">
          <div className="discussion-item">
            <div className="discussion-info">
              <h3>Best AI tools for students in 2024 🤖</h3>
              <p>Posted by <span className="author">Ahmed</span> · Artificial Intelligence</p>
            </div>
            <div className="discussion-stats">
              <span>👍 45 Likes</span>
              <span>💬 28 Replies</span>
            </div>
          </div>
        </Link>

        <Link to="/discussion" className="discussion-link">
          <div className="discussion-item">
            <div className="discussion-info">
              <h3>How to build a mobile app from scratch? 📱</h3>
              <p>Posted by <span className="author">Sara</span> · Mobile Development</p>
            </div>
            <div className="discussion-stats">
              <span>👍 33 Likes</span>
              <span>💬 19 Replies</span>
            </div>
          </div>
        </Link>

        <Link to="/discussion" className="discussion-link">
          <div className="discussion-item">
            <div className="discussion-info">
              <h3>Top 10 Cyber Security tips for beginners 🔒</h3>
              <p>Posted by <span className="author">Ali</span> · Cyber Security</p>
            </div>
            <div className="discussion-stats">
              <span>👍 56 Likes</span>
              <span>💬 34 Replies</span>
            </div>
          </div>
        </Link>

        <Link to="/discussion" className="discussion-link">
          <div className="discussion-item">
            <div className="discussion-info">
              <h3>How to get started with Cloud Computing? ☁️</h3>
              <p>Posted by <span className="author">Zara</span> · Cloud Computing</p>
            </div>
            <div className="discussion-stats">
              <span>👍 41 Likes</span>
              <span>💬 22 Replies</span>
            </div>
          </div>
        </Link>

        <Link to="/discussion" className="discussion-link">
          <div className="discussion-item">
            <div className="discussion-info">
              <h3>Unity vs Unreal Engine — which is better? 🎮</h3>
              <p>Posted by <span className="author">Hassan</span> · Game Development</p>
            </div>
            <div className="discussion-stats">
              <span>👍 38 Likes</span>
              <span>💬 25 Replies</span>
            </div>
          </div>
        </Link>

      </div>

      {/* FOOTER */}
      <footer>
        <p>© 2024 Think Hub. All rights reserved.</p>
      </footer>

    </div>
  )
}

export default Forum