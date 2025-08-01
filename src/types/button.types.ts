export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'
export type ButtonType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  leftIcon?: any // Vue component
  rightIcon?: any // Vue component
  as?: string | object // HTML tag or Vue component
  href?: string
}