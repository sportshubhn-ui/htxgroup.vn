import { deriveTelegramWebhookSecret, jsonResponse, timingSafeEqualStr } from '../../../server/auth'
import { listInquiries } from '../../../server/inquiries'
import {
  callTelegramApi,
  escapeHtml,
  getEffectiveTelegramConfig,
  recordRecentTelegramChat,
} from '../../../server/telegram'
import type { PagesContext, RecentTelegramChat } from '../../../server/types'

export async function onRequestPost(context: PagesContext) {
  try {
    const expectedSecret = await deriveTelegramWebhookSecret(context.env)
    const providedSecret = context.request.headers.get('X-Telegram-Bot-Api-Secret-Token') || ''

    if (!providedSecret || !timingSafeEqualStr(providedSecret, expectedSecret)) {
      return jsonResponse({ ok: false, error: 'Unauthorized webhook request' }, 403)
    }

    const update = (await context.request.json()) as any
    const msg = update?.message || update?.channel_post
    const chatMember = update?.my_chat_member

    const rawChat = msg?.chat || chatMember?.chat
    if (!rawChat?.id) {
      return jsonResponse({ ok: true })
    }

    const chatId = String(rawChat.id)
    const title =
      rawChat.title ||
      [rawChat.first_name, rawChat.last_name].filter(Boolean).join(' ') ||
      rawChat.username ||
      `Chat ${chatId}`

    const recentChat: RecentTelegramChat = {
      chatId,
      type: String(rawChat.type || 'private'),
      title: String(title),
      username: rawChat.username ? String(rawChat.username) : undefined,
      lastSeenAt: new Date().toISOString(),
    }

    await recordRecentTelegramChat(context.env, recentChat)

    const cfg = await getEffectiveTelegramConfig(context.env)
    if (!cfg.botToken) {
      return jsonResponse({ ok: true })
    }

    const text = typeof msg?.text === 'string' ? msg.text.trim() : ''
    const command = text.split(/\s+/)[0]?.split('@')[0]?.toLowerCase()

    const configuredChats = (cfg.chatId || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    const isAuthorizedChat = configuredChats.includes(chatId)

    if (command === '/start' || command === '/id') {
      const replyLines = [
        `🌿 <b>Xin chào! Đây là Bot ${escapeHtml(cfg.botName || 'Khách Hàng HTX')}</b>`,
        `Hệ thống tiếp nhận yêu cầu báo giá & khách hàng của <b>htxgroup.vn</b>.`,
        ``,
        `🆔 <b>Chat ID của kênh này:</b> <code>${escapeHtml(chatId)}</code>`,
        `📌 <b>Loại:</b> ${escapeHtml(recentChat.type)} (${escapeHtml(recentChat.title)})`,
        ``,
        isAuthorizedChat
          ? `✅ Kênh này <b>đã được kết nối</b> nhận thông báo khách hàng mới tự động.`
          : `👉 Hãy copy Chat ID <code>${escapeHtml(chatId)}</code> dán vào mục <b>Bot Telegram</b> trong trang Quản trị <code>htxgroup.vn/admin</code> (hoặc bấm <b>"Tự động dò Chat ID"</b>) để kích hoạt nhận đơn.`,
      ]
      await callTelegramApi(cfg.botToken, 'sendMessage', {
        chat_id: chatId,
        text: replyLines.join('\n'),
        parse_mode: 'HTML',
      })
    } else if (command === '/baogia' || command === '/leads') {
      if (!isAuthorizedChat) {
        await callTelegramApi(cfg.botToken, 'sendMessage', {
          chat_id: chatId,
          text: `🔒 Kênh này (ID: <code>${escapeHtml(chatId)}</code>) chưa được cấp quyền nhận báo giá trong Admin.`,
          parse_mode: 'HTML',
        })
      } else {
        const inquiries = await listInquiries(context.env)
        const latest = inquiries.slice(0, 5)
        if (latest.length === 0) {
          await callTelegramApi(cfg.botToken, 'sendMessage', {
            chat_id: chatId,
            text: `📭 Hiện chưa có yêu cầu báo giá nào từ khách hàng trên hệ thống.`,
          })
        } else {
          const lines = [
            `📋 <b>5 YÊU CẦU BÁO GIÁ GẦN NHẤT (${inquiries.length} tổng):</b>`,
            `━━━━━━━━━━━━━━━━━━━━━━`,
          ]
          for (const inq of latest) {
            lines.push(
              `• <code>${escapeHtml(inq.code)}</code> — <b>${escapeHtml(inq.customerName)}</b> (<code>${escapeHtml(inq.phone)}</code>) [${escapeHtml(inq.status)}]`
            )
          }
          await callTelegramApi(cfg.botToken, 'sendMessage', {
            chat_id: chatId,
            text: lines.join('\n'),
            parse_mode: 'HTML',
          })
        }
      }
    } else if (command === '/help') {
      await callTelegramApi(cfg.botToken, 'sendMessage', {
        chat_id: chatId,
        text:
          `ℹ️ <b>Lệnh hỗ trợ Bot Khách Hàng HTX:</b>\n` +
          `• /start hoặc /id — Xem Chat ID để kết nối với htxgroup.vn/admin\n` +
          `• /baogia — Xem 5 yêu cầu báo giá mới nhất (sau khi kết nối)\n`,
        parse_mode: 'HTML',
      })
    }

    return jsonResponse({ ok: true })
  } catch (err) {
    console.error('Telegram webhook error:', err)
    return jsonResponse({ ok: true })
  }
}
