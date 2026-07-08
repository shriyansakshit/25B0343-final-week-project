import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="container page">
      <section className="hero">
        <span className="hero-eyebrow">Meridian General Hospital</span>
        <h1>Care that starts before you walk in.</h1>
        <p style={{ maxWidth: 560, fontSize: '1.05rem' }}>
          Book with the right specialist, reach an on-call doctor in an emergency, or let a quick
          symptom check point you in the right direction — all from one place.
        </p>
        <div className="hero-cta-row">
          <Link to="/doctors" className="btn btn-primary">Find a doctor</Link>
          <Link to="/symptom-checker" className="btn btn-secondary">Not sure who to see?</Link>
          <Link to="/emergency" className="btn btn-emergency">Emergency</Link>
        </div>
      </section>

      <div className="pulse-divider" />

      <section className="grid-3">
        <FeatureCard
          title="Book with confidence"
          body="Search doctors by department, see real open slots, and book in-person or online in a couple of taps."
        />
        <FeatureCard
          title="Emergency, handled fast"
          body="Send an ambulance or grab the next slot with an on-call emergency doctor — no account digging required."
        />
        <FeatureCard
          title="Not sure who to see?"
          body="Answer a couple of quick questions and we'll point you to the right department, or a general physician."
        />
      </section>

      <div className="pulse-divider" />

      <section className="grid-2">
        <div className="card">
          <h3>Visiting hours</h3>
          <p className="mono muted">Mon–Sat · 9:00 AM – 8:00 PM</p>
          <p className="mono muted">Emergency department · 24/7</p>
        </div>
        <div className="card">
          <h3>Reach us</h3>
          <p className="mono muted">Non-emergency: +91 6268489732</p>
          <p className="mono muted">Address: BDA Road, Bhopal</p>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ title, body }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p style={{ margin: 0 }}>{body}</p>
    </div>
  )
}
