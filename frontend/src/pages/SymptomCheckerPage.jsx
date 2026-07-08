import SymptomTriageForm from '../components/patient/SymptomTriageForm.jsx'

export default function SymptomCheckerPage() {
  return (
    <div className="container page" style={{ maxWidth: 560 }}>
      <h2>Not sure who to see?</h2>
      <p className="muted">
        Answer a couple of quick questions. This is a guide, not a diagnosis.
      </p>
      <SymptomTriageForm />
    </div>
  )
}
