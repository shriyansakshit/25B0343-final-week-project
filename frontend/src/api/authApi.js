import axiosInstance from './axiosInstance'

// --- Patient ---
export function signupPatient({ name, phone, address, password }) {
  return axiosInstance.post('/auth/signup/patient/', { name, phone, address, password })
}

export function loginPatient({ phone, password }) {
  return axiosInstance.post('/auth/login/', { role: 'patient', phone, password })
}

// --- Doctor ---
// Password is fixed to "doctor" for every doctor account, per hospital policy.
// Name + specialty is what distinguishes one doctor from another.
export function signupDoctor({ name, specialty }) {
  return axiosInstance.post('/auth/signup/doctor/', { name, specialty, password: 'doctor' })
}

export function loginDoctor({ name, specialty, password }) {
  return axiosInstance.post('/auth/login/', { role: 'doctor', name, specialty, password })
}

// --- Dean ---
// Single seeded account. No signup screen.
export function loginDean({ password }) {
  return axiosInstance.post('/auth/login/', { role: 'dean', password })
}

export function logout() {
  return axiosInstance.post('/auth/logout/')
}

export function fetchCurrentUser() {
  return axiosInstance.get('/auth/me/')
}
