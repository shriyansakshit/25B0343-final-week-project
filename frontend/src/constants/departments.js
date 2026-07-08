// Single source of truth for specialties. Used by doctor signup,
// the doctors directory filter, and the symptom triage map — keep
// this list and symptomMap.js in sync.

export const DEPARTMENTS = [
  'General Medicine',
  'Cardiology',
  'Orthopedics',
  'Pediatrics',
  'Dermatology',
  'ENT (Ear, Nose & Throat)',
  'Gynecology',
  'Neurology',
  'Ophthalmology',
  'Psychiatry',
  'Dentistry',
  'Emergency Medicine',
]

export const DEPARTMENT_SLUGS = DEPARTMENTS.reduce((acc, name) => {
  acc[name] = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  return acc
}, {})
