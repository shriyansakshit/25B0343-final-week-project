import axiosInstance from './axiosInstance'

export function fetchPendingDoctors() {
  return axiosInstance.get('/dean/doctors/pending/')
}

export function verifyDoctor(doctorId) {
  return axiosInstance.post(`/dean/doctors/${doctorId}/verify/`)
}

export function rejectDoctor(doctorId) {
  return axiosInstance.post(`/dean/doctors/${doctorId}/reject/`)
}

export function fetchAvailabilityLog() {
  return axiosInstance.get('/dean/availability-log/')
}

export function revertAvailabilityChange(logId) {
  return axiosInstance.post(`/dean/availability-log/${logId}/revert/`)
}

export function fetchAllAppointments() {
  return axiosInstance.get('/dean/appointments/')
}

export function fetchEmergencyQueue() {
  return axiosInstance.get('/dean/emergency-queue/')
}

export function resolveEmergencyRequest(requestId) {
  return axiosInstance.post(`/dean/emergency-queue/${requestId}/resolve/`)
}
