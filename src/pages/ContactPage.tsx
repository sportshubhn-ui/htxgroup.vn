import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ChevronRight } from 'lucide-react'
import { companyInfo } from '@/data/tcgroupData'
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
      alert('Đã có lỗi xảy ra. Vui lòng thử lại qua số hotline: ' + companyInfo.hotline)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-50 py-10 lg:py-14 min-h-[70vh]">
      <SEO
        title="Liên Hệ"
        description="Thông tin liên hệ Công ty Cổ phần Dịch vụ Sản xuất HTX Group (HTX GROUP) - Địa chỉ, điện thoại, bãi tiếp nhận và mẫu đăng ký tư vấn."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-[#1c84cd]">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium">Liên Hệ</span>
        </nav>

        <div className="mb-12 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 tracking-tight">
            THÔNG TIN LIÊN HỆ
          </h1>
          <div className="w-20 h-1 bg-[#1c84cd] mx-auto mt-3" />
          <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto">
            Vui lòng liên hệ với HTX Group theo thông tin dưới đây hoặc để lại tin nhắn trong biểu mẫu:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
              <h2 className="text-lg font-bold uppercase text-gray-900 border-b border-gray-100 pb-3">
                {companyInfo.name}
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#1c84cd] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block">Trụ sở chính:</strong>
                    <span>{companyInfo.officeAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#1c84cd] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block">Khu vực tiếp nhận & xử lý CTRXD (6.5 ha):</strong>
                    <span>{companyInfo.yardAddress}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#1c84cd] shrink-0" />
                  <div>
                    <strong className="text-gray-900 block">Điện thoại / Hotline:</strong>
                    <span>{companyInfo.hotline} / {companyInfo.phoneAlt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#1c84cd] shrink-0" />
                  <div>
                    <strong className="text-gray-900 block">Email:</strong>
                    <span>{companyInfo.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#1c84cd] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block">Thời gian làm việc:</strong>
                    <span>Thứ Hai – Thứ Bảy: 07:30 – 17:30 (Trực hotline 24/7)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Box */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 overflow-hidden">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Bản đồ vị trí văn phòng
              </div>
              <div className="w-full h-60 bg-gray-200 rounded overflow-hidden">
                <iframe
                  title="Google Maps HTX GROUP"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.8!2d105.79!3d20.99!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac97854619b1%3A0x6b44538805f778a4!2zMTY0IEtodeG6pXQgRHV5IFRp4bq_biwgVGhhbmggWHXDom4gQuG6r2MsIFRoYW5oIFh1w6JuLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1600000000000"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold uppercase text-gray-900 mb-2">
                GỬI YÊU CẦU CHO CHÚNG TÔI
              </h2>
              <p className="text-xs text-gray-500 mb-6">
                Quý khách vui lòng điền các thông tin bên dưới, chuyên viên HTX Group sẽ liên hệ lại trong thời gian sớm nhất.
              </p>

              {submitted ? (
                <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                  <h3 className="text-base font-bold text-green-900">
                    Gửi thông tin thành công!
                  </h3>
                  <p className="text-xs text-green-700">
                    Cảm ơn Quý khách đã liên hệ với HTX Group (HTX GROUP). Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded text-xs font-semibold hover:bg-green-700"
                  >
                    Gửi biểu mẫu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Nguyễn Văn A"
                        className="w-full h-10 px-3 text-xs sm:text-sm border border-gray-300 rounded focus:ring-2 focus:ring-[#1c84cd] focus:outline-none"
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
                        className="w-full h-10 px-3 text-xs sm:text-sm border border-gray-300 rounded focus:ring-2 focus:ring-[#1c84cd] focus:outline-none"
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
                        className="w-full h-10 px-3 text-xs sm:text-sm border border-gray-300 rounded focus:ring-2 focus:ring-[#1c84cd] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Chủ đề / Dịch vụ quan tâm
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full h-10 px-3 text-xs sm:text-sm border border-gray-300 rounded focus:ring-2 focus:ring-[#1c84cd] focus:outline-none bg-white"
                      >
                        <option value="">-- Chọn dịch vụ --</option>
                        <option value="Xử lý chất thải rắn xây dựng">Xử lý chất thải rắn xây dựng</option>
                        <option value="Phá dỡ công trình">Phá dỡ công trình dân dụng & CN</option>
                        <option value="Mua vật liệu xây dựng tái chế">Mua vật liệu xây dựng tái chế</option>
                        <option value="Thuê máy nghiền RM 70GO!">Thuê máy nghiền RM 70GO!</option>
                        <option value="Hợp tác khác">Hợp tác khác</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Nội dung tin nhắn <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mô tả yêu cầu, địa điểm công trình, khối lượng dự kiến..."
                      className="w-full p-3 text-xs sm:text-sm border border-gray-300 rounded focus:ring-2 focus:ring-[#1c84cd] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3 bg-[#1c84cd] hover:bg-[#1977b9] text-white font-bold text-xs uppercase tracking-wider rounded transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Đang gửi...' : 'Gửi liên hệ'}</span>
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
