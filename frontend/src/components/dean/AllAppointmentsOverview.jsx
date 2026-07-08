import { useEffect, useState } from 'react'
import Loader from '../common/Loader.jsx'
import { fetchAllAppointments } from '../../api/deanApi'
import { formatDate, formatTime } from '../../utils/dateHelpers'

export default function AllAppointmentsOverview() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllAppointments()
      .then(({ data }) => setAppointments(data.results || data || []))
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />

  if (appointments.length === 0) {
    return <p className="muted">No appointments booked hospital-wide yet.</p>
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
      <thead>
        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>
          <th style={{ padding: '8px 4px' }}>Patient</th>
          <th style={{ padding: '8px 4px' }}>Doctor</th>
          <th style={{ padding: '8px 4px' }}>When</th>
          <th style={{ padding: '8px 4px' }}>Mode</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((a) => (
          <tr key={a.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
            <td style={{ padding: '8px 4px' }}>{a.patient_name}</td>
            <td style={{ padding: '8px 4px' }}>{a.doctor_name}</td>
            <td style={{ padding: '8px 4px' }} className="mono">{formatDate(a.date)} {formatTime(a.time)}</td>
            <td style={{ padding: '8px 4px' }}>{a.mode === 'online' ? 'Online' : 'In person'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
