import Card from '../common/Card.jsx'
import Button from '../common/Button.jsx'
import { formatDate, formatTime } from '../../utils/dateHelpers'

export default function AppointmentCard({ appointment, onCancel }) {
  const { doctor_name, specialty, date, time, mode, status } = appointment

  return (
    <Card tight>
      <div className="row-between">
        <div>
          <strong>{doctor_name}</strong>
          <p className="muted" style={{ margin: '2px 0 0' }}>{specialty}</p>
        </div>
        <span className={`badge ${status === 'confirmed' ? 'badge-success' : 'badge-muted'}`}>
          {status}
        </span>
      </div>

      <div className="row mono muted" style={{ marginTop: 10, fontSize: '0.85rem' }}>
        <span>{formatDate(date)}</span>
        <span>·</span>
        <span>{formatTime(time)}</span>
        <span>·</span>
        <span>{mode === 'online' ? 'Online consultation' : 'In person'}</span>
      </div>

      {status !== 'cancelled' && onCancel && (
        <div style={{ marginTop: 14 }}>
          <Button variant="ghost" size="sm" onClick={() => onCancel(appointment.id)}>
            Cancel appointment
          </Button>
        </div>
      )}
    </Card>
  )
}
