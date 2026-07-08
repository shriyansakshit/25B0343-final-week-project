import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RoleSelector from './RoleSelector.jsx'
import Input from '../common/Input.jsx'
import Button from '../common/Button.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { ROLES, dashboardPathForRole } from '../../utils/roleHelpers'
import { DEPARTMENTS } from '../../constants/departments'

const initialForm = { phone: '', password: '', name: '', specialty: DEPARTMENTS[0] }

export default function LoginForm() {
  const [role, setRole] = useState(ROLES.PATIENT)
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { loginPatient, loginDoctor, loginDean } = useAuth()
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
        user = await loginPatient({ phone: form.phone, password: form.password })
      } else if (role === ROLES.DOCTOR) {
        user = await loginDoctor({ name: form.name, specialty: form.specialty, password: form.password })
      } else {
        user = await loginDean({ password: form.password })
      }
      navigate(dashboardPathForRole(user.role))
    } catch (err) {
      setError(err.response?.data?.detail || 'Could not log in. Check your details and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-card">
      <Card />
      <form onSubmit={handleSubmit}>
        <RoleSelector value={role} onChange={setRole} />

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
              label="Position"
              value="Doctor"
              disabled
              readOnly
            />
            <Input
              label="Your name"
              name="name"
              required
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
            />
            <Input
              as="select"
              label="Type of doctor"
              name="specialty"
              value={form.specialty}
              onChange={(e) => update('specialty', e.target.value)}
            >
              {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </Input>
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Password is 'doctor'"
              hint="All doctor accounts share the same password: doctor"
              required
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
            />
          </>
        )}

        {role === ROLES.DEAN && (
          <>
            <Input label="Position" value="Dean" disabled readOnly />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Password is 'dean'"
              required
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
            />
          </>
        )}

        {error && <p className="field-error">{error}</p>}

        <Button type="submit" block disabled={submitting}>
          {submitting ? 'Signing in…' : 'Log in'}
        </Button>
      </form>
    </div>
  )
}

function Card() {
  return (
    <div className="text-center" style={{ marginBottom: 20 }}>
      <h2>Welcome back</h2>
      <p className="muted">Choose your role to continue.</p>
    </div>
  )
}
