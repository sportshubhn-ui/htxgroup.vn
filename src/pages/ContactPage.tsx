import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ChevronRight, ShieldCheck, Sprout } from 'lucide-react'
import { companyInfo } from '@/data/htxData'
import { contactService } from '@/services/contactService'

export function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await contactService.submitContact(formData)
      setSubmitted(true)
      setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      alert('Đã có lỗi xảy ra. Vui lòng liên hệ trực tiếp hotline: ' + companyInfo.hotline)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-50 py-10 lg:py-14 min-h-[70vh]">
      <SEO
        title="Liên Hệ & Công Bố Bãi Tiếp Nhận CTRXD"
        description="Thông tin liên hệ Công ty TNHH TM&DV Giải Pháp Hành Tinh Xanh - Bãi tập kết CTRXD Ngõ 46 Liên Mạc, Thượng Cát, Bắc Từ Liêm. Trụ sở 138 Giảng Võ, Ba Đình. Hotline 0707 155 666."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-emerald-700">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium">Liên Hệ</span>
        </nav>

        <div className="mb-12 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 tracking-tight">
            THÔNG TIN LIÊN HỆ & BÃI TIẾP NHẬN CTRXD
          </h1>
          <div className="w-20 h-1 bg-emerald-600 mx-auto mt-3" />
          <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto">
            Hành Tinh Xanh sẵn sàng đồng hành cùng các chủ đầu tư, nhà thầu xây dựng trong việc tiếp nhận xử lý phế thải và cung ứng vật liệu tái chế.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
              <div>
                <h2 className="text-base font-extrabold uppercase text-emerald-900">
                  {companyInfo.name}
                </h2>
                <p className="text-xs text-emerald-700 font-medium italic mt-0.5">"{companyInfo.slogan}"</p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-gray-700">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-bold">Văn phòng trụ sở:</strong>
                    <span>{companyInfo.officeAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-emerald-50/70 rounded-lg border border-emerald-200/60">
                  <Sprout className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-950 block font-bold">Bãi tập kết & Xử lý CTRXD:</strong>
                    <span className="text-emerald-900 font-medium">{companyInfo.yardAddress}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <strong className="text-gray-900 block font-bold">Hotline tiếp nhận 24/7:</strong>
                    <a href={`tel:${companyInfo.hotline.replace(/\s/g, '')}`} className="text-emerald-700 font-extrabold text-base hover:underline">
                      {companyInfo.hotline}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <strong className="text-gray-900 block font-bold">Email chính thức:</strong>
                    <span>{companyInfo.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 px-3 py-2 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-bold">Thời gian làm việc:</strong>
                    <span>Thứ Hai – Thứ Bảy: 07:00 – 18:00 (Trực hotline tiếp nhận xe 24/7)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Environmental Commitment Card */}
            <div className="p-5 bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-xl shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
                <h3 className="font-bold text-sm uppercase tracking-wide">Cam kết vì môi trường</h3>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Chúng tôi cam kết cấp đầy đủ hóa đơn, hợp đồng vận chuyển và biên bản bàn giao - xử lý chất thải rắn xây dựng (CTRXD) theo đúng quy định hiện hành của UBND TP Hà Nội và Sở TN&MT.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold uppercase text-gray-900 mb-1">
                GỬI YÊU CẦU TIẾP NHẬN & BÁO GIÁ
              </h2>
              <p className="text-xs text-gray-500 mb-6">
                Quý khách vui lòng cung cấp thông tin công trình hoặc nhu cầu vật liệu tái sinh:
              </p>

              {submitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-bold text-emerald-950">
                    Gửi yêu cầu thành công!
                  </h3>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Cảm ơn Quý khách đã liên hệ với <strong>Công ty TNHH TM&DV Giải Pháp Hành Tinh Xanh</strong>. Bộ phận điều phối bãi tập kết sẽ liên hệ lại qua số điện thoại của Quý khách trong thời gian sớm nhất.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-xs font-bold uppercase hover:bg-emerald-700 cursor-pointer"
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
                        className="w-full h-11 px-3.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
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
                        className="w-full h-11 px-3.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
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
                        className="w-full h-11 px-3.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Dịch vụ cần tư vấn
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full h-11 px-3.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                      >
                        <option value="">-- Chọn dịch vụ --</option>
                        <option value="Tiếp nhận CTRXD tại bãi Thượng Cát">Tiếp nhận CTRXD tại bãi Thượng Cát</option>
                        <option value="Thu gom & Vận chuyển phế thải xây dựng">Thu gom & Vận chuyển phế thải xây dựng</option>
                        <option value="Phá dỡ công trình dân dụng & công nghiệp">Phá dỡ công trình dân dụng & công nghiệp</option>
                        <option value="Mua cát san lấp & Bê tông nghiền tái chế">Mua cát san lấp & Bê tông nghiền tái chế</option>
                        <option value="Thuê máy nghiền di động công suất lớn">Thuê máy nghiền di động công suất lớn</option>
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
                      placeholder="Mô tả chi tiết công trình, địa chỉ phát sinh CTRXD, khối lượng dự kiến (tấn/m3), loại phương tiện vận tải..."
                      className="w-full p-3.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md"
                  >
                    <Send className="w-4 h-4" />
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
