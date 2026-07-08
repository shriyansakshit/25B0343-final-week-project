import { formatTime } from '../../utils/dateHelpers'

export default function TodaysAppointments({ appointments }) {
  if (!appointments || appointments.length === 0) {
    return <p className="muted">No appointments scheduled for today.</p>
  }

  return (
    <div className="stack">
      {appointments.map((a) => (
        <div key={a.id} className="row-between card-tight card">
          <div>
            <strong>{a.patient_name}</strong>
            <p className="muted" style={{ margin: '2px 0 0' }}>
              {a.mode === 'online' ? 'Online consultation' : 'In person'}
            </p>
          </div>
          <span className="badge badge-muted mono">{formatTime(a.time)}</span>
        </div>
      ))}
    </div>
  )
}
