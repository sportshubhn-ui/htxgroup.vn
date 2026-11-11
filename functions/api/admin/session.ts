import { jsonResponse, requireAdmin } from '../../../server/auth'
import type { PagesContext } from '../../../server/types'

export async function onRequestGet(context: PagesContext) {
  const admin = await requireAdmin(context.request, context.env)
  if (!admin) {
    return jsonResponse({ ok: false, authenticated: false }, 401)
  }
  return jsonResponse({
    ok: true,
    authenticated: true,
    username: admin.username,
  })
}
