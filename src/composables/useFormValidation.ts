import { ref, reactive, computed } from 'vue'

export type ValidationRule<T = any> = {
  required?: boolean
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  email?: boolean
  url?: boolean
  custom?: (value: T) => string | boolean
  message?: string
}

export type FieldValidation = {
  value: any
  rules: ValidationRule[]
  error: string
  touched: boolean
  valid: boolean
}

export type FormValidation = {
  [key: string]: FieldValidation
}

export function useFormValidation<T extends Record<string, any>>(initialData: T) {
  const formData = reactive<T>({ ...initialData })
  const fields = reactive<FormValidation>({})
  const isSubmitting = ref(false)

  // Initialize fields
  Object.keys(initialData).forEach(key => {
    fields[key] = {
      value: initialData[key],
      rules: [],
      error: '',
      touched: false,
      valid: true
    }
  })

  const addField = (name: string, rules: ValidationRule[] = []) => {
    if (!fields[name]) {
      fields[name] = {
        value: formData[name] || '',
        rules,
        error: '',
        touched: false,
        valid: true
      }
    } else {
      fields[name].rules = rules
    }
  }

  const validateField = (name: string): boolean => {
    const field = fields[name]
    if (!field) return true

    const value = formData[name]
    field.error = ''

    for (const rule of field.rules) {
      let isValid = true
      let errorMessage = rule.message || 'Invalid value'

      // Required validation
      if (rule.required && (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0))) {
        isValid = false
        errorMessage = rule.message || 'This field is required'
      }

      // Skip other validations if value is empty and not required
      if (!rule.required && (value === undefined || value === null || value === '')) {
        continue
      }

      // Length validations
      if (isValid && rule.minLength && value.length < rule.minLength) {
        isValid = false
        errorMessage = rule.message || `Minimum length is ${rule.minLength} characters`
      }

      if (isValid && rule.maxLength && value.length > rule.maxLength) {
        isValid = false
        errorMessage = rule.message || `Maximum length is ${rule.maxLength} characters`
      }

      // Numeric validations
      if (isValid && rule.min !== undefined && Number(value) < rule.min) {
        isValid = false
        errorMessage = rule.message || `Minimum value is ${rule.min}`
      }

      if (isValid && rule.max !== undefined && Number(value) > rule.max) {
        isValid = false
        errorMessage = rule.message || `Maximum value is ${rule.max}`
      }

      // Pattern validation
      if (isValid && rule.pattern && !rule.pattern.test(value)) {
        isValid = false
        errorMessage = rule.message || 'Invalid format'
      }

      // Email validation
      if (isValid && rule.email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(value)) {
          isValid = false
          errorMessage = rule.message || 'Invalid email address'
        }
      }

      // URL validation
      if (isValid && rule.url) {
        try {
          new URL(value)
        } catch {
          isValid = false
          errorMessage = rule.message || 'Invalid URL'
        }
      }

      // Custom validation
      if (isValid && rule.custom) {
        const customResult = rule.custom(value)
        if (typeof customResult === 'string') {
          isValid = false
          errorMessage = customResult
        } else if (customResult === false) {
          isValid = false
          errorMessage = rule.message || 'Invalid value'
        }
      }

      if (!isValid) {
        field.error = errorMessage
        field.valid = false
        return false
      }
    }

    field.valid = true
    return true
  }

  const validateAll = (): boolean => {
    let isValid = true
    
    Object.keys(fields).forEach(name => {
      const fieldValid = validateField(name)
      if (!fieldValid) {
        isValid = false
      }
    })

    return isValid
  }

  const touchField = (name: string) => {
    if (fields[name]) {
      fields[name].touched = true
    }
  }

  const touchAll = () => {
    Object.keys(fields).forEach(name => {
      touchField(name)
    })
  }

  const resetField = (name: string) => {
    if (fields[name]) {
      fields[name].error = ''
      fields[name].touched = false
      fields[name].valid = true
      formData[name] = initialData[name]
    }
  }

  const resetForm = () => {
    Object.keys(fields).forEach(name => {
      resetField(name)
    })
    isSubmitting.value = false
  }

  const setFieldError = (name: string, error: string) => {
    if (fields[name]) {
      fields[name].error = error
      fields[name].valid = false
    }
  }

  const clearFieldError = (name: string) => {
    if (fields[name]) {
      fields[name].error = ''
      fields[name].valid = true
    }
  }

  // Computed properties
  const isValid = computed(() => {
    return Object.values(fields).every(field => field.valid)
  })

  const hasErrors = computed(() => {
    return Object.values(fields).some(field => field.error !== '')
  })

  const touchedFields = computed(() => {
    return Object.values(fields).filter(field => field.touched)
  })

  const errors = computed(() => {
    const errorObj: Record<string, string> = {}
    Object.entries(fields).forEach(([name, field]) => {
      if (field.error) {
        errorObj[name] = field.error
      }
    })
    return errorObj
  })

  return {
    // Data
    formData,
    fields,
    isSubmitting,

    // Methods
    addField,
    validateField,
    validateAll,
    touchField,
    touchAll,
    resetField,
    resetForm,
    setFieldError,
    clearFieldError,

    // Computed
    isValid,
    hasErrors,
    touchedFields,
    errors
  }
}