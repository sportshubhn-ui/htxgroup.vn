import { buildSessionCookieHeader, jsonResponse } from '../../../server/auth'
import type { PagesContext } from '../../../server/types'

export async function onRequestPost(context: PagesContext) {
  const clearCookie = buildSessionCookieHeader('', context.request, 0)
  return jsonResponse({ ok: true, authenticated: false }, 200, {
    'Set-Cookie': clearCookie,
  })
}
