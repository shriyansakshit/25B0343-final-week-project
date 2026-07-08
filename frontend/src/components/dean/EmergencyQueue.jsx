import { useEffect, useState } from 'react'
import Button from '../common/Button.jsx'
import Loader from '../common/Loader.jsx'
import { fetchEmergencyQueue, resolveEmergencyRequest } from '../../api/deanApi'

export default function EmergencyQueue() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [actingId, setActingId] = useState(null)

  useEffect(() => { load() }, [])

  function load() {
    setLoading(true)
    fetchEmergencyQueue()
      .then(({ data }) => setRequests(data.results || data || []))
      .catch(() => setRequests([]))
      .finally(() => setLoading(false))
  }

  async function handleResolve(id) {
    setActingId(id)
    try { await resolveEmergencyRequest(id); load() } finally { setActingId(null) }
  }

  if (loading) return <Loader />

  if (requests.length === 0) {
    return <p className="muted">No open emergency requests.</p>
  }

  return (
    <div className="stack">
      {requests.map((r) => (
        <div key={r.id} className="row-between card-tight card" style={{ borderColor: 'var(--color-emergency)' }}>
          <div>
            <span className="badge badge-emergency">{r.type === 'ambulance' ? 'Ambulance' : 'Emergency slot'}</span>
            <p style={{ margin: '8px 0 0' }}><strong>{r.contact_name}</strong> — {r.contact}</p>
            <p className="muted" style={{ margin: '2px 0 0' }}>{r.location || r.situation}</p>
          </div>
          <Button size="sm" disabled={actingId === r.id} onClick={() => handleResolve(r.id)}>
            Mark resolved
          </Button>
        </div>
      ))}
    </div>
  )
}
