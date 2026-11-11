import { errorResponse, jsonResponse, requireAdmin } from '../../../server/auth'
import {
  callTelegramApi,
  escapeHtml,
  getEffectiveTelegramConfig,
  getRecentTelegramChats,
  maskToken,
  recordRecentTelegramChat,
  registerTelegramWebhook,
  saveTelegramConfigKV,
} from '../../../server/telegram'
import type { PagesContext, RecentTelegramChat } from '../../../server/types'

export async function onRequestGet(context: PagesContext) {
  const admin = await requireAdmin(context.request, context.env)
  if (!admin) {
    return errorResponse('Chưa đăng nhập quyền quản trị.', 401)
  }

  const url = new URL(context.request.url)
  const verify = url.searchParams.get('verify') === '1'
  const cfg = await getEffectiveTelegramConfig(context.env)
  const recentChats = await getRecentTelegramChats(context.env)

  let botInfo: { id?: number; username?: string; first_name?: string } | null = null
  let webhookInfo: { url?: string; last_error_message?: string } | null = null

  if (verify && cfg.botToken) {
    try {
      const [meRes, whRes] = await Promise.all([
        callTelegramApi(cfg.botToken, 'getMe'),
        callTelegramApi(cfg.botToken, 'getWebhookInfo'),
      ])
      if (meRes.ok && meRes.result) botInfo = meRes.result
      if (whRes.ok && whRes.result) webhookInfo = whRes.result
    } catch {
      // ignore temporary network issues
    }
  }

  return jsonResponse({
    ok: true,
    telegram: {
      configured: Boolean(cfg.botToken && cfg.chatId),
      hasToken: Boolean(cfg.botToken),
      maskedToken: maskToken(cfg.botToken),
      chatId: cfg.chatId,
      botName: cfg.botName || 'Khách Hàng HTX',
      botUsername: botInfo?.username || cfg.botUsername || '',
      botDisplayName: botInfo?.first_name || cfg.botDisplayName || '',
      enabled: cfg.enabled,
      source: cfg.source,
      updatedAt: cfg.updatedAt,
      webhookUrl: webhookInfo?.url || '',
      webhookError: webhookInfo?.last_error_message || '',
      recentChats,
    },
  })
}

export async function onRequestPost(context: PagesContext) {
  const admin = await requireAdmin(context.request, context.env)
  if (!admin) {
    return errorResponse('Chưa đăng nhập quyền quản trị.', 401)
  }

  try {
    const body = (await context.request.json()) as {
      action?: 'save' | 'detect-chat' | 'test'
      botToken?: string
      chatId?: string
      botName?: string
      enabled?: boolean
    }

    const action = body.action || 'save'
    const currentCfg = await getEffectiveTelegramConfig(context.env)
    const origin = new URL(context.request.url).origin

    if (action === 'save') {
      const providedToken = (body.botToken || '').trim()
      const effectiveToken = providedToken || currentCfg.botToken
      const chatId = body.chatId !== undefined ? body.chatId.trim() : currentCfg.chatId
      const botName = (body.botName || currentCfg.botName || 'Khách Hàng HTX').trim()
      const enabled = body.enabled !== undefined ? Boolean(body.enabled) : currentCfg.enabled

      let verifiedUsername = currentCfg.botUsername
      let verifiedDisplayName = currentCfg.botDisplayName
      let webhookResult: { ok: boolean; url: string; description?: string } | null = null

      if (effectiveToken) {
        const me = await callTelegramApi<{ id: number; username?: string; first_name?: string }>(
          effectiveToken,
          'getMe'
        )
        if (!me.ok || !me.result) {
          return errorResponse(
            `Bot Token không hợp lệ (${me.description || 'Telegram API từ chối'}). Vui lòng kiểm tra lại token từ @BotFather.`,
            400
          )
        }
        verifiedUsername = me.result.username || ''
        verifiedDisplayName = me.result.first_name || botName

        // Ensure standard commands and webhook are registered
        await callTelegramApi(effectiveToken, 'setMyCommands', {
          commands: [
            { command: 'start', description: 'Kết nối & lấy Chat ID nhận khách hàng' },
            { command: 'id', description: 'Hiển thị Chat ID của kênh này' },
            { command: 'baogia', description: 'Xem 5 yêu cầu báo giá gần nhất' },
            { command: 'help', description: 'Hướng dẫn sử dụng Bot Khách Hàng HTX' },
          ],
        })

        // Also pull any updates queued before webhook existed so detect-chat has them immediately
        try {
          const whInfo = await callTelegramApi<{ url?: string }>(effectiveToken, 'getWebhookInfo')
          if (!whInfo.result?.url) {
            const updatesRes = await callTelegramApi<any[]>(effectiveToken, 'getUpdates', { limit: 20 })
            if (updatesRes.ok && Array.isArray(updatesRes.result)) {
              for (const u of updatesRes.result) {
                const rawChat = u?.message?.chat || u?.my_chat_member?.chat
                if (rawChat?.id) {
                  await recordRecentTelegramChat(context.env, {
                    chatId: String(rawChat.id),
                    type: String(rawChat.type || 'private'),
                    title: String(
                      rawChat.title ||
                        [rawChat.first_name, rawChat.last_name].filter(Boolean).join(' ') ||
                        rawChat.username ||
                        `Chat ${rawChat.id}`
                    ),
                    username: rawChat.username ? String(rawChat.username) : undefined,
                    lastSeenAt: new Date().toISOString(),
                  })
                }
              }
            }
          }
        } catch {
          // non-fatal
        }

        webhookResult = await registerTelegramWebhook(effectiveToken, origin, context.env)
      }

      const saved = await saveTelegramConfigKV(context.env, {
        botToken: effectiveToken || undefined,
        chatId,
        botName,
        botUsername: verifiedUsername,
        botDisplayName: verifiedDisplayName,
        enabled,
      })

      const recentChats = await getRecentTelegramChats(context.env)

      return jsonResponse({
        ok: true,
        message: 'Đã lưu cấu hình Bot Telegram thành công.',
        telegram: {
          configured: Boolean(saved.botToken && saved.chatId),
          hasToken: Boolean(saved.botToken),
          maskedToken: maskToken(saved.botToken),
          chatId: saved.chatId || '',
          botName: saved.botName,
          botUsername: saved.botUsername || '',
          botDisplayName: saved.botDisplayName || '',
          enabled: saved.enabled,
          webhookOk: webhookResult?.ok || false,
          webhookUrl: webhookResult?.url || '',
          recentChats,
        },
      })
    }

    if (action === 'detect-chat') {
      const effectiveToken = (body.botToken || '').trim() || currentCfg.botToken
      if (!effectiveToken) {
        return errorResponse('Vui lòng nhập Bot Token trước khi tự động dò Chat ID.', 400)
      }

      // First check updates via temporary webhook check if no recent chats stored yet
      let recentChats = await getRecentTelegramChats(context.env)
      const whInfo = await callTelegramApi<{ url?: string }>(effectiveToken, 'getWebhookInfo')

      if (!whInfo.result?.url || recentChats.length === 0) {
        if (whInfo.result?.url) {
          await callTelegramApi(effectiveToken, 'deleteWebhook', { drop_pending_updates: false })
        }
        const updatesRes = await callTelegramApi<any[]>(effectiveToken, 'getUpdates', { limit: 30 })
        if (updatesRes.ok && Array.isArray(updatesRes.result)) {
          for (const u of updatesRes.result) {
            const rawChat = u?.message?.chat || u?.my_chat_member?.chat
            if (rawChat?.id) {
              const item: RecentTelegramChat = {
                chatId: String(rawChat.id),
                type: String(rawChat.type || 'private'),
                title: String(
                  rawChat.title ||
                    [rawChat.first_name, rawChat.last_name].filter(Boolean).join(' ') ||
                    rawChat.username ||
                    `Chat ${rawChat.id}`
                ),
                username: rawChat.username ? String(rawChat.username) : undefined,
                lastSeenAt: new Date().toISOString(),
              }
              recentChats = await recordRecentTelegramChat(context.env, item)
            }
          }
        }
        await registerTelegramWebhook(effectiveToken, origin, context.env)
      }

      if (recentChats.length === 0) {
        return errorResponse(
          'Chưa tìm thấy tin nhắn nào tới Bot. Hãy mở Telegram tìm bot bạn vừa tạo và bấm /start (hoặc thêm bot vào nhóm chat rồi nhắn /id), sau đó bấm Dò lại.',
          404,
          { recentChats: [] }
        )
      }

      return jsonResponse({
        ok: true,
        recentChats,
        suggestedChatId: recentChats[0].chatId,
      })
    }

    if (action === 'test') {
      const effectiveToken = (body.botToken || '').trim() || currentCfg.botToken
      const targetChatIds = ((body.chatId !== undefined ? body.chatId : currentCfg.chatId) || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)

      if (!effectiveToken || targetChatIds.length === 0) {
        return errorResponse('Thiếu Bot Token hoặc Chat ID để gửi tin nhắn thử nghiệm.', 400)
      }

      const errors: string[] = []
      let sentCount = 0

      for (const cid of targetChatIds) {
        const res = await callTelegramApi(effectiveToken, 'sendMessage', {
          chat_id: cid,
          text:
            `✅ <b>KẾT NỐI THÀNH CÔNG — BOT ${escapeHtml(currentCfg.botName || 'KHÁCH HÀNG HTX')}</b>\n` +
            `━━━━━━━━━━━━━━━━━━━━━━\n` +
            `🌐 Hệ thống tiếp nhận báo giá <b>htxgroup.vn</b> đã kết nối hoàn tất với kênh Telegram (<code>${cid}</code>).\n` +
            `🔔 Mọi yêu cầu báo giá và liên hệ mới từ khách hàng sẽ hiển thị ngay tại đây!\n` +
            `🕒 Kiểm tra lúc: ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`,
          parse_mode: 'HTML',
        })
        if (res.ok) sentCount++
        else errors.push(`Chat ${cid}: ${res.description || 'Lỗi gửi tin'}`)
      }

      if (sentCount === 0) {
        return errorResponse(
          `Không gửi được tin nhắn thử (${errors.join('; ')}). Hãy chắc chắn bạn đã bấm Start (/start) trong bot.`,
          400
        )
      }

      return jsonResponse({
        ok: true,
        message: `Đã gửi tin nhắn kiểm tra thành công tới ${sentCount}/${targetChatIds.length} kênh Telegram!`,
        errors: errors.length > 0 ? errors : undefined,
      })
    }

    return errorResponse('Hành động không hợp lệ.', 400)
  } catch (err) {
    console.error('Telegram admin API error:', err)
    return errorResponse('Lỗi kết nối dịch vụ Telegram.', 500)
  }
}
