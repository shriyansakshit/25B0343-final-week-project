import { useEffect, useState } from 'react'
import Loader from '../common/Loader.jsx'
import DoctorDetailCard from './DoctorDetailCard.jsx'
import { fetchDoctors } from '../../api/doctorApi'

export default function DoctorList({ department }) {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchDoctors(department ? { department } : {})
      .then(({ data }) => setDoctors(data.results || data || []))
      .catch(() => setDoctors([]))
      .finally(() => setLoading(false))
  }, [department])

  if (loading) return <Loader />

  if (doctors.length === 0) {
    return <p className="muted">No verified doctors in this department yet.</p>
  }

  return (
    <div className="stack">
      {doctors.map((d) => <DoctorDetailCard key={d.id} doctor={d} />)}
    </div>
  )
}
