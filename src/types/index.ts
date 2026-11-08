export * from './navigation'

export interface ServiceItem {
  id: string
  title: string
  description: string
  iconName: string
  features?: string[]
}

export interface StatItem {
  label: string
  value: string
  description?: string
}

export interface ContactFormData {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    facebook: string
    youtube: string
    zalo: string
  }
  contact: {
    address: string
    hotline: string
    email: string
    workingHours: string
  }
}
