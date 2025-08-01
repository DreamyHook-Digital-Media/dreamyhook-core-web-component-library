export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
  [key: string]: any // Allow additional properties
}

export interface SelectProps {
  modelValue?: string | number | null
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  multiple?: boolean
  searchable?: boolean
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  id?: string
  name?: string
}

export interface AutocompleteProps extends Omit<SelectProps, 'searchable'> {
  displayValue?: (item: any) => string
  filterFunction?: (query: string, items: SelectOption[]) => SelectOption[]
  loading?: boolean
  noResultsText?: string
}