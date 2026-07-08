import axiosInstance from './axiosInstance'

export function fetchDoctors(params = {}) {
  // params: { department }
  return axiosInstance.get('/doctors/', { params })
}

export function fetchDoctorById(doctorId) {
  return axiosInstance.get(`/doctors/${doctorId}/`)
}

export function fetchMySchedule() {
  return axiosInstance.get('/doctor/schedule/mine/')
}

export function fetchMyAvailability() {
  return axiosInstance.get('/doctor/availability/mine/')
}

// Doctor submits a change to their availability (extra slot, or marking
// themselves unavailable). It applies immediately but is logged so the
// dean can see and, if needed, revert it.
export function submitAvailabilityChange({ date, status, note }) {
  return axiosInstance.post('/doctor/availability/request/', { date, status, note })
}
