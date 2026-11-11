import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Sprout,
  Navigation,
  ExternalLink
} from 'lucide-react'
import { companyInfo } from '@/data/htxData'

export function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submittedCode, setSubmittedCode] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const randomHex = Math.floor(1000 + Math.random() * 9000)
    const refCode = `HTX-LH-${dateStr}-${randomHex}`

    try {
      const existing = JSON.parse(localStorage.getItem('htx_inquiries') || '[]')
      existing.unshift({
        code: refCode,
        type: 'lien-he',
        submittedAt: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
        customerName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        notes: `[${formData.subject}] ${formData.message}`,
        status: 'new'
      })
      localStorage.setItem('htx_inquiries', JSON.stringify(existing))
    } catch (err) {
      console.error(err)
    }

    setTimeout(() => {
      setSubmitting(false)
      setSubmittedCode(refCode)
      setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' })
    }, 500)
  }

  return (
    <div className="bg-[#FFFCF6] py-10 lg:py-14 min-h-[75vh]">
      <SEO
        title="Liên Hệ & Công Bố Bãi Tiếp Nhận CTRXD"
        description="Thông tin liên hệ Công ty TNHH TM&DV Giải Pháp Hành Tinh Xanh - Bãi tập kết CTRXD Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội. Trụ sở 138 Giảng Võ, Ba Đình. Hotline 0707 155 666."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-[#064D35]">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-semibold">Liên Hệ</span>
        </nav>

        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-[#064D35] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            <Sprout className="w-3.5 h-3.5" />
            <span>Kết nối & Hợp tác</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase text-[#064D35] tracking-tight">
            THÔNG TIN LIÊN HỆ & BÃI TIẾP NHẬN CTRXD
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
            Hành Tinh Xanh sẵn sàng đồng hành cùng các chủ đầu tư, nhà thầu xây dựng trong việc tiếp nhận xử lý phế thải và cung ứng vật liệu cát đá tái chế.
          </p>
        </div>

        {/* Pinned Map Section with Pin Highlight */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-emerald-900/10 shadow-sm mb-12 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-[#064D35]" />
              <div>
                <h3 className="font-bold text-sm text-gray-900 uppercase">
                  Vị trí ghim định vị Google Maps – Bãi tập kết xử lý CTRXD Hành Tinh Xanh
                </h3>
                <p className="text-xs text-gray-500">
                  Địa chỉ: {companyInfo.yardAddress}
                </p>
              </div>
            </div>

            <a
              href={companyInfo.googleMapsDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#064D35] hover:bg-[#043826] text-white rounded-xl text-xs font-bold transition shadow-xs shrink-0"
            >
              <span>Mở bản đồ dẫn đường</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#B2E5C0]" />
            </a>
          </div>

          <div className="relative w-full h-[360px] sm:h-[440px] rounded-2xl overflow-hidden border border-gray-200">
            <iframe
              src={companyInfo.mapEmbedUrl}
              title={`Định vị bãi tập kết ${companyInfo.yardAddress}`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-emerald-900/10 space-y-6">
              <div>
                <h2 className="text-base font-extrabold uppercase text-[#064D35]">
                  {companyInfo.name}
                </h2>
                <p className="text-xs text-emerald-800 font-semibold italic mt-0.5">
                  "{companyInfo.slogan}"
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-gray-700">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                  <MapPin className="w-5 h-5 text-[#064D35] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-bold">Văn phòng trụ sở:</strong>
                    <span>{companyInfo.officeAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200/60">
                  <Sprout className="w-5 h-5 text-[#064D35] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#064D35] block font-bold">Bãi tập kết & Xử lý CTRXD:</strong>
                    <span className="text-gray-900 font-medium">{companyInfo.yardAddress}</span>
                    <p className="text-[11px] text-emerald-800 mt-0.5">Bãi chính quy được cấp phép • Tiếp nhận xe 24/7</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-2xl">
                  <Phone className="w-5 h-5 text-[#064D35] shrink-0" />
                  <div>
                    <strong className="text-gray-900 block font-bold">Hotline tiếp nhận 24/7:</strong>
                    <a href={`tel:${companyInfo.hotline.replace(/\s/g, '')}`} className="text-[#064D35] font-extrabold text-base hover:underline">
                      {companyInfo.hotline}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-2xl">
                  <Mail className="w-5 h-5 text-[#064D35] shrink-0" />
                  <div>
                    <strong className="text-gray-900 block font-bold">Email chính thức:</strong>
                    <span>{companyInfo.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 px-3 py-2.5 bg-gray-50 rounded-2xl">
                  <Clock className="w-5 h-5 text-[#064D35] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-bold">Thời gian làm việc:</strong>
                    <span>Văn phòng: Thứ 2 – Thứ 7 (08:00 – 17:30) • Bãi đón xe: 24/7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Environmental Commitment Card */}
            <div className="p-6 bg-gradient-to-br from-[#064D35] to-[#03271B] text-white rounded-3xl shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#B2E5C0]" />
                <h3 className="font-bold text-sm uppercase tracking-wide">Cam kết vì môi trường Thủ đô</h3>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Chúng tôi cam kết cấp đầy đủ hóa đơn, hợp đồng vận chuyển và biên bản bàn giao - xử lý chất thải rắn xây dựng (CTRXD) theo đúng quy định hiện hành của UBND TP Hà Nội và Sở TN&MT.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-emerald-900/10">
              <h2 className="text-lg font-bold uppercase text-gray-900 mb-1">
                GỬI YÊU CẦU TIẾP NHẬN & BÁO GIÁ
              </h2>
              <p className="text-xs text-gray-500 mb-6">
                Quý khách vui lòng cung cấp thông tin công trình hoặc nhu cầu vật liệu tái sinh:
              </p>

              {submittedCode ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#064D35] mx-auto" />
                  <h3 className="text-lg font-bold text-gray-900">
                    Gửi yêu cầu thành công!
                  </h3>
                  <p className="text-xs font-mono font-bold text-[#064D35]">
                    Mã tra cứu: {submittedCode}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed max-w-md mx-auto">
                    Cảm ơn Quý khách đã liên hệ với <strong>Công ty TNHH TM&DV Giải Pháp Hành Tinh Xanh</strong>. Bộ phận điều phối sẽ liên hệ lại qua số điện thoại của Quý khách trong thời gian sớm nhất.
                  </p>
                  <button
                    onClick={() => setSubmittedCode(null)}
                    className="mt-4 px-5 py-2.5 bg-[#064D35] text-white rounded-xl text-xs font-bold uppercase hover:bg-[#043826] cursor-pointer"
                  >
                    Gửi biểu mẫu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Họ và tên / Đơn vị <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Nguyễn Văn A / Công ty CP Xây Dựng..."
                        className="w-full h-11 px-3.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0912 345 678"
                        className="w-full h-11 px-3.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@example.com"
                        className="w-full h-11 px-3.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Dịch vụ cần tư vấn
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full h-11 px-3.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none bg-white"
                      >
                        <option value="">-- Chọn dịch vụ --</option>
                        <option value="Tiếp nhận CTRXD tại bãi Liên Mạc - Thượng Cát">Tiếp nhận CTRXD tại bãi Liên Mạc - Thượng Cát</option>
                        <option value="Thu gom & Vận chuyển phế thải công trình">Thu gom & Vận chuyển phế thải công trình</option>
                        <option value="Mua cốt liệu tái chế (RCA) & Cát đá">Mua cốt liệu tái chế (RCA) & Cát đá</option>
                        <option value="Thuê máy nghiền kẹp hàm công suất lớn">Thuê máy nghiền kẹp hàm công suất lớn</option>
                        <option value="Hợp tác khác">Hợp tác khác</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Nội dung yêu cầu / Địa điểm công trình <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mô tả chi tiết công trình, địa chỉ phát sinh CTRXD, khối lượng dự kiến (tấn/m³), loại xe..."
                      className="w-full p-3.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064D35] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#064D35] hover:bg-[#043826] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md"
                  >
                    <Send className="w-4 h-4 text-[#B2E5C0]" />
                    <span>{submitting ? 'Đang gửi...' : 'Gửi yêu cầu'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
