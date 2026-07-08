import { useEffect, useState } from 'react'
import Button from '../common/Button.jsx'
import Loader from '../common/Loader.jsx'
import { fetchAvailabilityLog, revertAvailabilityChange } from '../../api/deanApi'
import { formatDate } from '../../utils/dateHelpers'

export default function AvailabilityLog() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [actingId, setActingId] = useState(null)

  useEffect(() => { load() }, [])

  function load() {
    setLoading(true)
    fetchAvailabilityLog()
      .then(({ data }) => setEntries(data.results || data || []))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false))
  }

  async function handleRevert(id) {
    setActingId(id)
    try { await revertAvailabilityChange(id); load() } finally { setActingId(null) }
  }

  if (loading) return <Loader />

  if (entries.length === 0) {
    return <p className="muted">No availability changes logged yet.</p>
  }

  return (
    <div className="stack">
      {entries.map((entry) => (
        <div key={entry.id} className="row-between card-tight card">
          <div>
            <strong>{entry.doctor_name}</strong>
            <span className={`badge ${entry.status === 'available' ? 'badge-success' : 'badge-warning'}`} style={{ marginLeft: 8 }}>
              {entry.status === 'available' ? 'Added availability' : 'Marked unavailable'}
            </span>
            <p className="muted" style={{ margin: '6px 0 0' }}>
              {formatDate(entry.date)} — {entry.note}
            </p>
          </div>
          {!entry.reverted ? (
            <Button size="sm" variant="secondary" disabled={actingId === entry.id} onClick={() => handleRevert(entry.id)}>
              Revert
            </Button>
          ) : (
            <span className="badge badge-muted">Reverted</span>
          )}
        </div>
      ))}
    </div>
  )
}
