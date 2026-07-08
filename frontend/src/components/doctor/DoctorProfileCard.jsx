export default function DoctorProfileCard({ doctor }) {
  return (
    <div className="card">
      <div className="row-between">
        <div>
          <h3 style={{ marginBottom: 2 }}>{doctor.name}</h3>
          <p className="muted" style={{ margin: 0 }}>{doctor.specialty}</p>
        </div>
        <span className={`badge ${doctor.verified ? 'badge-success' : 'badge-warning'}`}>
          {doctor.verified ? 'Verified' : 'Pending verification'}
        </span>
      </div>
    </div>
  )
}
