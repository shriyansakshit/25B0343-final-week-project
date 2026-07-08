import { useState } from 'react'
import AmbulanceRequestForm from './AmbulanceRequestForm.jsx'
import EmergencySlotBooking from './EmergencySlotBooking.jsx'

export default function EmergencySection() {
  const [path, setPath] = useState(null) // 'ambulance' | 'slot'

  return (
    <div className="stack">
      <div className="card text-center" style={{ borderColor: 'var(--color-emergency)', background: 'var(--color-emergency-soft)' }}>
        <h2 style={{ color: 'var(--color-emergency)' }}>Emergency</h2>
        <p style={{ color: 'var(--color-ink)' }}>
          If this is life-threatening, call your local emergency number immediately. Use the
          options below only if you're able to safely wait for a response.
        </p>
      </div>

      {!path && (
        <div className="grid-2">
          <button className="btn btn-emergency btn-block" style={{ padding: '20px' }} onClick={() => setPath('ambulance')}>
            Send an ambulance right away
          </button>
          <button className="btn btn-secondary btn-block" style={{ padding: '20px' }} onClick={() => setPath('slot')}>
            Book the next emergency slot
          </button>
        </div>
      )}

      {path === 'ambulance' && <AmbulanceRequestForm />}
      {path === 'slot' && <EmergencySlotBooking />}

      {path && (
        <button className="btn btn-ghost btn-sm" onClick={() => setPath(null)}>← Back to options</button>
      )}
    </div>
  )
}
