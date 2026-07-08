import { useState } from 'react'
import Button from '../common/Button.jsx'
import Input from '../common/Input.jsx'
import { submitAvailabilityChange } from '../../api/doctorApi'
import { todayISO } from '../../utils/dateHelpers'

export default function AvailabilityEditor({ onChanged }) {
  const [date, setDate] = useState(todayISO())
  const [status, setStatus] = useState('available')
  const [note, setNote] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await submitAvailabilityChange({ date, status, note })
      setConfirmed(true)
      setNote('')
      onChanged?.()
      setTimeout(() => setConfirmed(false), 3000)
    } catch (err) {
      setError(err.response?.data?.detail || 'Could not save that change — try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="stack">
      <p className="muted" style={{ margin: 0 }}>
        Changes apply to your schedule immediately and are logged for the dean's review.
      </p>

      <div className="field">
        <label>What's changing</label>
        <div className="row">
          <button
            type="button"
            className={`btn btn-sm ${status === 'available' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setStatus('available')}
          >
            Add extra availability
          </button>
          <button
            type="button"
            className={`btn btn-sm ${status === 'unavailable' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setStatus('unavailable')}
          >
            Mark unavailable
          </button>
        </div>
      </div>

      <Input
        label="Date"
        type="date"
        value={date}
        min={todayISO()}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <Input
        as="textarea"
        rows={2}
        label="Reason (visible to the dean)"
        placeholder={status === 'available' ? 'e.g. covering an extra evening slot' : 'e.g. attending a conference'}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        required
      />

      {error && <p className="field-error">{error}</p>}
      {confirmed && <p className="badge badge-success" style={{ padding: '6px 12px' }}>Saved — the dean has been notified.</p>}

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Saving…' : 'Save change'}
      </Button>
    </form>
  )
}
