import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../common/Button.jsx'
import Loader from '../common/Loader.jsx'
import { fetchAvailableSlots, bookAppointment } from '../../api/appointmentApi'
import { nextNDays, formatDate, formatTime } from '../../utils/dateHelpers'

export default function BookAppointmentForm({ doctor, defaultMode = 'in-person' }) {
  const days = nextNDays(7)
  const [date, setDate] = useState(days[0])
  const [mode, setMode] = useState(defaultMode)
  const [slots, setSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState('')
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false
    setLoadingSlots(true)
    setSelectedSlot('')
    fetchAvailableSlots(doctor.id, date)
      .then(({ data }) => { if (!cancelled) setSlots(data.slots || []) })
      .catch(() => { if (!cancelled) setSlots([]) })
      .finally(() => { if (!cancelled) setLoadingSlots(false) })
    return () => { cancelled = true }
  }, [doctor.id, date])

  async function handleBook() {
    setError('')
    setSubmitting(true)
    try {
      await bookAppointment({ doctorId: doctor.id, date, time: selectedSlot, mode })
      setSuccess(true)
      setTimeout(() => navigate('/patient/dashboard'), 1200)
    } catch (err) {
      setError(err.response?.data?.detail || 'Could not book that slot — try another time.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return <p className="badge badge-success" style={{ padding: '10px 16px' }}>Appointment confirmed — redirecting to your dashboard…</p>
  }

  return (
    <div className="stack">
      <div className="field">
        <label>Consultation type</label>
        <div className="row">
          <button
            type="button"
            className={`btn btn-sm ${mode === 'in-person' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setMode('in-person')}
          >
            In person
          </button>
          <button
            type="button"
            className={`btn btn-sm ${mode === 'online' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setMode('online')}
          >
            Online consultation
          </button>
        </div>
      </div>

      <div className="field">
        <label>Date</label>
        <div className="row" style={{ flexWrap: 'wrap' }}>
          {days.map((d) => (
            <button
              key={d}
              type="button"
              className={`btn btn-sm ${date === d ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setDate(d)}
            >
              {formatDate(d)}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label>Available slots</label>
        {loadingSlots ? (
          <Loader label="Loading slots" />
        ) : slots.length === 0 ? (
          <p className="muted">No open slots this day — try another date.</p>
        ) : (
          <div className="row" style={{ flexWrap: 'wrap' }}>
            {slots.map((s) => (
              <button
                key={s}
                type="button"
                className={`btn btn-sm mono ${selectedSlot === s ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedSlot(s)}
              >
                {formatTime(s)}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && <p className="field-error">{error}</p>}

      <Button disabled={!selectedSlot || submitting} onClick={handleBook}>
        {submitting ? 'Booking…' : `Book ${formatDate(date)} at ${selectedSlot ? formatTime(selectedSlot) : '—'}`}
      </Button>
    </div>
  )
}
