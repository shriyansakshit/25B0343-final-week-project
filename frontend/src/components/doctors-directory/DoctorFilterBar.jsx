import { DEPARTMENTS } from '../../constants/departments'

export default function DoctorFilterBar({ value, onChange }) {
  return (
    <div className="row" style={{ flexWrap: 'wrap' }}>
      <button
        className={`btn btn-sm ${!value ? 'btn-primary' : 'btn-secondary'}`}
        onClick={() => onChange('')}
      >
        All departments
      </button>
      {DEPARTMENTS.map((d) => (
        <button
          key={d}
          className={`btn btn-sm ${value === d ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => onChange(d)}
        >
          {d}
        </button>
      ))}
    </div>
  )
}
