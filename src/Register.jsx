import './index.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { auth, db } from './firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    if (password !== confirm) {
      setError('Passwords do not match!')
      return
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, 'users', result.user.uid), {
        name: name,
        email: email,
      })
      navigate('/forum')
    } catch (err) {
      setError('Registration failed! Try again.')
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
          <h2>Create Account! 🚀</h2>
          <p>Join Think Hub and start discussing!</p>

          {error && <p style={{color: 'red'}}>{error}</p>}

          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name"
              value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Create a password"
              value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password"
              value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </div>

          <button className="form-btn" onClick={handleRegister}>Create Account</button>

          <p className="form-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>

      <footer>
        <p>© 2024 Think Hub. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Register