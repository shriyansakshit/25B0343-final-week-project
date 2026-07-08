import { useState } from 'react'
import Input from '../common/Input.jsx'
import Button from '../common/Button.jsx'
import { requestAmbulance } from '../../api/emergencyApi'

export default function AmbulanceRequestForm() {
  const [form, setForm] = useState({ location: '', contact: '', situation: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [dispatched, setDispatched] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await requestAmbulance(form)
      setDispatched(true)
    } catch (err) {
      setError(err.response?.data?.detail || 'Could not send the request — call the emergency line directly if this persists.')
    } finally {
      setSubmitting(false)
    }
  }

  if (dispatched) {
    return (
      <div className="card" style={{ borderColor: 'var(--color-emergency)' }}>
        <h3>Request received</h3>
        <p>
          Your ambulance request has been logged and the on-call team has been notified.
          Stay on the line at the number you provided — they may call back for directions.
        </p>
        <p className="field-hint">
          This is a simulated dispatch for a student project — in a real emergency, call your
          local emergency number directly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="stack">
      <Input
        label="Your location"
        placeholder="Address or landmark"
        required
        value={form.location}
        onChange={(e) => update('location', e.target.value)}
      />
      <Input
        label="Contact number"
        type="tel"
        required
        value={form.contact}
        onChange={(e) => update('contact', e.target.value)}
      />
      <Input
        as="textarea"
        rows={3}
        label="What's happening"
        placeholder="Briefly describe the situation"
        required
        value={form.situation}
        onChange={(e) => update('situation', e.target.value)}
      />
      {error && <p className="field-error">{error}</p>}
      <Button type="submit" variant="emergency" block disabled={submitting}>
        {submitting ? 'Sending…' : 'Send ambulance now'}
      </Button>
    </form>
  )
}
