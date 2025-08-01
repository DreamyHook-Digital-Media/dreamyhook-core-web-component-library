import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

export interface SeoMetaData {
  title?: string
  description?: string
  keywords?: string[]
  author?: string
  robots?: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  ogType?: string
  ogSiteName?: string
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  twitterSite?: string
  twitterCreator?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  jsonLd?: Record<string, any>
}

export interface SeoConfig {
  titleTemplate?: string
  defaultTitle?: string
  defaultDescription?: string
  defaultKeywords?: string[]
  siteName?: string
  siteUrl?: string
  defaultImage?: string
  twitterHandle?: string
}

const defaultConfig: SeoConfig = {
  titleTemplate: '%s | DreamyHook',
  defaultTitle: 'DreamyHook - Vue 3 Component Library',
  defaultDescription: 'A comprehensive Vue 3 component library with TypeScript, Tailwind CSS, and accessibility support.',
  defaultKeywords: ['vue', 'vue3', 'components', 'typescript', 'tailwind', 'ui'],
  siteName: 'DreamyHook',
  siteUrl: typeof window !== 'undefined' ? window.location.origin : '',
  twitterHandle: '@dreamyhook'
}

let globalConfig = { ...defaultConfig }

export function configureSeo(config: Partial<SeoConfig>) {
  globalConfig = { ...globalConfig, ...config }
}

export function useSeoMeta(initialMeta: SeoMetaData = {}) {
  const meta = ref<SeoMetaData>({ ...initialMeta })
  
  const computedTitle = computed(() => {
    if (!meta.value.title) return globalConfig.defaultTitle
    
    if (globalConfig.titleTemplate) {
      return globalConfig.titleTemplate.replace('%s', meta.value.title)
    }
    
    return meta.value.title
  })

  const computedDescription = computed(() => {
    return meta.value.description || globalConfig.defaultDescription || ''
  })

  const computedKeywords = computed(() => {
    const keywords = meta.value.keywords || globalConfig.defaultKeywords || []
    return keywords.join(', ')
  })

  const computedCanonical = computed(() => {
    if (meta.value.canonical) return meta.value.canonical
    if (typeof window !== 'undefined') {
      return window.location.href
    }
    return ''
  })

  const computedOgImage = computed(() => {
    return meta.value.ogImage || globalConfig.defaultImage || ''
  })

  const computedOgUrl = computed(() => {
    return meta.value.ogUrl || (typeof window !== 'undefined' ? window.location.href : globalConfig.siteUrl || '')
  })

  // Create or update meta tags
  const updateMetaTags = () => {
    if (typeof document === 'undefined') return

    // Title
    document.title = computedTitle.value

    // Basic meta tags
    updateMetaTag('description', computedDescription.value)
    updateMetaTag('keywords', computedKeywords.value)
    updateMetaTag('author', meta.value.author)
    updateMetaTag('robots', meta.value.robots || 'index,follow')

    // Canonical link
    updateLinkTag('canonical', computedCanonical.value)

    // Open Graph tags
    updateMetaProperty('og:title', meta.value.ogTitle || computedTitle.value)
    updateMetaProperty('og:description', meta.value.ogDescription || computedDescription.value)
    updateMetaProperty('og:image', computedOgImage.value)
    updateMetaProperty('og:url', computedOgUrl.value)
    updateMetaProperty('og:type', meta.value.ogType || 'website')
    updateMetaProperty('og:site_name', meta.value.ogSiteName || globalConfig.siteName)

    // Twitter Card tags
    updateMetaName('twitter:card', meta.value.twitterCard || 'summary_large_image')
    updateMetaName('twitter:site', meta.value.twitterSite || globalConfig.twitterHandle)
    updateMetaName('twitter:creator', meta.value.twitterCreator || globalConfig.twitterHandle)
    updateMetaName('twitter:title', meta.value.twitterTitle || computedTitle.value)
    updateMetaName('twitter:description', meta.value.twitterDescription || computedDescription.value)
    updateMetaName('twitter:image', meta.value.twitterImage || computedOgImage.value)

    // JSON-LD structured data
    if (meta.value.jsonLd) {
      updateJsonLd(meta.value.jsonLd)
    }
  }

  const updateMetaTag = (name: string, content?: string) => {
    if (!content) return

    let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
    
    if (!element) {
      element = document.createElement('meta')
      element.name = name
      document.head.appendChild(element)
    }
    
    element.content = content
  }

  const updateMetaProperty = (property: string, content?: string) => {
    if (!content) return

    let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
    
    if (!element) {
      element = document.createElement('meta')
      element.setAttribute('property', property)
      document.head.appendChild(element)
    }
    
    element.content = content
  }

  const updateMetaName = (name: string, content?: string) => {
    if (!content) return

    let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
    
    if (!element) {
      element = document.createElement('meta')
      element.name = name
      document.head.appendChild(element)
    }
    
    element.content = content
  }

  const updateLinkTag = (rel: string, href?: string) => {
    if (!href) return

    let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement
    
    if (!element) {
      element = document.createElement('link')
      element.rel = rel
      document.head.appendChild(element)
    }
    
    element.href = href
  }

  const updateJsonLd = (data: Record<string, any>) => {
    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (existingScript) {
      existingScript.remove()
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  }

  // Methods to update meta data
  const setTitle = (title: string) => {
    meta.value.title = title
  }

  const setDescription = (description: string) => {
    meta.value.description = description
  }

  const setKeywords = (keywords: string[]) => {
    meta.value.keywords = keywords
  }

  const setOgImage = (image: string) => {
    meta.value.ogImage = image
  }

  const setCanonical = (url: string) => {
    meta.value.canonical = url
  }

  const setMeta = (newMeta: Partial<SeoMetaData>) => {
    meta.value = { ...meta.value, ...newMeta }
  }

  const resetMeta = () => {
    meta.value = {}
  }

  // Watch for changes and update DOM
  watch(meta, updateMetaTags, { deep: true, immediate: true })

  // Cleanup function
  const cleanup = () => {
    // Remove meta tags that were added
    const metaSelectors = [
      'meta[name="description"]',
      'meta[name="keywords"]',
      'meta[name="author"]',
      'meta[name="robots"]',
      'meta[property^="og:"]',
      'meta[name^="twitter:"]',
      'link[rel="canonical"]',
      'script[type="application/ld+json"]'
    ]

    metaSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector)
      elements.forEach(element => element.remove())
    })
  }

  onMounted(() => {
    updateMetaTags()
  })

  onUnmounted(() => {
    // Only cleanup if this was the last component using SEO
    // In a real app, you might want more sophisticated cleanup logic
  })

  return {
    meta: computed(() => meta.value),
    title: computedTitle,
    description: computedDescription,
    keywords: computedKeywords,
    canonical: computedCanonical,
    setTitle,
    setDescription,
    setKeywords,
    setOgImage,
    setCanonical,
    setMeta,
    resetMeta,
    cleanup
  }
}

// Helper function to create common structured data
export function createArticleJsonLd(article: {
  title: string
  description: string
  author: string
  publishedDate: string
  modifiedDate?: string
  image?: string
  url?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author
    },
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
    image: article.image,
    url: article.url || (typeof window !== 'undefined' ? window.location.href : ''),
    publisher: {
      '@type': 'Organization',
      name: globalConfig.siteName,
      url: globalConfig.siteUrl
    }
  }
}

export function createBreadcrumbJsonLd(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  }
}