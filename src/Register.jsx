import './index.css'
import { Link } from 'react-router-dom'

function Register() {
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

      {/* REGISTER FORM */}
      <div className="form-container">
        <div className="form-box">
          <h2>Create Account! 🚀</h2>
          <p>Join Think Hub and start discussing!</p>

          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Create a password" />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" />
          </div>

          <button className="form-btn">Create Account</button>

          <p className="form-link">
            Already have an account? <Link to="/login">Login here</Link>
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

export default Register