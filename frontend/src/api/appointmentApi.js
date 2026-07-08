import axiosInstance from './axiosInstance'

export function fetchAvailableSlots(doctorId, date) {
  return axiosInstance.get(`/doctors/${doctorId}/slots/`, { params: { date } })
}

export function bookAppointment({ doctorId, date, time, mode }) {
  // mode: 'in-person' | 'online'
  return axiosInstance.post('/appointments/book/', { doctor: doctorId, date, time, mode })
}
