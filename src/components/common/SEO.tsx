import { useEffect } from 'react'
import { companyInfo } from '@/data/htxData'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
}

export function SEO({
  title,
  description = 'HTX GROUP Tiếp nhận xử lý chất thải rắn xây dựng. Thu gom, vận chuyển rác thải xây dựng, phá dỡ công trình dân dụng và công nghiệp, tái chế vật liệu xây dựng.',
  image = '/images/slider-1.jpg',
  url,
  type = 'website',
}: SEOProps) {
  const fullTitle = title
    ? `${title} | ${companyInfo.shortName}`
    : `${companyInfo.name} – Đơn vị chuyên thu gom, xử lý phế thải xây dựng`

  const currentUrl = url || window.location.href

  useEffect(() => {
    // Set document title
    document.title = fullTitle

    // Update meta tags helper
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? `property="${name}"` : `name="${name}"`
      let el = document.querySelector(`meta[${attr}]`)
      if (!el) {
        el = document.createElement('meta')
        if (isProperty) {
          el.setAttribute('property', name)
        } else {
          el.setAttribute('name', name)
        }
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', description)
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', description, true)
    setMeta('og:type', type, true)
    setMeta('og:url', currentUrl, true)
    setMeta('og:image', image, true)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    setMeta('twitter:image', image)

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', currentUrl)

    // Add JSON-LD schema
    const schemaId = 'seo-schema-jsonld'
    let script = document.getElementById(schemaId) as HTMLScriptElement
    if (!script) {
      script = document.createElement('script')
      script.id = schemaId
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: companyInfo.name,
      alternateName: companyInfo.shortName,
      url: companyInfo.website,
      logo: `${companyInfo.website}/images/logo.svg`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: companyInfo.hotline,
        contactType: 'customer service',
        areaServed: 'VN',
        availableLanguage: 'Vietnamese',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: companyInfo.officeAddress,
        addressLocality: 'Hà Nội',
        addressCountry: 'VN',
      },
    }

    script.textContent = JSON.stringify(schemaData)
  }, [fullTitle, description, image, currentUrl, type])

  return null
}
