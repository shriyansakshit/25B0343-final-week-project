import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="container page text-center">
      <h2>Page not found</h2>
      <p className="muted">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Back to home</Link>
    </div>
  )
}
