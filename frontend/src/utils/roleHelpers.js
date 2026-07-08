export const ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  DEAN: 'dean',
}

export function dashboardPathForRole(role) {
  switch (role) {
    case ROLES.PATIENT:
      return '/patient/dashboard'
    case ROLES.DOCTOR:
      return '/doctor/dashboard'
    case ROLES.DEAN:
      return '/dean/dashboard'
    default:
      return '/'
  }
}

export function roleLabel(role) {
  switch (role) {
    case ROLES.PATIENT: return 'Patient'
    case ROLES.DOCTOR: return 'Doctor'
    case ROLES.DEAN: return 'Dean'
    default: return role
  }
}
