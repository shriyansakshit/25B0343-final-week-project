import { Link } from 'react-router-dom'
import SignupForm from '../components/auth/SignupForm.jsx'

export default function SignupPage() {
  return (
    <div className="auth-shell">
      <div className="stack" style={{ alignItems: 'center' }}>
        <SignupForm />
        <p className="muted">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}
