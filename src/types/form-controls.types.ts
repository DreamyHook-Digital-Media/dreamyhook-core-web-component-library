export interface ToggleProps {
  modelValue?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  label?: string
  description?: string
  id?: string
  name?: string
}

export interface RadioOption {
  value: string | number
  label: string
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  modelValue?: string | number
  options: RadioOption[]
  disabled?: boolean
  name: string
  orientation?: 'horizontal' | 'vertical'
}

export interface CheckboxProps {
  modelValue?: boolean | 'indeterminate'
  label?: string
  description?: string
  disabled?: boolean
  indeterminate?: boolean
  size?: 'sm' | 'md' | 'lg'
  id?: string
  name?: string
}

export interface FileUploadProps {
  modelValue?: File | File[] | null
  multiple?: boolean
  accept?: string
  maxSize?: number // in bytes
  disabled?: boolean
  dragDrop?: boolean
}

export interface FileUploadState {
  isDragging: boolean
  files: File[]
  errors: string[]
}