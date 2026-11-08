import { useLocation, Link } from 'react-router-dom'
import { pagesContent } from '@/data/pagesContent'
import { SEO } from '@/components/common/SEO'
import { Phone, Mail, MapPin, ChevronRight, Share2, Printer } from 'lucide-react'
import { companyInfo } from '@/data/tcgroupData'

export function DynamicContentPage() {
  const { pathname } = useLocation()
  const cleanPath = pathname.replace(/\/$/, '') || '/'

  const page = pagesContent[cleanPath] || pagesContent[pathname] || {
    title: 'Nội dung chi tiết',
    desc: 'Thông tin chính thức từ HTX GROUP',
    content: 'Nội dung đang được cập nhật...',
  }

  // Format paragraphs from text content
  const paragraphs = page.content
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)

  return (
    <div className="bg-gray-50 py-10 lg:py-14 min-h-[70vh]">
      <SEO title={page.title} description={page.desc} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 flex-wrap gap-2">
          <Link to="/" className="hover:text-[#1c84cd]">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium truncate max-w-xs">{page.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content article */}
          <article className="lg:col-span-8 bg-white rounded-lg p-6 sm:p-10 shadow-sm border border-gray-100">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight border-b border-gray-100 pb-5 mb-6">
              {page.title}
            </h1>

            {/* Quick action bar */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-8 pb-4 border-b border-gray-100">
              <span className="italic">{companyInfo.name}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1 hover:text-[#1c84cd] transition"
                  aria-label="In trang này"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>In</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    alert('Đã sao chép liên kết vào bộ nhớ tạm!')
                  }}
                  className="flex items-center gap-1 hover:text-[#1c84cd] transition"
                  aria-label="Chia sẻ liên kết"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Chia sẻ</span>
                </button>
              </div>
            </div>

            {/* Content text */}
            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4 text-sm sm:text-base">
              {paragraphs.map((p, index) => {
                // Check if paragraph is a heading or key point
                if (p.startsWith('THÔNG TIN CÔNG TY') || p.startsWith('TẦM NHÌN') || p.startsWith('SỨ MỆNH') || p.startsWith('GIÁ TRỊ CỐT LÕI') || p.startsWith('LĨNH VỰC HOẠT ĐỘNG')) {
                  return (
                    <h2 key={index} className="text-lg font-bold uppercase text-[#1c84cd] pt-4 border-b pb-1">
                      {p}
                    </h2>
                  )
                }
                return (
                  <p key={index} className="text-justify">
                    {p}
                  </p>
                )
              })}
            </div>

            {/* Contact callout box */}
            <div className="mt-10 p-6 bg-blue-50/70 border border-blue-100 rounded-lg">
              <h3 className="font-bold text-gray-900 text-base mb-2">
                Liên hệ hợp tác & Báo giá xử lý CTRXD:
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-4">
                HTX Group (HTX GROUP) cam kết dịch vụ chuyên nghiệp, thi công an toàn và giải pháp xử lý phế thải xây dựng đạt chuẩn cao nhất.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold">
                <a
                  href={`tel:${companyInfo.hotline.replace(/\s/g, '')}`}
                  className="px-4 py-2 bg-[#1c84cd] text-white rounded hover:bg-[#1977b9] transition"
                >
                  Hotline: {companyInfo.hotline}
                </a>
                <Link
                  to="/lien-he"
                  className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded hover:border-[#1c84cd] transition"
                >
                  Gửi yêu cầu báo giá
                </Link>
              </div>
            </div>
          </article>

          {/* Right sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Quick Contact Box */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b-2 border-[#1c84cd] pb-2 mb-4">
                Thông Tin Liên Hệ
              </h3>
              <ul className="space-y-3 text-xs text-gray-600">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#1c84cd] shrink-0 mt-0.5" />
                  <span>{companyInfo.officeAddress}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#1c84cd] shrink-0" />
                  <span>Hotline: <strong>{companyInfo.hotline}</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#1c84cd] shrink-0" />
                  <span>{companyInfo.email}</span>
                </li>
              </ul>
            </div>

            {/* Quick links to core services */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b-2 border-[#1c84cd] pb-2 mb-4">
                Lĩnh Vực Hoạt Động
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/pha-do-cong-trinh-dan-dung-va-cong-nghiep" className="hover:text-[#1c84cd] text-gray-700 block py-1 border-b border-gray-50">
                    Phá dỡ công trình dân dụng & CN
                  </Link>
                </li>
                <li>
                  <Link to="/xu-ly-chat-thai-ran-xay-dung" className="hover:text-[#1c84cd] text-gray-700 block py-1 border-b border-gray-50">
                    Thu gom - Xử lý chất thải rắn xây dựng
                  </Link>
                </li>
                <li>
                  <Link to="/kinh-doanh-vat-lieu-xay-dung" className="hover:text-[#1c84cd] text-gray-700 block py-1 border-b border-gray-50">
                    Cung cấp nguyên liệu sau tái chế
                  </Link>
                </li>
                <li>
                  <Link to="/thu-gom-taiche" className="hover:text-[#1c84cd] text-gray-700 block py-1">
                    Thu gom tái chế phế thải
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
