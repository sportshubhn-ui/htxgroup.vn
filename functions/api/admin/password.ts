import {
  errorResponse,
  hashPasswordPBKDF2,
  jsonResponse,
  requireAdmin,
  verifyAdminCredentials,
} from '../../../server/auth'
import type { AdminConfigKV, PagesContext } from '../../../server/types'

export async function onRequestPost(context: PagesContext) {
  const admin = await requireAdmin(context.request, context.env)
  if (!admin) {
    return errorResponse('Chưa đăng nhập quyền quản trị.', 401)
  }

  try {
    const body = (await context.request.json()) as {
      currentPassword?: string
      newPassword?: string
      newUsername?: string
    }

    const currentPassword = body.currentPassword || ''
    const newPassword = body.newPassword || ''
    const newUsername = (body.newUsername || admin.username).trim()

    if (!currentPassword || !newPassword) {
      return errorResponse('Vui lòng nhập mật khẩu hiện tại và mật khẩu mới.', 400)
    }

    if (newPassword.length < 8) {
      return errorResponse('Mật khẩu mới cần ít nhất 8 ký tự.', 400)
    }

    const verify = await verifyAdminCredentials(admin.username, currentPassword, context.env)
    if (!verify.valid) {
      return errorResponse('Mật khẩu hiện tại không chính xác.', 401)
    }

    const { hashHex, saltHex } = await hashPasswordPBKDF2(newPassword)
    const nextConfig: AdminConfigKV = {
      username: newUsername,
      passwordHash: hashHex,
      passwordSalt: saltHex,
      updatedAt: new Date().toISOString(),
    }

    await context.env.HTX_INQUIRIES.put('config:admin', JSON.stringify(nextConfig))

    return jsonResponse({
      ok: true,
      message: 'Đã cập nhật thông tin đăng nhập quản trị thành công.',
      username: newUsername,
    })
  } catch (err) {
    console.error('Change password error:', err)
    return errorResponse('Không thể cập nhật mật khẩu lúc này.', 500)
  }
}
