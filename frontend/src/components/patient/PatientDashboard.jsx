import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../common/Card.jsx'
import Loader from '../common/Loader.jsx'
import AppointmentHistory from './AppointmentHistory.jsx'
import { fetchMyAppointments, cancelAppointment } from '../../api/patientApi'
import { useAuth } from '../../context/AuthContext.jsx'

export default function PatientDashboard() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

  function load() {
    setLoading(true)
    fetchMyAppointments()
      .then(({ data }) => setAppointments(data.results || data || []))
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false))
  }

  async function handleCancel(id) {
    await cancelAppointment(id)
    load()
  }

  const upcoming = appointments.filter((a) => a.status !== 'cancelled')

  return (
    <div className="stack">
      <div className="row-between">
        <div>
          <h2>Welcome back, {user?.name?.split(' ')[0]}</h2>
          <p className="muted">Here's what's coming up.</p>
        </div>
        <div className="row">
          <Link to="/symptom-checker" className="btn btn-secondary">Not sure who to see?</Link>
          <Link to="/doctors" className="btn btn-primary">Book an appointment</Link>
        </div>
      </div>

      <Card>
        <h3>Upcoming & recent appointments</h3>
        {loading ? <Loader /> : <AppointmentHistory appointments={upcoming} onCancel={handleCancel} />}
      </Card>
    </div>
  )
}
