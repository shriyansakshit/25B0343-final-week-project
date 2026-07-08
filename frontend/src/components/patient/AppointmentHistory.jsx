import AppointmentCard from './AppointmentCard.jsx'

export default function AppointmentHistory({ appointments, onCancel }) {
  if (!appointments || appointments.length === 0) {
    return <p className="muted">No appointments yet. Book one from the doctors directory.</p>
  }

  return (
    <div className="stack">
      {appointments.map((a) => (
        <AppointmentCard key={a.id} appointment={a} onCancel={onCancel} />
      ))}
    </div>
  )
}
