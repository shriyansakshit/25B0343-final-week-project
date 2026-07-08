export default function Input({ label, hint, error, id, as = 'input', children, ...rest }) {
  const inputId = id || rest.name

  return (
    <div className="field">
      {label && <label htmlFor={inputId}>{label}</label>}
      {as === 'select' ? (
        <select id={inputId} {...rest}>{children}</select>
      ) : as === 'textarea' ? (
        <textarea id={inputId} {...rest} />
      ) : (
        <input id={inputId} {...rest} />
      )}
      {hint && !error && <div className="field-hint">{hint}</div>}
      {error && <div className="field-error">{error}</div>}
    </div>
  )
}
