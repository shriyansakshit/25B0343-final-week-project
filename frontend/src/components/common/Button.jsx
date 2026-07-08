export default function Button({
  children,
  variant = 'primary', // primary | secondary | emergency | ghost
  size,
  block,
  type = 'button',
  ...rest
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size === 'sm' ? 'btn-sm' : '',
    block ? 'btn-block' : '',
  ].filter(Boolean).join(' ')

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
