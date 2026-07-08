import { useEffect, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import Loader from '../components/common/Loader.jsx'
import BookAppointmentForm from '../components/patient/BookAppointmentForm.jsx'
import { fetchDoctorById } from '../api/doctorApi'

export default function BookAppointmentPage() {
  const { doctorId } = useParams()
  const [searchParams] = useSearchParams()
  const defaultMode = searchParams.get('mode') === 'online' ? 'online' : 'in-person'
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchDoctorById(doctorId)
      .then(({ data }) => setDoctor(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [doctorId])

  if (loading) return <div className="container page"><Loader /></div>

  if (error || !doctor) {
    return (
      <div className="container page">
        <p>We couldn't load that doctor. <Link to="/doctors">Back to the directory</Link></p>
      </div>
    )
  }

  return (
    <div className="container page" style={{ maxWidth: 640 }}>
      <h2>Book with {doctor.name}</h2>
      <p className="muted">{doctor.specialty}</p>
      <div className="card">
        <BookAppointmentForm doctor={doctor} defaultMode={defaultMode} />
      </div>
    </div>
  )
}
