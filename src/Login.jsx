import './index.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { auth } from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/forum')
    } catch (err) {
      setError('Invalid email or password!')
    }
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

      <div className="form-container">
        <div className="form-box">
          <h2>Welcome Back! 👋</h2>
          <p>Login to your Think Hub account</p>

          {error && <p style={{color: 'red'}}>{error}</p>}

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password"
              value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button className="form-btn" onClick={handleLogin}>Login</button>

          <p className="form-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>

      <footer>
        <p>© 2024 Think Hub. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Login