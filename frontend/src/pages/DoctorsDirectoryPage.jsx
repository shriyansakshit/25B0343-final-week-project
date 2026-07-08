import { useSearchParams } from 'react-router-dom'
import DoctorFilterBar from '../components/doctors-directory/DoctorFilterBar.jsx'
import DoctorList from '../components/doctors-directory/DoctorList.jsx'

export default function DoctorsDirectoryPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const department = searchParams.get('department') || ''

  function setDepartment(value) {
    if (value) setSearchParams({ department: value })
    else setSearchParams({})
  }

  return (
    <div className="container page">
      <h2>Find a doctor</h2>
      <p className="muted">Browse by department, or book directly with anyone below.</p>
      <div className="stack">
        <DoctorFilterBar value={department} onChange={setDepartment} />
        <DoctorList department={department} />
      </div>
    </div>
  )
}
