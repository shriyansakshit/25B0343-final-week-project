import { Link } from 'react-router-dom'

export default function DoctorDetailCard({ doctor }) {
  return (
    <div className="card row-between">
      <div>
        <h3 style={{ marginBottom: 2 }}>{doctor.name}</h3>
        <p className="muted" style={{ margin: 0 }}>{doctor.specialty}</p>
      </div>
      <Link to={`/book/${doctor.id}`} className="btn btn-primary btn-sm">
        Book appointment
      </Link>
    </div>
  )
}
