import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { companyInfo, productsData, facilitiesData, equipmentData } from '@/data/htxData'
import {
  Users,
  Layers,
  Warehouse,
  RefreshCw,
  Search,
  Trash2,
  ExternalLink,
  Lock,
  LogOut,
  Send,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Bot,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'

interface CartItemRecord {
  slug: string
  name: string
  category?: string
  unit?: string
  quantity: number
}

interface Inquiry {
  code: string
  type: 'thu-gom' | 'dua-vao-bai' | 'mua-vat-lieu' | 'lien-he'
  submittedAt: string
  customerName: string
  companyName?: string
  phone: string
  email?: string
  projectLocation?: string
  wasteType?: string
  estimatedVolume?: string
  expectedDate?: string
  accessCondition?: string
  vehicleCount?: string
  notes?: string
  cartItems?: CartItemRecord[]
  status?: string
  telegramSent?: boolean
  telegramError?: string
}

interface RecentChat {
  chatId: string
  type: string
  title: string
  username?: string
  lastSeenAt: string
}

interface TelegramStatus {
  configured: boolean
  hasToken: boolean
  maskedToken: string
  chatId: string
  botName: string
  botUsername: string
  botDisplayName: string
  enabled: boolean
  source: string
  webhookUrl?: string
  webhookError?: string
  recentChats: RecentChat[]
}

export function AdminPage() {
  // Auth state
  const [authChecking, setAuthChecking] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [adminUser, setAdminUser] = useState('')
  const [loginUsername, setLoginUsername] = useState('admin@htxgroup.vn')
  const [loginPassword, setLoginPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loggingIn, setLoggingIn] = useState(false)

  // Dashboard state
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loadingInquiries, setLoadingInquiries] = useState(false)
  const [activeTab, setActiveTab] = useState<'leads' | 'telegram' | 'products' | 'facilities' | 'settings'>('leads')
  const [searchLead, setSearchLead] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // Telegram Bot config state
  const [tgStatus, setTgStatus] = useState<TelegramStatus | null>(null)
  const [tgBotName, setTgBotName] = useState('Khách Hàng HTX')
  const [tgBotToken, setTgBotToken] = useState('')
  const [tgChatId, setTgChatId] = useState('')
  const [tgEnabled, setTgEnabled] = useState(true)
  const [tgBusy, setTgBusy] = useState<'save' | 'detect' | 'test' | null>(null)

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [savingPassword, setSavingPassword] = useState(false)

  const showNotice = useCallback((type: 'success' | 'error', message: string) => {
    setToast({ type, message })
    window.setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev))
    }, 6000)
  }, [])

  const loadDashboardData = useCallback(async () => {
    setLoadingInquiries(true)
    try {
      // Remove legacy localStorage mock seed data if any existed on user browser
      localStorage.removeItem('htx_inquiries')
    } catch {
      // ignore storage errors
    }

    try {
      const [inqRes, tgRes] = await Promise.all([
        fetch('/api/admin/inquiries', { credentials: 'include' }),
        fetch('/api/admin/telegram?verify=1', { credentials: 'include' }),
      ])

      if (inqRes.status === 401 || tgRes.status === 401) {
        setAuthenticated(false)
        setLoadingInquiries(false)
        return
      }

      if (inqRes.ok) {
        const inqData = (await inqRes.json()) as { ok?: boolean; inquiries?: Inquiry[] }
        if (inqData.ok && Array.isArray(inqData.inquiries)) {
          setInquiries(inqData.inquiries)
        }
      }

      if (tgRes.ok) {
        const tgData = (await tgRes.json()) as { ok?: boolean; telegram?: TelegramStatus }
        if (tgData.ok && tgData.telegram) {
          setTgStatus(tgData.telegram)
          setTgBotName(tgData.telegram.botName || 'Khách Hàng HTX')
          setTgChatId(tgData.telegram.chatId || '')
          setTgEnabled(tgData.telegram.enabled)
        }
      }
    } catch (err) {
      console.error(err)
      showNotice('error', 'Không thể tải dữ liệu từ máy chủ Cloudflare.')
    } finally {
      setLoadingInquiries(false)
    }
  }, [showNotice])

  const checkSession = useCallback(async () => {
    setAuthChecking(true)
    try {
      const res = await fetch('/api/admin/session', { credentials: 'include' })
      if (res.ok) {
        const data = (await res.json()) as { authenticated?: boolean; username?: string }
        if (data.authenticated) {
          setAuthenticated(true)
          setAdminUser(data.username || 'admin@htxgroup.vn')
          setNewUsername(data.username || 'admin@htxgroup.vn')
          await loadDashboardData()
          setAuthChecking(false)
          return
        }
      }
      setAuthenticated(false)
    } catch {
      setAuthenticated(false)
    } finally {
      setAuthChecking(false)
    }
  }, [loadDashboardData])

  useEffect(() => {
    void checkSession()
  }, [checkSession])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError(null)
    setLoggingIn(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      })
      const data = (await res.json()) as { ok?: boolean; error?: string; username?: string }
      if (!res.ok || !data.ok) {
        setLoginError(data.error || 'Đăng nhập thất bại.')
        setLoggingIn(false)
        return
      }
      setAuthenticated(true)
      setAdminUser(data.username || loginUsername)
      setNewUsername(data.username || loginUsername)
      setLoginPassword('')
      await loadDashboardData()
    } catch {
      setLoginError('Lỗi kết nối tới máy chủ xác thực.')
    } finally {
      setLoggingIn(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' })
    setAuthenticated(false)
    setInquiries([])
    setTgStatus(null)
  }

  const updateLeadStatus = async (code: string, newStatus: string) => {
    const prev = inquiries
    setInquiries(inquiries.map((item) => (item.code === code ? { ...item, status: newStatus } : item)))
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ code, status: newStatus }),
      })
      if (!res.ok) {
        setInquiries(prev)
        showNotice('error', 'Không thể cập nhật trạng thái.')
      } else {
        showNotice('success', `Đã cập nhật trạng thái hồ sơ ${code}.`)
      }
    } catch {
      setInquiries(prev)
      showNotice('error', 'Lỗi mạng khi cập nhật trạng thái.')
    }
  }

  const resendToTelegram = async (code: string) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ code, action: 'resend-telegram' }),
      })
      const data = (await res.json()) as { ok?: boolean; error?: string; inquiry?: Inquiry }
      if (!res.ok || !data.ok) {
        showNotice('error', data.error || 'Không gửi được qua Telegram.')
        return
      }
      if (data.inquiry) {
        setInquiries((curr) => curr.map((item) => (item.code === code ? data.inquiry! : item)))
      }
      showNotice('success', `Đã đẩy lại hồ sơ ${code} sang Bot Khách Hàng HTX!`)
    } catch {
      showNotice('error', 'Lỗi kết nối Telegram.')
    }
  }

  const deleteLead = async (code: string) => {
    if (!confirm(`Bạn có chắc muốn xóa yêu cầu mã ${code}?`)) return
    try {
      const res = await fetch(`/api/admin/inquiries?code=${encodeURIComponent(code)}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (res.ok) {
        setInquiries((curr) => curr.filter((i) => i.code !== code))
        showNotice('success', `Đã xóa hồ sơ ${code}.`)
      } else {
        showNotice('error', 'Không thể xóa hồ sơ.')
      }
    } catch {
      showNotice('error', 'Lỗi kết nối khi xóa hồ sơ.')
    }
  }

  const handleTelegramAction = async (action: 'save' | 'detect-chat' | 'test', overrideChatId?: string) => {
    setTgBusy(action === 'detect-chat' ? 'detect' : action)
    try {
      const res = await fetch('/api/admin/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          action,
          botToken: tgBotToken.trim() || undefined,
          chatId: overrideChatId !== undefined ? overrideChatId : tgChatId.trim(),
          botName: tgBotName.trim() || 'Khách Hàng HTX',
          enabled: tgEnabled,
        }),
      })
      const data = (await res.json()) as {
        ok?: boolean
        error?: string
        message?: string
        telegram?: TelegramStatus
        recentChats?: RecentChat[]
        suggestedChatId?: string
      }

      if (!res.ok || !data.ok) {
        showNotice('error', data.error || 'Thao tác Telegram thất bại.')
        setTgBusy(null)
        return
      }

      if (action === 'save' && data.telegram) {
        setTgStatus(data.telegram)
        setTgBotToken('')
        showNotice('success', data.message || 'Đã lưu cấu hình & kết nối Webhook Bot Telegram!')
      } else if (action === 'detect-chat') {
        if (data.recentChats) {
          setTgStatus((prev) =>
            prev
              ? { ...prev, recentChats: data.recentChats! }
              : {
                  configured: false,
                  hasToken: true,
                  maskedToken: '',
                  chatId: tgChatId,
                  botName: tgBotName,
                  botUsername: '',
                  botDisplayName: '',
                  enabled: tgEnabled,
                  source: 'kv-config',
                  recentChats: data.recentChats!,
                }
          )
        }
        if (data.suggestedChatId && !tgChatId.trim()) {
          setTgChatId(data.suggestedChatId)
        }
        showNotice('success', `Tìm thấy ${data.recentChats?.length || 0} kênh chat Telegram đã nhắn với Bot!`)
      } else if (action === 'test') {
        showNotice('success', data.message || 'Đã gửi tin nhắn thử nghiệm thành công!')
      }
    } catch {
      showNotice('error', 'Lỗi kết nối API Telegram.')
    } finally {
      setTgBusy(null)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      showNotice('error', 'Mật khẩu mới nhập lại không khớp.')
      return
    }
    setSavingPassword(true)
    try {
      const res = await fetch('/api/admin/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword,
          newPassword,
          newUsername,
        }),
      })
      const data = (await res.json()) as { ok?: boolean; error?: string; message?: string; username?: string }
      if (!res.ok || !data.ok) {
        showNotice('error', data.error || 'Không thể đổi mật khẩu.')
        setSavingPassword(false)
        return
      }
      setAdminUser(data.username || newUsername)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      showNotice('success', data.message || 'Đã đổi mật khẩu quản trị thành công!')
    } catch {
      showNotice('error', 'Lỗi kết nối máy chủ.')
    } finally {
      setSavingPassword(false)
    }
  }

  const filteredInquiries = inquiries.filter((i) => {
    const matchSearch =
      i.customerName?.toLowerCase().includes(searchLead.toLowerCase()) ||
      i.code?.toLowerCase().includes(searchLead.toLowerCase()) ||
      i.phone?.includes(searchLead) ||
      (i.projectLocation || '').toLowerCase().includes(searchLead.toLowerCase())
    const matchStatus = statusFilter === 'all' || (i.status || 'new') === statusFilter
    const matchType = typeFilter === 'all' || i.type === typeFilter
    return matchSearch && matchStatus && matchType
  })

  if (authChecking) {
    return (
      <div className="bg-gray-100 min-h-[80vh] flex items-center justify-center">
        <SEO title="Cổng Quản Trị Nội Bộ – Hành Tinh Xanh" noIndex={true} />
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-[#064D35] animate-spin mx-auto" />
          <p className="text-xs font-semibold text-gray-600">Đang kiểm tra phiên đăng nhập quản trị...</p>
        </div>
      </div>
    )
  }

  // AUTH LOGIN GATE
  if (!authenticated) {
    return (
      <div className="bg-[#FFFCF6] min-h-[82vh] flex items-center justify-center py-12 px-4">
        <SEO
          title="Đăng Nhập Quản Trị Hệ Thống – Hành Tinh Xanh"
          description="Cổng đăng nhập quản trị nội bộ Công ty TNHH TM&DV Giải Pháp Hành Tinh Xanh."
          noIndex={true}
        />

        <div className="w-full max-w-md bg-white rounded-3xl border border-emerald-900/15 shadow-lg p-7 sm:p-9 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-emerald-100 text-[#064D35] rounded-2xl flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <span className="inline-block px-3 py-0.5 bg-emerald-50 border border-emerald-200 text-[#064D35] text-[10px] font-bold uppercase tracking-wider rounded-full">
              Khu vực bảo mật nội bộ
            </span>
            <h1 className="text-xl font-extrabold uppercase text-[#064D35]">
              Đăng nhập Quản Trị HTX Group
            </h1>
            <p className="text-xs text-gray-500 leading-relaxed">
              Chỉ nhân sự được cấp quyền mới có thể xem danh sách báo giá khách hàng và cấu hình Bot Telegram.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Tài khoản quản trị
              </label>
              <input
                type="text"
                required
                autoComplete="username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="admin@htxgroup.vn"
                className="w-full h-11 px-3.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Mật khẩu quản trị
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 pl-3.5 pr-10 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-700 cursor-pointer"
                  aria-label="Hiện/Ẩn mật khẩu"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 bg-[#064D35] hover:bg-[#043826] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md cursor-pointer disabled:opacity-50"
            >
              {loggingIn ? 'Đang xác thực...' : 'Đăng nhập vào hệ thống'}
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 text-center">
            <Link to="/" className="text-xs font-semibold text-gray-500 hover:text-[#064D35]">
              ← Quay lại trang chủ htxgroup.vn
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 text-[#172D24]">
      <SEO
        title="Quản Trị Hệ Thống & Bot Telegram – Hành Tinh Xanh"
        description="Cổng quản trị nội bộ Công ty TNHH TM&DV Giải Pháp Hành Tinh Xanh."
        noIndex={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Global Notice Toast */}
        {toast && (
          <div
            className={`mb-5 p-4 rounded-2xl border text-xs font-medium flex items-center justify-between gap-3 shadow-sm ${
              toast.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-[#064D35] shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-[11px] font-bold opacity-70 hover:opacity-100 cursor-pointer"
            >
              Đóng
            </button>
          </div>
        )}

        {/* Top Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 bg-emerald-100 text-[#064D35] text-[10px] font-bold rounded uppercase flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Quản trị viên: {adminUser}
              </span>
              {tgStatus?.configured ? (
                <span className="px-2.5 py-0.5 bg-sky-100 text-sky-800 text-[10px] font-bold rounded uppercase flex items-center gap-1">
                  <Bot className="w-3 h-3" />
                  Bot {tgStatus.botName}: Đã kết nối ({tgStatus.botUsername ? `@${tgStatus.botUsername}` : 'Active'})
                </span>
              ) : (
                <button
                  onClick={() => setActiveTab('telegram')}
                  className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded uppercase flex items-center gap-1 hover:bg-amber-200 cursor-pointer"
                >
                  <Bot className="w-3 h-3" />
                  Bot Khách Hàng HTX: Chưa gắn Token (Bấm để cài đặt)
                </button>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Cổng Quản Trị Hành Tinh Xanh (HTX Group)
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/"
              className="px-3.5 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 flex items-center gap-1.5"
            >
              <span>Trang chủ</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => void loadDashboardData()}
              disabled={loadingInquiries}
              className="px-3.5 py-2 bg-[#064D35] text-white rounded-xl text-xs font-bold uppercase flex items-center gap-1.5 hover:bg-[#043826] cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingInquiries ? 'animate-spin' : ''}`} />
              <span>Làm mới</span>
            </button>
            <button
              onClick={() => void handleLogout()}
              className="px-3.5 py-2 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-bold uppercase flex items-center gap-1.5 hover:bg-red-100 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-3">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'leads' ? 'bg-[#064D35] text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Yêu cầu báo giá thật ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('telegram')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'telegram' ? 'bg-[#064D35] text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Bot Telegram (Khách Hàng HTX)</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'products' ? 'bg-[#064D35] text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Vật liệu ({productsData.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('facilities')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'facilities' ? 'bg-[#064D35] text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Warehouse className="w-4 h-4" />
            <span>Cơ sở & Thiết bị</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'settings' ? 'bg-[#064D35] text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Bảo mật & Pháp nhân</span>
          </button>
        </div>

        {/* Tab 1: Leads */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-sm text-gray-900 uppercase">
                  Danh sách yêu cầu báo giá & liên hệ từ khách hàng (Cloudflare KV)
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Chỉ lưu và hiển thị đơn thật gửi từ website & tự động đẩy sang Telegram Bot. Không còn dữ liệu mẫu giả lập.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="text-xs px-2.5 py-1.5 border border-gray-300 rounded-lg bg-white"
                >
                  <option value="all">Tất cả loại hình</option>
                  <option value="thu-gom">Thu gom công trình</option>
                  <option value="dua-vao-bai">Vào bãi Liên Mạc</option>
                  <option value="mua-vat-lieu">Mua vật liệu</option>
                  <option value="lien-he">Liên hệ / Tư vấn</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs px-2.5 py-1.5 border border-gray-300 rounded-lg bg-white"
                >
                  <option value="all">Mọi trạng thái</option>
                  <option value="new">Mới tiếp nhận</option>
                  <option value="contacted">Đã liên hệ</option>
                  <option value="quoted">Đã báo giá</option>
                  <option value="in_progress">Đang thực hiện</option>
                  <option value="closed">Hoàn tất</option>
                  <option value="cancelled">Hủy</option>
                </select>

                <div className="relative w-full sm:w-56">
                  <input
                    type="text"
                    value={searchLead}
                    onChange={(e) => setSearchLead(e.target.value)}
                    placeholder="Tìm tên, SĐT, mã..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-700">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Mã số / Thời gian</th>
                    <th className="py-3 px-4">Loại hình</th>
                    <th className="py-3 px-4">Khách hàng / SĐT</th>
                    <th className="py-3 px-4">Chi tiết nhu cầu</th>
                    <th className="py-3 px-4">Telegram</th>
                    <th className="py-3 px-4">Trạng thái</th>
                    <th className="py-3 px-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-gray-400 space-y-1">
                        <p className="font-semibold text-gray-500">Chưa có yêu cầu báo giá thực tế nào từ khách hàng.</p>
                        <p className="text-[11px]">Toàn bộ dữ liệu mẫu giả lập đã được xóa bỏ.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((inq) => (
                      <tr key={inq.code} className="hover:bg-gray-50 transition align-top">
                        <td className="py-3 px-4 font-mono whitespace-nowrap">
                          <span className="font-bold text-[#064D35] block">{inq.code}</span>
                          <span className="text-[10px] text-gray-400">{inq.submittedAt}</span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 bg-emerald-50 text-[#064D35] border border-emerald-200 rounded font-semibold text-[10px]">
                            {inq.type === 'thu-gom'
                              ? 'Thu gom công trình'
                              : inq.type === 'dua-vao-bai'
                              ? 'Vào bãi Liên Mạc'
                              : inq.type === 'mua-vat-lieu'
                              ? 'Mua vật liệu'
                              : 'Liên hệ / Tư vấn'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <strong className="text-gray-900 block">{inq.customerName}</strong>
                          <a href={`tel:${inq.phone.replace(/\s/g, '')}`} className="text-[#064D35] font-bold hover:underline block">
                            {inq.phone}
                          </a>
                          {inq.companyName && <span className="block text-[10px] text-gray-500">{inq.companyName}</span>}
                          {inq.email && <span className="block text-[10px] text-gray-400">{inq.email}</span>}
                        </td>
                        <td className="py-3 px-4 max-w-sm space-y-1">
                          {inq.wasteType && <span className="font-semibold block text-gray-900">{inq.wasteType}</span>}
                          {inq.estimatedVolume && <span className="text-gray-600 block">Khối lượng: {inq.estimatedVolume}</span>}
                          {inq.projectLocation && (
                            <span className="block text-[11px] text-gray-500">Địa điểm: {inq.projectLocation}</span>
                          )}
                          {Array.isArray(inq.cartItems) && inq.cartItems.length > 0 && (
                            <div className="mt-1 p-2 bg-gray-50 rounded border border-gray-200 text-[10px] space-y-0.5">
                              {inq.cartItems.map((ci) => (
                                <div key={ci.slug}>
                                  • {ci.name}: <strong>{ci.quantity} {ci.unit}</strong>
                                </div>
                              ))}
                            </div>
                          )}
                          {inq.notes && <span className="block text-[11px] text-gray-500 italic">"{inq.notes}"</span>}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          {inq.telegramSent ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-sky-50 text-sky-700 border border-sky-200 rounded text-[10px] font-bold">
                              <CheckCircle2 className="w-3 h-3" />
                              Đã báo Bot
                            </span>
                          ) : (
                            <div className="space-y-1">
                              <span
                                className="inline-block px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded text-[10px] font-semibold"
                                title={inq.telegramError || 'Chưa cấu hình Telegram'}
                              >
                                Chưa gửi Bot
                              </span>
                              <button
                                onClick={() => void resendToTelegram(inq.code)}
                                className="block text-[10px] font-bold text-[#064D35] hover:underline cursor-pointer"
                              >
                                → Đẩy sang Telegram
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={inq.status || 'new'}
                            onChange={(e) => void updateLeadStatus(inq.code, e.target.value)}
                            className="text-xs p-1.5 rounded border border-gray-300 bg-white font-medium"
                          >
                            <option value="new">Mới tiếp nhận</option>
                            <option value="contacted">Đã liên hệ</option>
                            <option value="quoted">Đã báo giá</option>
                            <option value="in_progress">Đang thực hiện</option>
                            <option value="closed">Hoàn tất</option>
                            <option value="cancelled">Hủy</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => void deleteLead(inq.code)}
                            className="p-1.5 text-red-500 hover:text-red-700 cursor-pointer"
                            title="Xóa hồ sơ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Telegram Bot Configuration */}
        {activeTab === 'telegram' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-5">
              <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-gray-900">
                      Đấu nối Bot Telegram — Khách Hàng HTX
                    </h3>
                    <p className="text-xs text-gray-500">
                      Tự động đẩy toàn bộ yêu cầu báo giá & liên hệ mới về tài khoản/nhóm Telegram ngay lập tức.
                    </p>
                  </div>
                </div>
                {tgStatus?.configured ? (
                  <span className="px-2.5 py-1 bg-emerald-100 text-[#064D35] text-[10px] font-bold rounded-full uppercase shrink-0">
                    Đang hoạt động
                  </span>
                ) : (
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full uppercase shrink-0">
                    Chờ gắn Token
                  </span>
                )}
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Tên hiển thị Bot
                  </label>
                  <input
                    type="text"
                    value={tgBotName}
                    onChange={(e) => setTgBotName(e.target.value)}
                    placeholder="Khách Hàng HTX"
                    className="w-full h-10 px-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Telegram Bot Token (từ @BotFather)
                  </label>
                  <input
                    type="password"
                    value={tgBotToken}
                    onChange={(e) => setTgBotToken(e.target.value)}
                    placeholder={
                      tgStatus?.hasToken
                        ? `Đang dùng token đã lưu (${tgStatus.maskedToken}) — Để trống nếu giữ nguyên`
                        : 'Dán token dạng 7123456789:AAH... vào đây'
                    }
                    className="w-full h-10 px-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none font-mono"
                  />
                  {tgStatus?.botUsername && (
                    <p className="text-[11px] text-emerald-700 mt-1 font-semibold">
                      ✓ Đã xác thực Bot: {tgStatus.botDisplayName || tgBotName} (@{tgStatus.botUsername})
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-gray-700">
                      Chat ID / Group ID nhận thông báo
                    </label>
                    <button
                      type="button"
                      disabled={tgBusy !== null}
                      onClick={() => void handleTelegramAction('detect-chat')}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 hover:text-sky-900 cursor-pointer disabled:opacity-50"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{tgBusy === 'detect' ? 'Đang dò...' : 'Tự động dò Chat ID'}</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={tgChatId}
                    onChange={(e) => setTgChatId(e.target.value)}
                    placeholder="Ví dụ: 512345678 hoặc -1001987654321 (nhiều ID cách nhau dấu phẩy)"
                    className="w-full h-10 px-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none font-mono"
                  />

                  {tgStatus?.recentChats && tgStatus.recentChats.length > 0 && (
                    <div className="mt-2 p-2.5 bg-sky-50 border border-sky-200 rounded-xl space-y-1.5">
                      <span className="text-[11px] font-bold text-sky-900 block">
                        Các kênh Telegram vừa nhắn /start tới Bot (bấm để chọn nhanh):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {tgStatus.recentChats.map((rc) => (
                          <button
                            key={rc.chatId}
                            type="button"
                            onClick={() => setTgChatId(rc.chatId)}
                            className="px-2.5 py-1 bg-white border border-sky-300 hover:bg-sky-100 rounded-lg text-[11px] font-semibold text-sky-900 cursor-pointer"
                          >
                            {rc.title} ({rc.type}) • <code>{rc.chatId}</code>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    id="tg-enabled"
                    type="checkbox"
                    checked={tgEnabled}
                    onChange={(e) => setTgEnabled(e.target.checked)}
                    className="w-4 h-4 text-[#064D35] rounded"
                  />
                  <label htmlFor="tg-enabled" className="font-semibold text-gray-700">
                    Bật tự động bắn tin nhắn Telegram ngay khi khách gửi form báo giá / liên hệ
                  </label>
                </div>

                <div className="pt-3 flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled={tgBusy !== null}
                    onClick={() => void handleTelegramAction('save')}
                    className="px-5 py-2.5 bg-[#064D35] hover:bg-[#043826] text-white rounded-xl font-bold uppercase flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#B2E5C0]" />
                    <span>{tgBusy === 'save' ? 'Đang lưu & xác thực...' : 'Lưu cấu hình & Kích hoạt Webhook'}</span>
                  </button>

                  <button
                    type="button"
                    disabled={tgBusy !== null}
                    onClick={() => void handleTelegramAction('test')}
                    className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold uppercase flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{tgBusy === 'test' ? 'Đang gửi thử...' : 'Gửi tin nhắn thử nghiệm'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: 3-Step Creation Guide */}
            <div className="lg:col-span-5 bg-emerald-950 text-white rounded-2xl p-6 space-y-4 text-xs">
              <h4 className="font-bold text-sm uppercase tracking-wider text-[#B2E5C0]">
                Hướng dẫn tạo Bot "Khách Hàng HTX" (2 phút)
              </h4>
              <p className="text-emerald-100/80 leading-relaxed">
                Vì Telegram yêu cầu tài khoản Telegram chính chủ xác nhận tạo Bot qua <strong>@BotFather</strong>, bạn chỉ cần làm đúng 3 bước sau (hệ thống backend & webhook đã cài đặt sẵn 100%):
              </p>

              <ol className="space-y-3 text-emerald-100">
                <li className="p-3 bg-emerald-900/50 rounded-xl border border-emerald-800 space-y-1">
                  <strong className="text-[#B2E5C0] block">Bước 1: Tạo Bot trên @BotFather</strong>
                  <span>Mở ứng dụng Telegram → tìm kiếm <code>@BotFather</code> → bấm Start → gõ lệnh <code>/newbot</code>.</span>
                  <span className="block">• Tên Bot: nhập <strong>Khách Hàng HTX</strong></span>
                  <span className="block">• Username: nhập ví dụ <strong>KhachHangHTX_bot</strong></span>
                  <span className="block">→ @BotFather sẽ trả về 1 dãy <strong>HTTP API Token</strong>.</span>
                </li>

                <li className="p-3 bg-emerald-900/50 rounded-xl border border-emerald-800 space-y-1">
                  <strong className="text-[#B2E5C0] block">Bước 2: Lưu Token vào website</strong>
                  <span>Dán Token vừa nhận vào ô <strong>Telegram Bot Token</strong> bên cạnh → bấm <strong>Lưu cấu hình & Kích hoạt Webhook</strong>.</span>
                </li>

                <li className="p-3 bg-emerald-900/50 rounded-xl border border-emerald-800 space-y-1">
                  <strong className="text-[#B2E5C0] block">Bước 3: Bấm Start lấy Chat ID tự động</strong>
                  <span>Bấm vào link bot vừa tạo trên Telegram và bấm <strong>Start (/start)</strong> (hoặc thêm bot vào Nhóm Sale/Điều phối rồi gõ <code>/id</code>). Sau đó bấm nút <strong>Tự động dò Chat ID</strong> → chọn kênh → <strong>Lưu & Gửi thử</strong>!</span>
                </li>
              </ol>

              {tgStatus?.webhookUrl && (
                <div className="p-3 bg-black/30 rounded-xl text-[11px] text-emerald-200 space-y-1">
                  <strong className="block text-white">Webhook Endpoint đang chạy:</strong>
                  <code className="break-all">{tgStatus.webhookUrl}</code>
                  {tgStatus.webhookError && (
                    <span className="block text-amber-300">Lưu ý: {tgStatus.webhookError}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Products */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
            <h3 className="font-bold text-sm text-gray-900 uppercase">
              Danh mục 06 hạt nhân vật liệu (product-seeds.json)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {productsData.map((p) => (
                <div key={p.slug} className="p-4 rounded-xl border border-gray-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-xs text-gray-900">{p.name}</h4>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] rounded font-bold uppercase">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500">{p.specification}</p>
                  <div className="text-[11px] text-gray-700 pt-1 flex justify-between">
                    <span>Đơn vị: {p.unit}</span>
                    <span className="font-semibold text-[#064D35]">{p.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Facilities */}
        {activeTab === 'facilities' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
              <h3 className="font-bold text-sm text-gray-900 uppercase">
                Bãi tập kết & Xử lý chất thải rắn xây dựng
              </h3>
              {facilitiesData.map((f) => (
                <div key={f.id} className="p-4 bg-gray-50 rounded-xl space-y-2 text-xs">
                  <strong className="text-sm font-bold text-[#064D35] block">{f.name}</strong>
                  <p className="text-gray-700"><strong>Địa chỉ:</strong> {f.address}</p>
                  <p className="text-gray-700"><strong>Giờ mở cửa:</strong> {f.openingHours}</p>
                  <p className="text-gray-700"><strong>Quy chuẩn bãi:</strong> {f.weighbridge || 'Bãi chính quy được cấp phép của công ty'}</p>
                  <p className="text-gray-700"><strong>Tọa độ:</strong> {f.coordinates}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
              <h3 className="font-bold text-sm text-gray-900 uppercase">
                Danh sách thiết bị cơ giới ({equipmentData.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {equipmentData.map((eq) => (
                  <div key={eq.slug} className="p-4 border border-gray-200 rounded-xl space-y-1 text-xs">
                    <h4 className="font-bold text-gray-900">{eq.name}</h4>
                    <p className="text-gray-600">{eq.role}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-100 text-[#064D35] text-[10px] font-bold rounded">
                      {eq.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Security & Company Config */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Password Change Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4 text-xs">
              <div className="flex items-center gap-2 text-[#064D35]">
                <KeyRound className="w-5 h-5" />
                <h3 className="font-bold text-sm text-gray-900 uppercase">
                  Đổi tài khoản & Mật khẩu quản trị
                </h3>
              </div>
              <p className="text-gray-500">
                Mật khẩu mới được mã hóa PBKDF2 + Salt bảo mật trên máy chủ Cloudflare KV.
              </p>

              <form onSubmit={(e) => void handlePasswordChange(e)} className="space-y-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Tài khoản đăng nhập</label>
                  <input
                    type="text"
                    required
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full h-10 px-3.5 border border-gray-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Mật khẩu hiện tại</label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full h-10 px-3.5 border border-gray-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Mật khẩu mới (tối thiểu 8 ký tự)</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full h-10 px-3.5 border border-gray-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Nhập lại mật khẩu mới</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-10 px-3.5 border border-gray-300 rounded-xl"
                  />
                </div>
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="px-5 py-2.5 bg-[#064D35] hover:bg-[#043826] text-white rounded-xl font-bold uppercase cursor-pointer disabled:opacity-50"
                >
                  {savingPassword ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
                </button>
              </form>
            </div>

            {/* Company Info Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4 text-xs">
              <h3 className="font-bold text-sm text-gray-900 uppercase">
                Thông tin pháp nhân đang hiển thị
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500 block">Tên pháp nhân:</span>
                  <span className="font-bold text-gray-900">{companyInfo.name}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Slogan:</span>
                  <span className="font-semibold text-[#064D35]">"{companyInfo.slogan}"</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Hotline 24/7:</span>
                  <span className="font-bold text-gray-900">{companyInfo.hotline}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Trụ sở chính:</span>
                  <span className="text-gray-800">{companyInfo.officeAddress}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Bãi tập kết tiếp nhận:</span>
                  <span className="text-gray-800 font-bold">{companyInfo.yardAddress}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
