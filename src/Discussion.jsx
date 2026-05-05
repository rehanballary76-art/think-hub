import './index.css'
import { Link } from 'react-router-dom'

function Discussion() {
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

      {/* DISCUSSION HEADER */}
      <div className="discussion-header">
        <h2>How to learn React in 30 days? 🚀</h2>
        <p>Posted by <span className="author">Rehan</span> · Web Development · 24 Likes</p>
      </div>

      {/* MAIN POST */}
      <div className="discussion-main">
        <div className="main-post">
          <div className="post-avatar">R</div>
          <div className="post-content">
            <h4>Rehan <span className="post-date">· 2 hours ago</span></h4>
            <p>Hey everyone! I want to learn React in 30 days. Can anyone guide me on the best resources and roadmap to follow? I already know HTML, CSS and basic JavaScript. Please help!</p>
            <div className="post-actions">
              <button>👍 Like</button>
              <button>💬 Reply</button>
            </div>
          </div>
        </div>

        {/* REPLIES */}
        <h3 className="replies-title">💬 Replies (3)</h3>

        <div className="main-post reply">
          <div className="post-avatar blue">A</div>
          <div className="post-content">
            <h4>Ahmed <span className="post-date">· 1 hour ago</span></h4>
            <p>Start with the official React documentation! It's very beginner friendly. Then practice by building small projects like a Todo app or a weather app. Consistency is key!</p>
            <div className="post-actions">
              <button>👍 Like</button>
              <button>💬 Reply</button>
            </div>
          </div>
        </div>

        <div className="main-post reply">
          <div className="post-avatar green">S</div>
          <div className="post-content">
            <h4>Sara <span className="post-date">· 45 mins ago</span></h4>
            <p>I recommend watching free YouTube tutorials first to get the basics. Then move to building real projects. Don't just watch — code along every step!</p>
            <div className="post-actions">
              <button>👍 Like</button>
              <button>💬 Reply</button>
            </div>
          </div>
        </div>

        <div className="main-post reply">
          <div className="post-avatar red">Z</div>
          <div className="post-content">
            <h4>Zara <span className="post-date">· 20 mins ago</span></h4>
            <p>Focus on React hooks like useState and useEffect first. These are the most important concepts. Once you understand them, everything else becomes easy!</p>
            <div className="post-actions">
              <button>👍 Like</button>
              <button>💬 Reply</button>
            </div>
          </div>
        </div>

        {/* REPLY BOX */}
        <div className="reply-box">
          <h3>✍️ Write a Reply</h3>
          <textarea placeholder="Share your thoughts..."></textarea>
          <button className="form-btn reply-submit">Post Reply</button>
        </div>

      </div>

      {/* FOOTER */}
      <footer>
        <p>© 2024 Think Hub. All rights reserved.</p>
      </footer>

    </div>
  )
}

export default Discussion