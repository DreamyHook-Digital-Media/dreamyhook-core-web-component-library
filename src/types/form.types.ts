export type InputSize = 'sm' | 'md' | 'lg'
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'

export interface InputProps {
  modelValue?: string | number
  type?: InputType
  size?: InputSize
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  error?: boolean
  errorMessage?: string
  leftIcon?: any // Vue component
  rightIcon?: any // Vue component
  id?: string
  name?: string
  autocomplete?: string
}

export interface LabelProps {
  htmlFor?: string
  required?: boolean
  disabled?: boolean
}

export interface FormFieldProps {
  label?: string
  error?: string
  hint?: string
  required?: boolean
  disabled?: boolean
}