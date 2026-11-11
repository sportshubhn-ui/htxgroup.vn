import {
  buildSessionCookieHeader,
  createSessionToken,
  errorResponse,
  jsonResponse,
  verifyAdminCredentials,
} from '../../../server/auth'
import type { PagesContext } from '../../../server/types'

export async function onRequestPost(context: PagesContext) {
  try {
    const body = (await context.request.json()) as { username?: string; password?: string }
    const username = (body.username || '').trim()
    const password = body.password || ''

    if (!username || !password) {
      return errorResponse('Vui lòng nhập tên đăng nhập và mật khẩu quản trị.', 400)
    }

    const check = await verifyAdminCredentials(username, password, context.env)
    if (!check.valid) {
      // Slight uniform delay against rapid brute-force probing
      await new Promise((r) => setTimeout(r, 350))
      return errorResponse('Tên đăng nhập hoặc mật khẩu không chính xác.', 401)
    }

    const token = await createSessionToken(check.username, context.env)
    const setCookie = buildSessionCookieHeader(token, context.request)

    return jsonResponse(
      {
        ok: true,
        authenticated: true,
        username: check.username,
      },
      200,
      { 'Set-Cookie': setCookie }
    )
  } catch (err) {
    console.error('Login error:', err)
    return errorResponse('Lỗi hệ thống xác thực. Vui lòng thử lại.', 500)
  }
}
