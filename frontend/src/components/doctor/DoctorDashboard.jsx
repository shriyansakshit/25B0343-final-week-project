import { useEffect, useState } from 'react'
import Card from '../common/Card.jsx'
import Loader from '../common/Loader.jsx'
import DoctorProfileCard from './DoctorProfileCard.jsx'
import TodaysAppointments from './TodaysAppointments.jsx'
import ScheduleTable from './ScheduleTable.jsx'
import AvailabilityEditor from './AvailabilityEditor.jsx'
import { fetchMySchedule } from '../../api/doctorApi'
import { useAuth } from '../../context/AuthContext.jsx'

export default function DoctorDashboard() {
  const { user } = useAuth()
  const [scheduleData, setScheduleData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [])

  function load() {
    setLoading(true)
    fetchMySchedule()
      .then(({ data }) => setScheduleData(data))
      .catch(() => setScheduleData({ weekly: {}, today: [] }))
      .finally(() => setLoading(false))
  }

  if (loading) return <Loader />

  return (
    <div className="stack">
      <DoctorProfileCard doctor={user} />

      {!user?.verified && (
        <div className="card" style={{ borderColor: 'var(--color-warning)' }}>
          <p style={{ margin: 0 }}>
            <strong>Your account is awaiting dean verification.</strong> You won't appear in the
            patient-facing directory until then.
          </p>
        </div>
      )}

      <div className="grid-2">
        <Card>
          <h3>Today's appointments</h3>
          <TodaysAppointments appointments={scheduleData?.today} />
        </Card>

        <Card>
          <h3>Weekly schedule</h3>
          <ScheduleTable schedule={scheduleData?.weekly} />
        </Card>
      </div>

      <Card>
        <h3>Update availability</h3>
        <AvailabilityEditor onChanged={load} />
      </Card>
    </div>
  )
}
