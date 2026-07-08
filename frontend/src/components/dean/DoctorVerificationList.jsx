import { useEffect, useState } from 'react'
import Button from '../common/Button.jsx'
import Loader from '../common/Loader.jsx'
import { fetchPendingDoctors, verifyDoctor, rejectDoctor } from '../../api/deanApi'

export default function DoctorVerificationList() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [actingId, setActingId] = useState(null)

  useEffect(() => { load() }, [])

  function load() {
    setLoading(true)
    fetchPendingDoctors()
      .then(({ data }) => setDoctors(data.results || data || []))
      .catch(() => setDoctors([]))
      .finally(() => setLoading(false))
  }

  async function handleVerify(id) {
    setActingId(id)
    try { await verifyDoctor(id); load() } finally { setActingId(null) }
  }

  async function handleReject(id) {
    setActingId(id)
    try { await rejectDoctor(id); load() } finally { setActingId(null) }
  }

  if (loading) return <Loader />

  if (doctors.length === 0) {
    return <p className="muted">No doctor accounts waiting on verification.</p>
  }

  return (
    <div className="stack">
      {doctors.map((d) => (
        <div key={d.id} className="row-between card-tight card">
          <div>
            <strong>{d.name}</strong>
            <p className="muted" style={{ margin: '2px 0 0' }}>{d.specialty}</p>
          </div>
          <div className="row">
            <Button size="sm" variant="secondary" disabled={actingId === d.id} onClick={() => handleReject(d.id)}>
              Reject
            </Button>
            <Button size="sm" disabled={actingId === d.id} onClick={() => handleVerify(d.id)}>
              Verify
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
