import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../common/Input.jsx'
import Button from '../common/Button.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { ROLES, dashboardPathForRole } from '../../utils/roleHelpers'
import { DEPARTMENTS } from '../../constants/departments'

const initialForm = {
  name: '', phone: '', address: '', password: '',
  specialty: DEPARTMENTS[0],
}

export default function SignupForm() {
  const [role, setRole] = useState(ROLES.PATIENT)
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { signupPatient, signupDoctor } = useAuth()
  const navigate = useNavigate()

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      let user
      if (role === ROLES.PATIENT) {
        user = await signupPatient({
          name: form.name, phone: form.phone, address: form.address, password: form.password,
        })
      } else {
        user = await signupDoctor({ name: form.name, specialty: form.specialty })
      }
      navigate(dashboardPathForRole(user.role))
    } catch (err) {
      setError(err.response?.data?.detail || 'Could not create the account. Check your details and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-card">
      <div className="text-center" style={{ marginBottom: 20 }}>
        <h2>Create an account</h2>
        <p className="muted">The dean's account is pre-set and does not register here.</p>
      </div>

      <div className="role-tabs" style={{ marginBottom: 24 }}>
        <button
          type="button"
          className={`role-tab ${role === ROLES.PATIENT ? 'active' : ''}`}
          onClick={() => setRole(ROLES.PATIENT)}
        >
          Patient
        </button>
        <button
          type="button"
          className={`role-tab ${role === ROLES.DOCTOR ? 'active' : ''}`}
          onClick={() => setRole(ROLES.DOCTOR)}
        >
          Doctor
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          label="Full name"
          name="name"
          required
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
        />

        {role === ROLES.PATIENT && (
          <>
            <Input
              label="Phone number"
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
            />
            <Input
              label="Address"
              name="address"
              as="textarea"
              rows={2}
              required
              value={form.address}
              onChange={(e) => update('address', e.target.value)}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
            />
          </>
        )}

        {role === ROLES.DOCTOR && (
          <>
            <Input
              as="select"
              label="Type of doctor"
              name="specialty"
              value={form.specialty}
              onChange={(e) => update('specialty', e.target.value)}
            >
              {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </Input>
            <p className="field-hint" style={{ marginTop: -8, marginBottom: 18 }}>
              Your password is fixed to <strong>doctor</strong> — the dean verifies new doctor
              accounts before they appear in the directory.
            </p>
          </>
        )}

        {error && <p className="field-error">{error}</p>}

        <Button type="submit" block disabled={submitting}>
          {submitting ? 'Creating account…' : 'Sign up'}
        </Button>
      </form>
    </div>
  )
}
