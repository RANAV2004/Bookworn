import { useState } from 'react'
import App from './App.jsx'
import Login from './Login.jsx'

const USER_KEY = 'bookworm-user'

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY))
  } catch {
    return null
  }
}


export default function Root() {
  const [user, setUser] = useState(loadUser)

  const handleLogin = (u) => {
    localStorage.setItem(USER_KEY, JSON.stringify(u))
    setUser(u)
  }

  const handleLogout = () => {
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }

  if (!user) return <Login onLogin={handleLogin} />
  return <App user={user} onLogout={handleLogout} />
}
