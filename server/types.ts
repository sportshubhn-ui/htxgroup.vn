export interface KVNamespaceLike {
  get(key: string, type?: 'text' | 'json'): Promise<any>
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>
  delete(key: string): Promise<void>
}

export interface CloudflareEnv {
  HTX_INQUIRIES: KVNamespaceLike
  ADMIN_USERNAME?: string
  ADMIN_PASSWORD?: string
  ADMIN_SESSION_SECRET?: string
  TELEGRAM_BOT_TOKEN?: string
  TELEGRAM_CHAT_ID?: string
  TELEGRAM_BOT_LABEL?: string
}

export type InquiryType = 'thu-gom' | 'dua-vao-bai' | 'mua-vat-lieu' | 'lien-he'

export interface CartItemPayload {
  slug: string
  name: string
  category?: string
  unit?: string
  quantity: number
  isRecycled?: boolean
}

export interface InquiryRecord {
  code: string
  type: InquiryType
  submittedAt: string
  createdAtIso: string
  customerName: string
  companyName?: string
  phone: string
  email?: string
  projectLocation?: string
  wasteType?: string
  estimatedVolume?: string
  expectedDate?: string
  accessCondition?: string
  vehicleCount?: string
  notes?: string
  cartItems?: CartItemPayload[]
  status: 'new' | 'contacted' | 'quoted' | 'in_progress' | 'closed' | 'cancelled'
  telegramSent?: boolean
  telegramError?: string
}

export interface TelegramConfigKV {
  botToken?: string
  chatId?: string
  botName: string
  botUsername?: string
  botDisplayName?: string
  enabled: boolean
  updatedAt?: string
}

export interface RecentTelegramChat {
  chatId: string
  type: string
  title: string
  username?: string
  lastSeenAt: string
}

export interface AdminConfigKV {
  username?: string
  passwordHash?: string
  passwordSalt?: string
  updatedAt?: string
}

export type PagesContext = {
  request: Request
  env: CloudflareEnv
  params?: Record<string, string>
}
