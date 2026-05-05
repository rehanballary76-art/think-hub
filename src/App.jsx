import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Forum from './Forum'
import Discussion from './Discussion'
import Profile from './Profile'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forum" element={<Forum user={user} />} />
        <Route path="/discussion/:id" element={<Discussion user={user} />} />
        <Route path="/profile" element={<Profile user={user} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App