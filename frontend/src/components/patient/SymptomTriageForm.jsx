import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../common/Button.jsx'
import { TRIAGE_TREE, BODY_AREAS } from '../../constants/symptomMap'
import { logTriageOutcome } from '../../api/triageApi'

export default function SymptomTriageForm() {
  const [bodyArea, setBodyArea] = useState('')
  const [symptom, setSymptom] = useState(null)
  const navigate = useNavigate()

  const areaConfig = bodyArea ? TRIAGE_TREE[bodyArea] : null
  const department = areaConfig?.forceDepartment || symptom?.department || null

  function reset() {
    setBodyArea('')
    setSymptom(null)
  }

  async function proceedToGeneral() {
    try { await logTriageOutcome({ bodyArea: 'unspecified', symptom: 'unsure', department: 'General Medicine' }) } catch { /* non-blocking */ }
    navigate('/doctors?department=General Medicine')
  }

  async function proceedToDepartment() {
    try { await logTriageOutcome({ bodyArea, symptom: symptom?.label || symptom, department }) } catch { /* non-blocking */ }
    navigate(`/doctors?department=${encodeURIComponent(department)}`)
  }

  if (department) {
    return (
      <div className="card text-center">
        <h3>We'd suggest {department}</h3>
        <p className="muted">
          This is a starting point, not a diagnosis — the doctor you book with may refer you
          onward if needed.
        </p>
        <div className="row" style={{ justifyContent: 'center', marginTop: 16 }}>
          <Button onClick={proceedToDepartment}>See {department} doctors</Button>
          <Button variant="secondary" onClick={reset}>Start over</Button>
        </div>
      </div>
    )
  }

  if (bodyArea && areaConfig) {
    return (
      <div className="card">
        <h3>What best describes it?</h3>
        <div className="stack">
          {areaConfig.symptoms.map((s) => {
            const isObj = typeof s === 'object'
            const label = isObj ? s.label : s
            return (
              <button
                key={label}
                type="button"
                className="btn btn-secondary btn-block"
                style={{ justifyContent: 'flex-start' }}
                onClick={() => setSymptom(isObj ? s : { label: s })}
              >
                {label}
              </button>
            )
          })}
        </div>
        <div style={{ marginTop: 16 }}>
          <Button variant="ghost" size="sm" onClick={reset}>← Choose a different area</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h3>Where is the concern?</h3>
      <div className="stack">
        {BODY_AREAS.map((area) => (
          <button
            key={area}
            type="button"
            className="btn btn-secondary btn-block"
            style={{ justifyContent: 'flex-start' }}
            onClick={() => setBodyArea(area)}
          >
            {area}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <Button variant="ghost" size="sm" onClick={proceedToGeneral}>
          Not sure — just book a general physician
        </Button>
      </div>
    </div>
  )
}
