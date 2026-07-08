import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/common/Loader.jsx'
import DoctorFilterBar from '../components/doctors-directory/DoctorFilterBar.jsx'
import { fetchDoctors } from '../api/doctorApi'

export default function OnlineConsultationPage() {
  const [department, setDepartment] = useState('')
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchDoctors(department ? { department } : {})
      .then(({ data }) => setDoctors(data.results || data || []))
      .catch(() => setDoctors([]))
      .finally(() => setLoading(false))
  }, [department])

  return (
    <div className="container page">
      <h2>Online consultation</h2>
      <p className="muted">
        Same doctors, same booking flow — just a video/chat consult instead of an in-person visit.
      </p>

      <div className="stack">
        <DoctorFilterBar value={department} onChange={setDepartment} />

        {loading ? (
          <Loader />
        ) : doctors.length === 0 ? (
          <p className="muted">No verified doctors in this department yet.</p>
        ) : (
          <div className="stack">
            {doctors.map((d) => (
              <div key={d.id} className="card row-between">
                <div>
                  <h3 style={{ marginBottom: 2 }}>{d.name}</h3>
                  <p className="muted" style={{ margin: 0 }}>{d.specialty}</p>
                </div>
                <Link to={`/book/${d.id}?mode=online`} className="btn btn-primary btn-sm">
                  Book online consult
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
