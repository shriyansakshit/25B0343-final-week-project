export default function AboutPage() {
  return (
    <div className="container page" style={{ maxWidth: 720 }}>
      <h2>About Meridian General</h2>
      <p>
        Meridian General is a community hospital offering general and specialist care across
        twelve departments, both in person and online. This site lets patients book directly
        with the right specialist, doctors manage their own schedules, and the dean's office
        keep oversight of both — including emergency response.
      </p>

      <div className="pulse-divider" />

      <div className="grid-2">
        <div className="card">
          <h3>Visiting hours</h3>
          <p className="mono muted">Mon–Sat · 9:00 AM – 8:00 PM</p>
          <p className="mono muted">Emergency department · 24/7</p>
        </div>
        <div className="card">
          <h3>Reach us</h3>
          <p className="mono muted">Non-emergency: +91 6268489732</p>
          <p className="mono muted">Address: ness Road, your city</p>
        </div>
      </div>
    </div>
  )
}
