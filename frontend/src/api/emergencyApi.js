import axiosInstance from './axiosInstance'

export function requestAmbulance({ location, contact, situation }) {
  return axiosInstance.post('/emergency/ambulance/', { location, contact, situation })
}

export function bookEmergencySlot() {
  // Books the next available slot with an on-call emergency doctor.
  return axiosInstance.post('/emergency/book-slot/')
}
