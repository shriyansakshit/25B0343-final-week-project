import { useState } from 'react'
import Card from '../common/Card.jsx'
import DoctorVerificationList from './DoctorVerificationList.jsx'
import AvailabilityLog from './AvailabilityLog.jsx'
import EmergencyQueue from './EmergencyQueue.jsx'
import AllAppointmentsOverview from './AllAppointmentsOverview.jsx'

const TABS = [
  { key: 'verification', label: 'Doctor verification' },
  { key: 'availability', label: 'Availability log' },
  { key: 'emergency', label: 'Emergency queue' },
  { key: 'appointments', label: 'All appointments' },
]

export default function DeanDashboard() {
  const [tab, setTab] = useState('verification')

  return (
    <div className="stack">
      <div>
        <h2>Dean's office</h2>
        <p className="muted">Oversight for doctor accounts, schedule changes, and emergency response.</p>
      </div>

      <div className="row" style={{ flexWrap: 'wrap' }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`btn btn-sm ${tab === t.key ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <Card>
        {tab === 'verification' && <DoctorVerificationList />}
        {tab === 'availability' && <AvailabilityLog />}
        {tab === 'emergency' && <EmergencyQueue />}
        {tab === 'appointments' && <AllAppointmentsOverview />}
      </Card>
    </div>
  )
}
