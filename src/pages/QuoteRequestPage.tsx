import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { useQuoteCart } from '@/context/QuoteCartContext'
import {
  Send,
  Truck,
  Warehouse,
  ShoppingCart,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Phone,
  Trash2,
  ChevronRight
} from 'lucide-react'

type QuoteType = 'thu-gom' | 'dua-vao-bai' | 'mua-vat-lieu'

interface InquiryPayload {
  code: string
  type: QuoteType
  submittedAt: string
  customerName: string
  companyName: string
  phone: string
  email: string
  projectLocation: string
  wasteType: string
  estimatedVolume: string
  expectedDate: string
  accessCondition: string
  vehicleCount: string
  notes: string
  cartItems: any[]
}

export function QuoteRequestPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = (searchParams.get('type') as QuoteType) || 'thu-gom'
  const [activeTab, setActiveTab] = useState<QuoteType>(tabParam)

  const { items, removeItem, clearCart } = useQuoteCart()

  // Form states
  const [customerName, setCustomerName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [projectLocation, setProjectLocation] = useState('')
  const [wasteType, setWasteType] = useState('Bê tông tháo dỡ')
  const [estimatedVolume, setEstimatedVolume] = useState('20')
  const [volumeUnit, setVolumeUnit] = useState('m³')
  const [expectedDate, setExpectedDate] = useState('')
  const [accessCondition, setAccessCondition] = useState('Đường rộng, xe tải 4 chân tiếp cận được')
  const [vehicleCount, setVehicleCount] = useState('2')
  const [notes, setNotes] = useState('')
  const [consent, setConsent] = useState(true)

  // Submission result
  const [submitting, setSubmitting] = useState(false)
  const [quoteSuccess, setQuoteSuccess] = useState<InquiryPayload | null>(null)

  useEffect(() => {
    const t = searchParams.get('type') as QuoteType
    if (t && ['thu-gom', 'dua-vao-bai', 'mua-vat-lieu'].includes(t)) {
      setActiveTab(t)
    }
  }, [searchParams])

  const handleTabChange = (t: QuoteType) => {
    setActiveTab(t)
    setSearchParams({ type: t })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Generate local inquiry reference code
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const randomHex = Math.floor(1000 + Math.random() * 9000)
    const refCode = `HTX-${dateStr}-${randomHex}`

    const inquiryPayload = {
      code: refCode,
      type: activeTab,
      submittedAt: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
      customerName,
      companyName,
      phone,
      email,
      projectLocation,
      wasteType,
      estimatedVolume: `${estimatedVolume} ${volumeUnit}`,
      expectedDate,
      accessCondition,
      vehicleCount,
      notes,
      cartItems: activeTab === 'mua-vat-lieu' ? items : [],
    }

    // Save to local storage demo inquiries
    try {
      const existing = JSON.parse(localStorage.getItem('htx_inquiries') || '[]')
      existing.unshift(inquiryPayload)
      localStorage.setItem('htx_inquiries', JSON.stringify(existing))
    } catch (err) {
      console.error(err)
    }

    setTimeout(() => {
      setSubmitting(false)
      setQuoteSuccess(inquiryPayload)
    }, 600)
  }

  const downloadDraftSummary = () => {
    if (!quoteSuccess) return
    const text = `PHIẾU YÊU CẦU BÁO GIÁ — HÀNH TINH XANH\n` +
      `Mã yêu cầu: ${quoteSuccess.code}\n` +
      `Thời điểm tạo: ${quoteSuccess.submittedAt}\n` +
      `Loại hình: ${quoteSuccess.type === 'thu-gom' ? 'Thu gom công trình' : quoteSuccess.type === 'dua-vao-bai' ? 'Tiếp nhận vào bãi Liên Mạc' : 'Mua vật liệu xây dựng'}\n` +
      `Khách hàng: ${quoteSuccess.customerName} (${quoteSuccess.companyName || 'Cá nhân'})\n` +
      `Điện thoại: ${quoteSuccess.phone}\n` +
      `Email: ${quoteSuccess.email || 'Không có'}\n` +
      `Địa điểm: ${quoteSuccess.projectLocation || 'Chưa cung cấp'}\n` +
      `Nội dung chi tiết: ${quoteSuccess.notes || 'Không có ghi chú'}\n` +
      `Trạng thái: Đã ghi nhận hệ thống xem trước — Đang chờ nhân viên điều phối đối soát.\n` +
      `Hotline hỗ trợ: 0707 155 666`

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${quoteSuccess.code}-Bao-Gia-HTX.txt`
    a.click()
  }

  return (
    <div className="bg-[#FFFCF6] min-h-[85vh] py-10 lg:py-14">
      <SEO
        title="Yêu Cầu Báo Giá Trực Tuyến"
        description="Gửi yêu cầu báo giá thu gom phế thải công trình, đăng ký đưa xe vào bãi Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội, hoặc đặt mua cát đá cốt liệu tái chế từ Hành Tinh Xanh."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-[#064D35]">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-semibold">Yêu cầu báo giá</span>
        </nav>

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#064D35] tracking-tight">
            YÊU CẦU BÁO GIÁ & ĐẶT LỊCH TIẾP NHẬN
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
            Hệ thống tiếp nhận nhu cầu trực tuyến của Công ty TNHH TM&DV Giải Pháp Hành Tinh Xanh. Phản hồi báo giá minh bạch trong vòng 30 phút.
          </p>
        </div>

        {/* Success confirmation view */}
        {quoteSuccess ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-900/10 shadow-lg text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-[#064D35]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Ghi nhận yêu cầu thành công
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Mã tra cứu của bạn: <span className="text-[#064D35] font-mono">{quoteSuccess.code}</span>
              </h2>
              <p className="text-xs text-gray-500">
                Thời gian tiếp nhận: {quoteSuccess.submittedAt} (Giờ Hà Nội)
              </p>
            </div>

            <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl max-w-lg mx-auto text-xs text-emerald-950 text-left space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#064D35]">
                <Clock className="w-4 h-4" />
                <span>Quy trình xử lý tiếp theo:</span>
              </div>
              <p className="leading-relaxed">
                Cán bộ điều phối của <strong>Hành Tinh Xanh</strong> sẽ kiểm tra điều kiện bãi / đội xe và liên hệ lại trực tiếp qua số điện thoại <strong>{quoteSuccess.phone}</strong> để chốt lịch và gửi bản báo giá chính thức.
              </p>
              {quoteSuccess.type === 'dua-vao-bai' && (
                <p className="font-semibold text-emerald-800 text-[11px] bg-white p-2 rounded-lg border border-emerald-300">
                  ⚠️ Lưu ý: Đây là lịch đề nghị, chờ nhân viên bãi xác nhận trước khi phương tiện xuất phát vào Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội.
                </p>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={downloadDraftSummary}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Tải bản tóm tắt nhu cầu (.txt)</span>
              </button>

              <button
                onClick={() => {
                  setQuoteSuccess(null)
                  if (activeTab === 'mua-vat-lieu') clearCart()
                }}
                className="px-6 py-2.5 bg-[#064D35] hover:bg-[#043826] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-md"
              >
                Gửi yêu cầu khác
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-emerald-900/10 shadow-sm overflow-hidden">
            {/* Tab navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-gray-200 bg-gray-50/60">
              <button
                type="button"
                onClick={() => handleTabChange('thu-gom')}
                className={`py-4 px-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer border-b-2 ${
                  activeTab === 'thu-gom'
                    ? 'border-[#064D35] text-[#064D35] bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>1. Thu gom tại công trình</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('dua-vao-bai')}
                className={`py-4 px-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer border-b-2 ${
                  activeTab === 'dua-vao-bai'
                    ? 'border-[#064D35] text-[#064D35] bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Warehouse className="w-4 h-4" />
                <span>2. Đưa hàng vào bãi Liên Mạc</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('mua-vat-lieu')}
                className={`py-4 px-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer border-b-2 ${
                  activeTab === 'mua-vat-lieu'
                    ? 'border-[#064D35] text-[#064D35] bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>3. Mua vật liệu ({items.length})</span>
              </button>
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
              {/* Tab specific guidance */}
              {activeTab === 'thu-gom' && (
                <div className="p-3.5 bg-emerald-50 rounded-xl text-xs text-emerald-900 flex items-center gap-2.5">
                  <Truck className="w-5 h-5 text-[#064D35] shrink-0" />
                  <span>Dịch vụ thu gom trọn gói: Nhân công, máy xúc bốc xúc, đội xe tải ben vận chuyển phế thải từ công trình về bãi xử lý.</span>
                </div>
              )}

              {activeTab === 'dua-vao-bai' && (
                <div className="p-3.5 bg-amber-50 rounded-xl text-xs text-amber-900 flex items-center gap-2.5 border border-amber-200">
                  <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
                  <span>
                    <strong>Điểm đổ:</strong> Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội. Giờ làm việc: 24/7. Trạm cân 80 tấn. "Lịch đề nghị — Chờ nhân viên điều phối xác nhận slot trước khi xe đến".
                  </span>
                </div>
              )}

              {activeTab === 'mua-vat-lieu' && (
                <div className="space-y-4">
                  <div className="p-3.5 bg-emerald-50 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-[#064D35]" />
                      <span>Các loại vật liệu đã chọn từ catalog ({items.length} mặt hàng)</span>
                    </div>
                    <Link to="/vat-lieu" className="text-xs font-bold text-[#064D35] hover:underline">
                      + Thêm sản phẩm khác
                    </Link>
                  </div>

                  {items.length === 0 ? (
                    <div className="text-center py-6 border border-dashed border-gray-300 rounded-xl bg-gray-50">
                      <p className="text-xs text-gray-500">Chưa có sản phẩm nào trong giỏ báo giá.</p>
                      <Link
                        to="/vat-lieu"
                        className="inline-block mt-2 px-4 py-1.5 bg-[#064D35] text-white rounded text-xs font-bold uppercase"
                      >
                        Chọn vật liệu ngay
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={item.slug} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-gray-900">{item.name}</span>
                            <span className="text-gray-500 ml-2">({item.category})</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-[#064D35]">{item.quantity} {item.unit}</span>
                            <button
                              type="button"
                              onClick={() => removeItem(item.slug)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Shared Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Họ và tên người liên hệ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full h-11 px-3.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Tên công ty / Nhà thầu (nếu có)
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Công ty CP Xây Dựng & Thương Mại..."
                    className="w-full h-11 px-3.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912 345 678"
                    className="w-full h-11 px-3.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email nhận báo giá
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@example.com"
                    className="w-full h-11 px-3.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none"
                  />
                </div>
              </div>

              {/* Dynamic inputs based on activeTab */}
              {activeTab === 'thu-gom' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Địa điểm công trình phát sinh <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={projectLocation}
                      onChange={(e) => setProjectLocation(e.target.value)}
                      placeholder="Số nhà, đường phố, quận/huyện tại Hà Nội..."
                      className="w-full h-11 px-3.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Loại chất thải chính
                    </label>
                    <select
                      value={wasteType}
                      onChange={(e) => setWasteType(e.target.value)}
                      className="w-full h-11 px-3.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none bg-white"
                    >
                      <option value="Bê tông tháo dỡ">Bê tông tháo dỡ dầm móng</option>
                      <option value="Trạc xà bần, gạch vỡ">Trạc xà bần, gạch vụn cải tạo</option>
                      <option value="Đất đào móng công trình">Đất đào móng công trình</option>
                      <option value="Hỗn hợp phế thải xây dựng">Hỗn hợp phế thải xây dựng tổng hợp</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Khối lượng ước tính
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="1"
                        value={estimatedVolume}
                        onChange={(e) => setEstimatedVolume(e.target.value)}
                        className="w-2/3 h-11 px-3.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none"
                      />
                      <select
                        value={volumeUnit}
                        onChange={(e) => setVolumeUnit(e.target.value)}
                        className="w-1/3 h-11 px-2 text-xs border border-gray-300 rounded-xl bg-white"
                      >
                        <option value="m³">m³</option>
                        <option value="Tấn">Tấn</option>
                        <option value="Chuyến xe">Chuyến xe</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Điều kiện đường tiếp cận xe
                    </label>
                    <input
                      type="text"
                      value={accessCondition}
                      onChange={(e) => setAccessCondition(e.target.value)}
                      placeholder="Xe 2.5T, xe 3 chân, hay ngõ hẹp..."
                      className="w-full h-11 px-3.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'dua-vao-bai' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Bãi tiếp nhận
                    </label>
                    <input
                      type="text"
                      readOnly
                      value="Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội"
                      className="w-full h-11 px-3.5 text-xs bg-gray-100 text-gray-700 border border-gray-300 rounded-xl cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Số lượng xe dự kiến đến bãi
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={vehicleCount}
                      onChange={(e) => setVehicleCount(e.target.value)}
                      placeholder="Số lượng xe (vd: 3)"
                      className="w-full h-11 px-3.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Thời gian dự kiến vào bãi
                    </label>
                    <input
                      type="datetime-local"
                      value={expectedDate}
                      onChange={(e) => setExpectedDate(e.target.value)}
                      className="w-full h-11 px-3.5 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Loại chất thải trên xe
                    </label>
                    <select
                      value={wasteType}
                      onChange={(e) => setWasteType(e.target.value)}
                      className="w-full h-11 px-3.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none bg-white"
                    >
                      <option value="Bê tông tháo dỡ">Bê tông tháo dỡ</option>
                      <option value="Trạc xà bần, gạch vỡ">Trạc gạch vỡ công trình</option>
                      <option value="Đất đào sạch">Đất đào móng sạch</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'mua-vat-lieu' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Địa chỉ nhận hàng / Công trình
                    </label>
                    <input
                      type="text"
                      required
                      value={projectLocation}
                      onChange={(e) => setProjectLocation(e.target.value)}
                      placeholder="Địa chỉ công trường cần cấp vật liệu..."
                      className="w-full h-11 px-3.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Tiến độ giao hàng mong muốn
                    </label>
                    <input
                      type="text"
                      value={expectedDate}
                      onChange={(e) => setExpectedDate(e.target.value)}
                      placeholder="Giao ngay trong tuần / Cấp theo ngày..."
                      className="w-full h-11 px-3.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Note input */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Ghi chú hoặc yêu cầu kỹ thuật đặc biệt
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Yêu cầu kiểm nghiệm chất lượng, kích thước hạt, giấy tờ hóa đơn VAT, thời gian xe vào công trình..."
                  className="w-full p-3.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none"
                />
              </div>

              {/* Consent checkbox per MASTER_BRIEF */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-0.5 w-4 h-4 text-[#064D35] rounded focus:ring-[#064D35]"
                />
                <label htmlFor="consent" className="text-xs text-gray-600 leading-tight">
                  Tôi đồng ý để <strong>Công ty TNHH TM&DV Giải Pháp Hành Tinh Xanh</strong> liên hệ theo số điện thoại đã cung cấp để trao đổi phương án và gửi báo giá theo chính sách bảo mật thông tin.
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={submitting || !consent}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#064D35] hover:bg-[#043826] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-[#B2E5C0]" />
                  <span>{submitting ? 'Đang gửi yêu cầu...' : 'Gửi yêu cầu báo giá ngay'}</span>
                </button>

                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#064D35]" />
                  <span>Cần hỗ trợ tức thì? Gọi Hotline <strong>0707 155 666</strong></span>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
