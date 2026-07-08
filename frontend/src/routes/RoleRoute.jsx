import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { dashboardPathForRole } from '../utils/roleHelpers'
import Loader from '../components/common/Loader.jsx'

export default function RoleRoute({ allow, children }) {
  const { role, loading } = useAuth()

  if (loading) return <Loader />

  if (!allow.includes(role)) {
    return <Navigate to={dashboardPathForRole(role)} replace />
  }

  return children
}
