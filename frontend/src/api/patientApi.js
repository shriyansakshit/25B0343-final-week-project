import axiosInstance from './axiosInstance'

export function fetchMyAppointments() {
  return axiosInstance.get('/appointments/mine/')
}

export function cancelAppointment(appointmentId) {
  return axiosInstance.post(`/appointments/${appointmentId}/cancel/`)
}

export function fetchNotifications() {
  return axiosInstance.get('/notifications/mine/')
}
