const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function ScheduleTable({ schedule }) {
  // schedule: { Mon: '9:00 AM – 1:00 PM', ... } or falsy for day off
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <tbody>
        {DAYS.map((day) => (
          <tr key={day} style={{ borderBottom: '1px solid var(--color-border)' }}>
            <td style={{ padding: '8px 4px', fontWeight: 600, width: 60 }}>{day}</td>
            <td className="mono" style={{ padding: '8px 4px' }}>
              {schedule?.[day] || <span className="muted">Off</span>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
