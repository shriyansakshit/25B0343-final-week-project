export function formatDate(dateString) {
  if (!dateString) return ''
  const d = new Date(dateString)
  if (Number.isNaN(d.getTime())) return dateString
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}

export function formatTime(timeString) {
  if (!timeString) return ''
  // Accepts "HH:MM" or a full ISO string
  const [h, m] = timeString.includes('T')
    ? new Date(timeString).toTimeString().slice(0, 5).split(':')
    : timeString.split(':')
  const hour = parseInt(h, 10)
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const hour12 = ((hour + 11) % 12) + 1
  return `${hour12}:${m} ${suffix}`
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export function nextNDays(n = 7) {
  const days = []
  for (let i = 0; i < n; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    days.push(d.toISOString().slice(0, 10))
  }
  return days
}
