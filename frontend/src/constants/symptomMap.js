// Options-only decision tree: body area -> symptom -> department.
// This deliberately avoids free-text / NLP so it can be built and
// trusted quickly. "Not sure" is always available as an escape hatch
// that routes to a General Medicine consult instead.

export const TRIAGE_TREE = {
  'This is for my child': {
    symptoms: ['Any concern about my child'],
    forceDepartment: 'Pediatrics',
  },
  'Head & Face': {
    symptoms: [
      { label: 'Headache or migraine', department: 'Neurology' },
      { label: 'Blurred vision or eye pain', department: 'Ophthalmology' },
      { label: 'Toothache or jaw pain', department: 'Dentistry' },
      { label: 'Ear pain or hearing trouble', department: 'ENT (Ear, Nose & Throat)' },
      { label: 'Facial rash or skin irritation', department: 'Dermatology' },
    ],
  },
  'Chest & Breathing': {
    symptoms: [
      { label: 'Chest pain or palpitations', department: 'Cardiology' },
      { label: 'Persistent cough or breathlessness', department: 'General Medicine' },
    ],
  },
  'Abdomen & Digestion': {
    symptoms: [
      { label: 'Stomach pain or nausea', department: 'General Medicine' },
      { label: 'Ongoing digestive issues', department: 'General Medicine' },
    ],
  },
  'Bones, Joints & Muscles': {
    symptoms: [
      { label: 'Joint pain, sprain or suspected fracture', department: 'Orthopedics' },
      { label: 'Muscle pain after injury', department: 'Orthopedics' },
    ],
  },
  'Skin': {
    symptoms: [
      { label: 'Rash, itching or allergy', department: 'Dermatology' },
    ],
  },
  "Women's Health": {
    symptoms: [
      { label: 'Reproductive health concern', department: 'Gynecology' },
    ],
  },
  'Mood & Mind': {
    symptoms: [
      { label: 'Anxiety, low mood or stress', department: 'Psychiatry' },
    ],
  },
  "Not sure / general check-up": {
    symptoms: ['I just want to see a doctor'],
    forceDepartment: 'General Medicine',
  },
}

export const BODY_AREAS = Object.keys(TRIAGE_TREE)
