import { useState } from 'react'
import Button from '../common/Button.jsx'
import { bookEmergencySlot } from '../../api/emergencyApi'

export default function EmergencySlotBooking() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [booked, setBooked] = useState(null)

  async function handleBook() {
    setError('')
    setSubmitting(true)
    try {
      const { data } = await bookEmergencySlot()
      setBooked(data)
    } catch (err) {
      setError(err.response?.data?.detail || 'No emergency slot could be booked — try the ambulance option instead.')
    } finally {
      setSubmitting(false)
    }
  }

  if (booked) {
    return (
      <div className="card" style={{ borderColor: 'var(--color-emergency)' }}>
        <h3>You're booked in</h3>
        <p>
          <strong>{booked.doctor_name}</strong> will see you at{' '}
          <span className="mono">{booked.time}</span> today. Head to the emergency department
          reception on arrival.
        </p>
      </div>
    )
  }

  return (
    <div className="card" style={{ borderColor: 'var(--color-emergency)' }}>
      <h3>Book the next emergency slot</h3>
      <p>
        For urgent but non-life-threatening situations. This finds the soonest opening with an
        on-call emergency doctor today.
      </p>
      {error && <p className="field-error">{error}</p>}
      <Button variant="emergency" onClick={handleBook} disabled={submitting}>
        {submitting ? 'Finding a slot…' : 'Find next available slot'}
      </Button>
    </div>
  )
}
