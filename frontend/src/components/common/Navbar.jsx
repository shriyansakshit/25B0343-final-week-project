import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { dashboardPathForRole, roleLabel } from '../../utils/roleHelpers'
import NotificationBell from './NotificationBell.jsx'

export default function Navbar() {
  const { isAuthenticated, user, role, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="navbar-brand-mark" />
          Meridian General
        </Link>

        <nav className="navbar-links">
          <Link to="/doctors">Find a doctor</Link>
          <Link to="/emergency" style={{ color: 'var(--color-emergency)' }}>Emergency</Link>

          {!isAuthenticated && (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Sign up</Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <NotificationBell />
              <Link to={dashboardPathForRole(role)}>
                {user?.name ? `${roleLabel(role)} · ${user.name}` : roleLabel(role)}
              </Link>
              <button className="btn btn-ghost btn-sm" onClick={handleLogout}>Log out</button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
