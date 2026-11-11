import { useEffect } from 'react'
import { companyInfo } from '@/data/htxData'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  noIndex?: boolean
}

export function SEO({
  title,
  description = 'Công ty TNHH TM&DV Giải Pháp Hành Tinh Xanh - Tiếp nhận, thu gom, vận chuyển và tái chế chất thải rắn xây dựng (CTRXD) tại Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội. Trụ sở: Tầng 4, Tòa nhà Grandeur Palace, 138 Giảng Võ, Ba Đình. Hotline: 0707 155 666.',
  image = '/brand/logo-glass.png',
  url,
  type = 'website',
  noIndex = false,
}: SEOProps) {
  const fullTitle = title
    ? `${title} | ${companyInfo.shortName}`
    : `${companyInfo.name} – ${companyInfo.slogan}`

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

    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow')
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
      alternateName: [companyInfo.shortName, companyInfo.brandName, companyInfo.abbreviation],
      url: companyInfo.website,
      logo: `${companyInfo.website}/images/logo.png`,
      slogan: companyInfo.slogan,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: companyInfo.hotline,
        contactType: 'customer service',
        areaServed: 'VN',
        availableLanguage: 'Vietnamese',
      },
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: companyInfo.officeAddress,
          addressLocality: 'Ba Đình, Hà Nội',
          addressCountry: 'VN',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: companyInfo.yardAddress,
          addressLocality: 'Hà Nội',
          addressCountry: 'VN',
        },
      ],
    }

    script.textContent = JSON.stringify(schemaData)
  }, [fullTitle, description, image, currentUrl, type, noIndex])

  return null
}
