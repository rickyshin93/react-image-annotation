import './button.css'

interface ButtonProps {
  className?: string
  primary?: boolean
  backgroundColor?: string
  size?: 'small' | 'medium' | 'large'
  children: string
  onClick?: () => void
}

export const Button = ({ primary = false, size = 'medium', backgroundColor, children, ...props }: ButtonProps) => {
  const mode = primary ? 'demo-button--primary' : 'demo-button--secondary'
  return (
    <button
      type="button"
      className={['demo-button', `demo-button--${size}`, mode].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {children}
    </button>
  )
}
