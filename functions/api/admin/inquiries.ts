import { errorResponse, jsonResponse, requireAdmin } from '../../../server/auth'
import { deleteInquiry, listInquiries, saveInquiry, updateInquiryStatus } from '../../../server/inquiries'
import { dispatchInquiryToTelegram } from '../../../server/telegram'
import type { InquiryRecord, PagesContext } from '../../../server/types'

const ALLOWED_STATUSES: InquiryRecord['status'][] = [
  'new',
  'contacted',
  'quoted',
  'in_progress',
  'closed',
  'cancelled',
]

export async function onRequestGet(context: PagesContext) {
  const admin = await requireAdmin(context.request, context.env)
  if (!admin) {
    return errorResponse('Phiên đăng nhập đã hết hạn hoặc không hợp lệ.', 401)
  }

  const inquiries = await listInquiries(context.env)
  return jsonResponse({
    ok: true,
    inquiries,
  })
}

export async function onRequestPatch(context: PagesContext) {
  const admin = await requireAdmin(context.request, context.env)
  if (!admin) {
    return errorResponse('Chưa đăng nhập quyền quản trị.', 401)
  }

  const body = (await context.request.json()) as {
    code?: string
    status?: string
    action?: 'update-status' | 'resend-telegram'
  }
  const code = (body.code || '').trim()
  if (!code) {
    return errorResponse('Thiếu mã yêu cầu.', 400)
  }

  if (body.action === 'resend-telegram') {
    const items = await listInquiries(context.env)
    const found = items.find((i) => i.code === code)
    if (!found) return errorResponse('Không tìm thấy hồ sơ.', 404)

    const tg = await dispatchInquiryToTelegram(context.env, found)
    found.telegramSent = tg.sent
    found.telegramError = tg.error
    await saveInquiry(context.env, found)

    if (!tg.sent) {
      return errorResponse(tg.error || 'Gửi thông báo Telegram thất bại.', 400, { inquiry: found })
    }
    return jsonResponse({ ok: true, inquiry: found })
  }

  const status = (body.status || '').trim() as InquiryRecord['status']
  if (!ALLOWED_STATUSES.includes(status)) {
    return errorResponse('Trạng thái không hợp lệ.', 400)
  }

  const updated = await updateInquiryStatus(context.env, code, status)
  if (!updated) {
    return errorResponse('Không tìm thấy yêu cầu tương ứng.', 404)
  }

  return jsonResponse({ ok: true, code, status })
}

export async function onRequestDelete(context: PagesContext) {
  const admin = await requireAdmin(context.request, context.env)
  if (!admin) {
    return errorResponse('Chưa đăng nhập quyền quản trị.', 401)
  }

  const url = new URL(context.request.url)
  let code = (url.searchParams.get('code') || '').trim()

  if (!code) {
    try {
      const body = (await context.request.json()) as { code?: string }
      code = (body.code || '').trim()
    } catch {
      // ignore empty body
    }
  }

  if (!code) {
    return errorResponse('Thiếu mã hồ sơ cần xóa.', 400)
  }

  const deleted = await deleteInquiry(context.env, code)
  if (!deleted) {
    return errorResponse('Không tìm thấy hồ sơ cần xóa.', 404)
  }

  return jsonResponse({ ok: true, code })
}
