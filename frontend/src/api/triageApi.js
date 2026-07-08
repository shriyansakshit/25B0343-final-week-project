import axiosInstance from './axiosInstance'

// Triage itself runs client-side against constants/symptomMap.js — it's an
// options-only decision tree, not a real model, so no network call is
// needed to produce a suggestion. This just logs the outcome server-side
// so it shows up as an appointment referral, e.g. when the patient
// proceeds to book with the suggested department.
export function logTriageOutcome({ bodyArea, symptom, department }) {
  return axiosInstance.post('/triage/log/', { bodyArea, symptom, department })
}
