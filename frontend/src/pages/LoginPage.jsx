import { Link } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm.jsx'

export default function LoginPage() {
  return (
    <div className="auth-shell">
      <div className="stack" style={{ alignItems: 'center' }}>
        <LoginForm />
        <p className="muted">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  )
}
