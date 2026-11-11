import type { AdminConfigKV, CloudflareEnv } from './types'

export const SESSION_COOKIE_NAME = 'htx_admin_session'
const SESSION_TTL_SECONDS = 60 * 60 * 24 // 24 hours

export function jsonResponse(data: unknown, status = 200, extraHeaders?: Record<string, string>) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      ...(extraHeaders || {}),
    },
  })
}

export function errorResponse(message: string, status = 400, extra?: Record<string, unknown>) {
  return jsonResponse({ ok: false, error: message, ...(extra || {}) }, status)
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function fromBase64Url(str: string): Uint8Array {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((str.length + 3) % 4)
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export function timingSafeEqualStr(a: string, b: string): boolean {
  const enc = new TextEncoder()
  const ab = enc.encode(a)
  const bb = enc.encode(b)
  if (ab.length !== bb.length) return false
  let diff = 0
  for (let i = 0; i < ab.length; i++) {
    diff |= ab[i] ^ bb[i]
  }
  return diff === 0
}

function getSessionSecret(env: CloudflareEnv): string {
  if (!env.ADMIN_SESSION_SECRET) {
    throw new Error('ADMIN_SESSION_SECRET is not configured in Cloudflare Secrets.')
  }
  return env.ADMIN_SESSION_SECRET
}

async function signHmac(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message))
  return toBase64Url(new Uint8Array(sig))
}

export async function createSessionToken(username: string, env: CloudflareEnv): Promise<string> {
  const secret = getSessionSecret(env)
  const payload = {
    u: username,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  }
  const encodedPayload = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)))
  const sig = await signHmac(encodedPayload, secret)
  return `${encodedPayload}.${sig}`
}

export async function verifySessionToken(token: string, env: CloudflareEnv): Promise<{ username: string } | null> {
  try {
    if (!token || !token.includes('.')) return null
    const [encodedPayload, providedSig] = token.split('.')
    if (!encodedPayload || !providedSig) return null

    const secret = getSessionSecret(env)
    const expectedSig = await signHmac(encodedPayload, secret)
    if (!timingSafeEqualStr(providedSig, expectedSig)) return null

    const payloadBytes = fromBase64Url(encodedPayload)
    const payload = JSON.parse(new TextDecoder().decode(payloadBytes)) as { u?: string; exp?: number }
    if (!payload.u || !payload.exp) return null
    if (Math.floor(Date.now() / 1000) > payload.exp) return null

    return { username: payload.u }
  } catch {
    return null
  }
}

export function getCookie(request: Request, name: string): string | null {
  const cookieHeader = request.headers.get('Cookie')
  if (!cookieHeader) return null
  const pairs = cookieHeader.split(';')
  for (const pair of pairs) {
    const idx = pair.indexOf('=')
    if (idx === -1) continue
    const key = pair.slice(0, idx).trim()
    if (key === name) {
      return decodeURIComponent(pair.slice(idx + 1).trim())
    }
  }
  return null
}

export function buildSessionCookieHeader(token: string, request: Request, maxAgeSeconds = SESSION_TTL_SECONDS): string {
  const url = new URL(request.url)
  const isHttps = url.protocol === 'https:'
  const parts = [
    `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}`,
    'Path=/',
    `Max-Age=${maxAgeSeconds}`,
    'HttpOnly',
    'SameSite=Lax',
  ]
  if (isHttps) {
    parts.push('Secure')
  }
  return parts.join('; ')
}

export async function requireAdmin(request: Request, env: CloudflareEnv): Promise<{ username: string } | null> {
  const token = getCookie(request, SESSION_COOKIE_NAME)
  if (!token) return null
  return verifySessionToken(token, env)
}

export async function hashPasswordPBKDF2(password: string, existingSaltHex?: string): Promise<{ hashHex: string; saltHex: string }> {
  const saltBytes = existingSaltHex
    ? new Uint8Array(existingSaltHex.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)))
    : crypto.getRandomValues(new Uint8Array(16))

  const saltHex = Array.from(saltBytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  const enc = new TextEncoder()
  const baseKey = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBytes,
      iterations: 100_000,
      hash: 'SHA-256',
    },
    baseKey,
    256
  )
  const hashHex = Array.from(new Uint8Array(bits))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  return { hashHex, saltHex }
}

export async function verifyAdminCredentials(
  usernameInput: string,
  passwordInput: string,
  env: CloudflareEnv
): Promise<{ valid: boolean; username: string }> {
  const kvAdmin = env.HTX_INQUIRIES
    ? ((await env.HTX_INQUIRIES.get('config:admin', 'json')) as AdminConfigKV | null)
    : null

  const expectedUser = (kvAdmin?.username || env.ADMIN_USERNAME || 'admin@htxgroup.vn').trim().toLowerCase()
  const providedUser = usernameInput.trim().toLowerCase()

  if (!timingSafeEqualStr(providedUser, expectedUser)) {
    return { valid: false, username: expectedUser }
  }

  if (kvAdmin?.passwordHash && kvAdmin?.passwordSalt) {
    const { hashHex } = await hashPasswordPBKDF2(passwordInput, kvAdmin.passwordSalt)
    return {
      valid: timingSafeEqualStr(hashHex, kvAdmin.passwordHash),
      username: expectedUser,
    }
  }

  if (!env.ADMIN_PASSWORD) {
    return { valid: false, username: expectedUser }
  }

  return {
    valid: timingSafeEqualStr(passwordInput, env.ADMIN_PASSWORD),
    username: expectedUser,
  }
}

export async function deriveTelegramWebhookSecret(env: CloudflareEnv): Promise<string> {
  const base = env.ADMIN_SESSION_SECRET || 'htxgroup-telegram-webhook-salt'
  const sig = await signHmac('telegram-webhook-secret-v1', base)
  return sig.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 48)
}
