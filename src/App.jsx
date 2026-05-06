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
  const [dark, setDark] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
  }, [])

  return (
    <div className={dark ? 'dark-mode' : ''}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home user={user} dark={dark} setDark={setDark} />} />
          <Route path="/login" element={<Login dark={dark} setDark={setDark} />} />
          <Route path="/register" element={<Register dark={dark} setDark={setDark} />} />
          <Route path="/forum" element={<Forum user={user} dark={dark} setDark={setDark} />} />
          <Route path="/discussion/:id" element={<Discussion user={user} dark={dark} setDark={setDark} />} />
          <Route path="/profile" element={<Profile user={user} dark={dark} setDark={setDark} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App