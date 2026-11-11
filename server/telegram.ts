import { deriveTelegramWebhookSecret } from './auth'
import type { CloudflareEnv, InquiryRecord, RecentTelegramChat, TelegramConfigKV } from './types'

const TELEGRAM_CONFIG_KEY = 'config:telegram'
const RECENT_CHATS_KEY = 'telegram:recent_chats'
const DEFAULT_BOT_NAME = 'Khách Hàng HTX'

export function escapeHtml(text: string): string {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function maskToken(token?: string): string {
  if (!token) return ''
  const trimmed = token.trim()
  if (trimmed.length <= 12) return '••••••••••••'
  return `${trimmed.slice(0, 6)}••••••${trimmed.slice(-4)}`
}

export async function getEffectiveTelegramConfig(env: CloudflareEnv): Promise<{
  botToken: string
  chatId: string
  botName: string
  botUsername: string
  botDisplayName: string
  enabled: boolean
  source: 'kv-config' | 'cloudflare-secret' | 'not-configured'
  updatedAt?: string
}> {
  const kv = env.HTX_INQUIRIES
    ? ((await env.HTX_INQUIRIES.get(TELEGRAM_CONFIG_KEY, 'json')) as TelegramConfigKV | null)
    : null

  const botToken = (kv?.botToken || env.TELEGRAM_BOT_TOKEN || '').trim()
  const chatId = (kv?.chatId || env.TELEGRAM_CHAT_ID || '').trim()
  const botName = (kv?.botName || env.TELEGRAM_BOT_LABEL || DEFAULT_BOT_NAME).trim()
  const enabled = kv?.enabled !== undefined ? kv.enabled : true

  let source: 'kv-config' | 'cloudflare-secret' | 'not-configured' = 'not-configured'
  if (kv?.botToken) source = 'kv-config'
  else if (env.TELEGRAM_BOT_TOKEN) source = 'cloudflare-secret'

  return {
    botToken,
    chatId,
    botName,
    botUsername: kv?.botUsername || '',
    botDisplayName: kv?.botDisplayName || '',
    enabled,
    source,
    updatedAt: kv?.updatedAt,
  }
}

export async function saveTelegramConfigKV(env: CloudflareEnv, patch: Partial<TelegramConfigKV>): Promise<TelegramConfigKV> {
  if (!env.HTX_INQUIRIES) {
    throw new Error('HTX_INQUIRIES KV namespace is not bound.')
  }
  const existing = ((await env.HTX_INQUIRIES.get(TELEGRAM_CONFIG_KEY, 'json')) as TelegramConfigKV | null) || {
    botName: DEFAULT_BOT_NAME,
    enabled: true,
  }
  const next: TelegramConfigKV = {
    ...existing,
    ...patch,
    botName: (patch.botName || existing.botName || DEFAULT_BOT_NAME).trim(),
    updatedAt: new Date().toISOString(),
  }
  await env.HTX_INQUIRIES.put(TELEGRAM_CONFIG_KEY, JSON.stringify(next))
  return next
}

export async function getRecentTelegramChats(env: CloudflareEnv): Promise<RecentTelegramChat[]> {
  if (!env.HTX_INQUIRIES) return []
  const data = (await env.HTX_INQUIRIES.get(RECENT_CHATS_KEY, 'json')) as RecentTelegramChat[] | null
  return Array.isArray(data) ? data : []
}

export async function recordRecentTelegramChat(env: CloudflareEnv, chat: RecentTelegramChat): Promise<RecentTelegramChat[]> {
  if (!env.HTX_INQUIRIES) return []
  const current = await getRecentTelegramChats(env)
  const next = [chat, ...current.filter((c) => c.chatId !== chat.chatId)].slice(0, 20)
  await env.HTX_INQUIRIES.put(RECENT_CHATS_KEY, JSON.stringify(next))
  return next
}

export async function callTelegramApi<T = any>(
  botToken: string,
  method: string,
  payload?: Record<string, unknown>
): Promise<{ ok: boolean; result?: T; description?: string }> {
  const res = await fetch(`https://api.telegram.org/bot${encodeURIComponent(botToken)}/${method}`, {
    method: payload ? 'POST' : 'GET',
    headers: payload ? { 'Content-Type': 'application/json' } : undefined,
    body: payload ? JSON.stringify(payload) : undefined,
  })
  const data = (await res.json()) as { ok: boolean; result?: T; description?: string }
  return data
}

export async function registerTelegramWebhook(botToken: string, origin: string, env: CloudflareEnv): Promise<{
  ok: boolean
  url: string
  description?: string
}> {
  const secretToken = await deriveTelegramWebhookSecret(env)
  const webhookUrl = `${origin.replace(/\/+$/, '')}/api/telegram/webhook`
  const res = await callTelegramApi(botToken, 'setWebhook', {
    url: webhookUrl,
    secret_token: secretToken,
    allowed_updates: ['message', 'my_chat_member'],
  })
  return {
    ok: res.ok,
    url: webhookUrl,
    description: res.description,
  }
}

export function formatInquiryTelegramMessage(inq: InquiryRecord): string {
  const typeLabelMap: Record<InquiryRecord['type'], string> = {
    'thu-gom': '🚛 Thu gom chất thải tại công trình',
    'dua-vao-bai': '🏗️ Đăng ký đưa xe vào bãi Liên Mạc',
    'mua-vat-lieu': '🧱 Đặt mua vật liệu xây dựng / RCA',
    'lien-he': '📩 Yêu cầu liên hệ / Tư vấn',
  }

  const lines: string[] = [
    `🌿 <b>KHÁCH HÀNG MỚI — HÀNH TINH XANH (HTXGROUP.VN)</b>`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `📋 <b>Mã hồ sơ:</b> <code>${escapeHtml(inq.code)}</code>`,
    `📌 <b>Nhu cầu:</b> ${typeLabelMap[inq.type] || escapeHtml(inq.type)}`,
    `👤 <b>Khách hàng:</b> ${escapeHtml(inq.customerName)}${inq.companyName ? ` (${escapeHtml(inq.companyName)})` : ''}`,
    `📞 <b>Điện thoại:</b> <code>${escapeHtml(inq.phone)}</code>`,
  ]

  if (inq.email) {
    lines.push(`📧 <b>Email:</b> ${escapeHtml(inq.email)}`)
  }
  if (inq.projectLocation) {
    lines.push(`📍 <b>Địa điểm / Công trình:</b> ${escapeHtml(inq.projectLocation)}`)
  }
  if (inq.wasteType) {
    lines.push(`♻️ <b>Loại chất thải:</b> ${escapeHtml(inq.wasteType)}`)
  }
  if (inq.estimatedVolume) {
    lines.push(`📐 <b>Khối lượng dự kiến:</b> ${escapeHtml(inq.estimatedVolume)}`)
  }
  if (inq.vehicleCount && inq.type === 'dua-vao-bai') {
    lines.push(`🚚 <b>Số lượng xe dự kiến:</b> ${escapeHtml(inq.vehicleCount)} xe`)
  }
  if (inq.accessCondition && inq.type === 'thu-gom') {
    lines.push(`🛣️ <b>Đường tiếp cận:</b> ${escapeHtml(inq.accessCondition)}`)
  }
  if (inq.expectedDate) {
    lines.push(`📅 <b>Thời gian dự kiến:</b> ${escapeHtml(inq.expectedDate)}`)
  }

  if (Array.isArray(inq.cartItems) && inq.cartItems.length > 0) {
    lines.push(``)
    lines.push(`🛒 <b>Danh sách vật liệu yêu cầu (${inq.cartItems.length}):</b>`)
    for (const item of inq.cartItems) {
      lines.push(`  • ${escapeHtml(item.name)}: <b>${escapeHtml(String(item.quantity))} ${escapeHtml(item.unit || '')}</b>`)
    }
  }

  if (inq.notes) {
    lines.push(``)
    lines.push(`📝 <b>Ghi chú:</b> ${escapeHtml(inq.notes)}`)
  }

  lines.push(`━━━━━━━━━━━━━━━━━━━━━━`)
  lines.push(`🕒 <b>Tiếp nhận:</b> ${escapeHtml(inq.submittedAt)} (Hà Nội)`)
  lines.push(`🔐 Xem & cập nhật trạng thái tại cổng quản trị <b>htxgroup.vn/admin</b>`)

  return lines.join('\n')
}

export async function dispatchInquiryToTelegram(
  env: CloudflareEnv,
  inq: InquiryRecord
): Promise<{ sent: boolean; error?: string }> {
  const cfg = await getEffectiveTelegramConfig(env)
  if (!cfg.enabled) {
    return { sent: false, error: 'Thông báo Telegram đang tạm tắt trong cấu hình.' }
  }
  if (!cfg.botToken || !cfg.chatId) {
    return { sent: false, error: 'Chưa cấu hình Telegram Bot Token hoặc Chat ID.' }
  }

  const chatIds = cfg.chatId
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)

  if (chatIds.length === 0) {
    return { sent: false, error: 'Danh sách Chat ID trống.' }
  }

  const message = formatInquiryTelegramMessage(inq)
  const errors: string[] = []
  let anySuccess = false

  for (const cid of chatIds) {
    try {
      const resp = await callTelegramApi(cfg.botToken, 'sendMessage', {
        chat_id: cid,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      })
      if (resp.ok) {
        anySuccess = true
      } else {
        errors.push(`Chat ${cid}: ${resp.description || 'Telegram API error'}`)
      }
    } catch (err) {
      errors.push(`Chat ${cid}: ${err instanceof Error ? err.message : 'Network error'}`)
    }
  }

  return {
    sent: anySuccess,
    error: errors.length > 0 ? errors.join('; ') : undefined,
  }
}
