import './index.css'
import { Link } from 'react-router-dom'

function Home() {
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

      {/* HERO SECTION */}
      <div className="hero">
        <h2>Welcome to Think Hub 💡</h2>
        <p>A place to share knowledge, ask questions and discuss ideas!</p>
        <Link to="/register"><button>Get Started</button></Link>
      </div>

      {/* FORUMS SECTION */}
      <div className="forums">
        <h2>Popular Discussion Topics</h2>
        <div className="forum-grid">

          <div className="forum-card">
            <h3>💻 Web Development</h3>
            <p>Discuss HTML, CSS, JavaScript, React and more!</p>
            <span>120 Posts</span>
          </div>

          <div className="forum-card">
            <h3>🤖 Artificial Intelligence</h3>
            <p>Talk about AI, Machine Learning and Data Science!</p>
            <span>98 Posts</span>
          </div>

          <div className="forum-card">
            <h3>📱 Mobile Development</h3>
            <p>Discuss Android, iOS and React Native apps!</p>
            <span>75 Posts</span>
          </div>

          <div className="forum-card">
            <h3>🔒 Cyber Security</h3>
            <p>Learn and discuss about hacking and security!</p>
            <span>60 Posts</span>
          </div>

          <div className="forum-card">
            <h3>🎮 Game Development</h3>
            <p>Share your game projects and get feedback!</p>
            <span>45 Posts</span>
          </div>

          <div className="forum-card">
            <h3>☁️ Cloud Computing</h3>
            <p>Discuss AWS, Azure, Google Cloud and more!</p>
            <span>55 Posts</span>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <p>© 2024 Think Hub. All rights reserved.</p>
      </footer>

    </div>
  )
}

export default Home