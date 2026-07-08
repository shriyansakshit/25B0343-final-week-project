export default function Card({ children, tight, className = '', ...rest }) {
  return (
    <div className={`card ${tight ? 'card-tight' : ''} ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
}
