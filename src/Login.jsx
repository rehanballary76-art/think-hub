import './index.css'
import { Link } from 'react-router-dom'

function Login() {
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

      {/* LOGIN FORM */}
      <div className="form-container">
        <div className="form-box">
          <h2>Welcome Back! 👋</h2>
          <p>Login to your Think Hub account</p>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <button className="form-btn">Login</button>

          <p className="form-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>

        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <p>© 2024 Think Hub. All rights reserved.</p>
      </footer>

    </div>
  )
}

export default Login