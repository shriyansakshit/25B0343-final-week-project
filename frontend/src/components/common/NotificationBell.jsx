import { useEffect, useRef, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'

export default function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [loaded, setLoaded] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function toggleOpen() {
    const next = !open
    setOpen(next)
    if (next && !loaded) {
      try {
        const { data } = await axiosInstance.get('/notifications/mine/')
        setNotifications(data.results || data || [])
      } catch {
        setNotifications([])
      }
      setLoaded(true)
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <button className="btn btn-ghost btn-sm" onClick={toggleOpen} aria-label="Notifications">
        🔔{unreadCount > 0 && <span className="badge badge-emergency">{unreadCount}</span>}
      </button>

      {open && (
        <div
          className="card"
          style={{ position: 'absolute', right: 0, top: '110%', width: 300, zIndex: 30 }}
        >
          <h3 style={{ fontSize: '1rem' }}>Notifications</h3>
          {notifications.length === 0 ? (
            <p className="muted">Nothing new right now.</p>
          ) : (
            <div className="stack" style={{ gap: 10 }}>
              {notifications.map((n) => (
                <div key={n.id} style={{ fontSize: '0.87rem' }}>
                  <strong>{n.title}</strong>
                  <p style={{ margin: 0 }} className="muted">{n.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
