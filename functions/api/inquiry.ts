import { errorResponse, jsonResponse } from '../../server/auth'
import { saveInquiry } from '../../server/inquiries'
import { dispatchInquiryToTelegram } from '../../server/telegram'
import type { CartItemPayload, InquiryRecord, InquiryType, PagesContext } from '../../server/types'

function clampStr(val: unknown, max = 500): string {
  if (typeof val !== 'string') return ''
  return val.trim().slice(0, max)
}

export async function onRequestPost(context: PagesContext) {
  try {
    const body = (await context.request.json()) as Record<string, unknown>

    // Honeypot anti-spam field (if hidden field is filled by bot, silently ignore)
    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      return jsonResponse({
        ok: true,
        inquiry: {
          code: 'HTX-OK',
          submittedAt: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
        },
      })
    }

    const customerName = clampStr(body.customerName, 120)
    const phone = clampStr(body.phone, 40)
    if (!customerName || !phone) {
      return errorResponse('Vui lòng nhập đầy đủ họ tên và số điện thoại liên hệ.', 400)
    }

    const cleanDigits = phone.replace(/[^0-9+]/g, '')
    if (cleanDigits.length < 8) {
      return errorResponse('Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.', 400)
    }

    const rawType = clampStr(body.type, 40)
    const allowedTypes: InquiryType[] = ['thu-gom', 'dua-vao-bai', 'mua-vat-lieu', 'lien-he']
    const type: InquiryType = allowedTypes.includes(rawType as InquiryType) ? (rawType as InquiryType) : 'thu-gom'

    const now = new Date()
    const vnDate = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .format(now)
      .replace(/-/g, '')
    const randomBytes = crypto.getRandomValues(new Uint16Array(1))[0] % 9000 + 1000
    const prefix = type === 'lien-he' ? 'HTX-LH' : 'HTX'
    const code = `${prefix}-${vnDate}-${randomBytes}`
    const submittedAt = now.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })

    let cartItems: CartItemPayload[] = []
    if (type === 'mua-vat-lieu' && Array.isArray(body.cartItems)) {
      cartItems = body.cartItems.slice(0, 30).map((item: any) => ({
        slug: clampStr(item?.slug, 80),
        name: clampStr(item?.name, 160),
        category: clampStr(item?.category, 80),
        unit: clampStr(item?.unit, 40),
        quantity: Math.max(1, Number(item?.quantity) || 1),
        isRecycled: Boolean(item?.isRecycled),
      }))
    }

    const record: InquiryRecord = {
      code,
      type,
      submittedAt,
      createdAtIso: now.toISOString(),
      customerName,
      companyName: clampStr(body.companyName, 160) || undefined,
      phone,
      email: clampStr(body.email, 160) || undefined,
      projectLocation: clampStr(body.projectLocation, 240) || undefined,
      wasteType: clampStr(body.wasteType, 120) || undefined,
      estimatedVolume: clampStr(body.estimatedVolume, 80) || undefined,
      expectedDate: clampStr(body.expectedDate, 80) || undefined,
      accessCondition: clampStr(body.accessCondition, 200) || undefined,
      vehicleCount: clampStr(body.vehicleCount, 40) || undefined,
      notes: clampStr(body.notes, 1500) || undefined,
      cartItems: cartItems.length > 0 ? cartItems : undefined,
      status: 'new',
    }

    // Attempt Telegram dispatch (failures do not block saving the lead)
    const tgResult = await dispatchInquiryToTelegram(context.env, record)
    record.telegramSent = tgResult.sent
    if (tgResult.error) {
      record.telegramError = tgResult.error
    }

    await saveInquiry(context.env, record)

    return jsonResponse(
      {
        ok: true,
        inquiry: record,
        telegramDispatched: tgResult.sent,
      },
      201
    )
  } catch (err) {
    console.error('POST /api/inquiry error:', err)
    return errorResponse(
      'Không thể ghi nhận yêu cầu lúc này. Vui lòng thử lại hoặc gọi Hotline 0707 155 666.',
      500
    )
  }
}
