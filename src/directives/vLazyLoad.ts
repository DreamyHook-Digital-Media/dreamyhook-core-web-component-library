import type { DirectiveBinding, VNode } from 'vue'

interface LazyLoadOptions {
  placeholder?: string
  error?: string
  loading?: string
  threshold?: number
  rootMargin?: string
  retry?: number
  delay?: number
}

interface LazyElement extends HTMLElement {
  _lazyLoadObserver?: IntersectionObserver
  _lazyLoadOptions?: LazyLoadOptions
  _lazyLoadAttempts?: number
  _lazyLoadOriginalSrc?: string
}

const defaultOptions: Required<LazyLoadOptions> = {
  placeholder: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"%3E%3Cpath fill="%23d1d5db" d="M4 4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2H4zm16 2v8.59l-3.3-3.3a1 1 0 00-1.4 0L9 17.59l-2.3-2.3a1 1 0 00-1.4 0L4 16.59V6h16z"/%3E%3C/svg%3E',
  error: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"%3E%3Cpath fill="%23ef4444" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/%3E%3C/svg%3E',
  loading: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"%3E%3Cpath fill="%236b7280" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.3"/%3E%3Cpath fill="%233b82f6" d="M12 2C6.48 2 2 6.48 2 12h3c0-3.31 2.69-6 6-6V2z"%3E%3CanimateTransform attributeName="transform" attributeType="XML" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/%3E%3C/path%3E%3C/svg%3E',
  threshold: 0.1,
  rootMargin: '50px',
  retry: 3,
  delay: 0
}

let globalOptions = { ...defaultOptions }

export function configureLazyLoad(options: Partial<LazyLoadOptions>) {
  globalOptions = { ...globalOptions, ...options }
}

const loadImage = (el: LazyElement, src: string, options: Required<LazyLoadOptions>): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    
    const onLoad = () => {
      img.removeEventListener('load', onLoad)
      img.removeEventListener('error', onError)
      
      if (options.delay > 0) {
        setTimeout(() => {
          el.src = src
          el.classList.remove('lazy-loading')
          el.classList.add('lazy-loaded')
          resolve()
        }, options.delay)
      } else {
        el.src = src
        el.classList.remove('lazy-loading')
        el.classList.add('lazy-loaded')
        resolve()
      }
    }
    
    const onError = () => {
      img.removeEventListener('load', onLoad)
      img.removeEventListener('error', onError)
      reject(new Error('Failed to load image'))
    }
    
    img.addEventListener('load', onLoad)
    img.addEventListener('error', onError)
    img.src = src
  })
}

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target as LazyElement
      const options = el._lazyLoadOptions || globalOptions
      const attempts = el._lazyLoadAttempts || 0
      const originalSrc = el._lazyLoadOriginalSrc
      
      if (!originalSrc) return
      
      // Add loading class
      el.classList.add('lazy-loading')
      
      // Set loading placeholder
      if (el.tagName === 'IMG') {
        (el as HTMLImageElement).src = options.loading
      }
      
      loadImage(el, originalSrc, options)
        .then(() => {
          // Success - stop observing
          if (el._lazyLoadObserver) {
            el._lazyLoadObserver.unobserve(el)
          }
        })
        .catch(() => {
          // Error - retry or show error
          el._lazyLoadAttempts = attempts + 1
          
          if (el._lazyLoadAttempts >= options.retry) {
            // Max retries reached - show error
            if (el.tagName === 'IMG') {
              (el as HTMLImageElement).src = options.error
            }
            el.classList.remove('lazy-loading')
            el.classList.add('lazy-error')
            
            if (el._lazyLoadObserver) {
              el._lazyLoadObserver.unobserve(el)
            }
          } else {
            // Retry after a delay
            setTimeout(() => {
              handleIntersection([entry])
            }, 1000 * el._lazyLoadAttempts)
          }
        })
    }
  })
}

const createObserver = (options: Required<LazyLoadOptions>): IntersectionObserver => {
  return new IntersectionObserver(handleIntersection, {
    threshold: options.threshold,
    rootMargin: options.rootMargin
  })
}

export const vLazyLoad = {
  mounted(el: LazyElement, binding: DirectiveBinding<string | LazyLoadOptions>) {
    if (!('IntersectionObserver' in window)) {
      // Fallback for browsers without IntersectionObserver
      if (typeof binding.value === 'string') {
        if (el.tagName === 'IMG') {
          (el as HTMLImageElement).src = binding.value
        }
      }
      return
    }
    
    let src: string
    let options: Required<LazyLoadOptions>
    
    if (typeof binding.value === 'string') {
      src = binding.value
      options = { ...globalOptions }
    } else {
      src = (el as HTMLImageElement).dataset.src || (el as HTMLImageElement).src || ''
      options = { ...globalOptions, ...binding.value }
    }
    
    if (!src && el.tagName === 'IMG') {
      src = (el as HTMLImageElement).src
    }
    
    if (!src) {
      console.warn('v-lazy-load: No source provided')
      return
    }
    
    // Store original src and options
    el._lazyLoadOriginalSrc = src
    el._lazyLoadOptions = options
    el._lazyLoadAttempts = 0
    
    // Set placeholder
    if (el.tagName === 'IMG') {
      (el as HTMLImageElement).src = options.placeholder
    }
    
    // Add CSS classes
    el.classList.add('lazy-image')
    
    // Create and start observing
    el._lazyLoadObserver = createObserver(options)
    el._lazyLoadObserver.observe(el)
  },
  
  updated(el: LazyElement, binding: DirectiveBinding<string | LazyLoadOptions>) {
    let newSrc: string
    
    if (typeof binding.value === 'string') {
      newSrc = binding.value
    } else {
      newSrc = (el as HTMLImageElement).dataset.src || (el as HTMLImageElement).src || ''
    }
    
    // If src changed, restart the process
    if (newSrc !== el._lazyLoadOriginalSrc) {
      // Stop current observation
      if (el._lazyLoadObserver) {
        el._lazyLoadObserver.unobserve(el)
      }
      
      // Reset state
      el._lazyLoadOriginalSrc = newSrc
      el._lazyLoadAttempts = 0
      el.classList.remove('lazy-loading', 'lazy-loaded', 'lazy-error')
      
      // Set placeholder
      if (el.tagName === 'IMG' && el._lazyLoadOptions) {
        (el as HTMLImageElement).src = el._lazyLoadOptions.placeholder
      }
      
      // Start observing again
      if (el._lazyLoadObserver) {
        el._lazyLoadObserver.observe(el)
      }
    }
  },
  
  unmounted(el: LazyElement) {
    if (el._lazyLoadObserver) {
      el._lazyLoadObserver.unobserve(el)
      el._lazyLoadObserver.disconnect()
    }
    
    // Cleanup
    delete el._lazyLoadObserver
    delete el._lazyLoadOptions
    delete el._lazyLoadAttempts
    delete el._lazyLoadOriginalSrc
  }
}

// CSS classes for styling
export const lazyLoadStyles = `
.lazy-image {
  transition: opacity 0.3s ease;
}

.lazy-loading {
  opacity: 0.7;
}

.lazy-loaded {
  opacity: 1;
}

.lazy-error {
  opacity: 0.5;
  filter: grayscale(100%);
}

.lazy-image[src*="data:image/svg+xml"] {
  background-color: #f3f4f6;
  background-image: linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent),
                    linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  animation: lazy-shimmer 2s infinite linear;
}

@keyframes lazy-shimmer {
  0% {
    background-position: 0 0, 10px 10px;
  }
  100% {
    background-position: 20px 20px, 30px 30px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lazy-image {
    transition: none;
  }
  
  .lazy-image[src*="data:image/svg+xml"] {
    animation: none;
  }
}
`

// Utility function to preload images
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

// Utility function to preload multiple images
export function preloadImages(sources: string[]): Promise<void[]> {
  return Promise.all(sources.map(preloadImage))
}