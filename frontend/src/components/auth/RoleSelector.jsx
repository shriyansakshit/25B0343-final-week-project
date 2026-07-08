import { ROLES } from '../../utils/roleHelpers'

const OPTIONS = [
  { value: ROLES.PATIENT, label: 'Patient' },
  { value: ROLES.DOCTOR, label: 'Doctor' },
  { value: ROLES.DEAN, label: 'Dean' },
]

export default function RoleSelector({ value, onChange }) {
  return (
    <div className="role-tabs" role="tablist" aria-label="Choose role">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="tab"
          aria-selected={value === opt.value}
          className={`role-tab ${value === opt.value ? 'active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
