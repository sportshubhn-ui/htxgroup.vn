import { useParams, Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { servicesData, companyInfo } from '@/data/htxData'
import {
  ChevronRight,
  CheckCircle2,
  Phone,
  Send
} from 'lucide-react'

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const service = servicesData.find((s) => s.slug === slug)

  if (!service) {
    return (
      <div className="py-20 text-center max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800">Không tìm thấy dịch vụ</h2>
        <p className="text-gray-500 mt-2 text-sm">Dịch vụ bạn đang tìm không tồn tại hoặc đã được cập nhật đường dẫn mới.</p>
        <Link to="/dich-vu" className="mt-6 inline-block px-5 py-2.5 bg-[#064D35] text-white rounded-lg text-xs font-bold uppercase">
          Về danh mục dịch vụ
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#FFFCF6] min-h-[80vh] py-10 lg:py-14">
      <SEO
        title={`${service.name} – Giải Pháp Hành Tinh Xanh`}
        description={`${service.name}. ${service.shortDesc} Phục vụ tại Hà Nội, liên hệ 0707 155 666.`}
        image={service.image}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-[#064D35]">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/dich-vu" className="hover:text-[#064D35]">Dịch vụ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-semibold">{service.name}</span>
        </nav>

        {/* Hero image and title */}
        <div className="bg-white rounded-3xl overflow-hidden border border-emerald-900/10 shadow-sm mb-10">
          <div className="relative h-64 sm:h-80 bg-gray-900">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end p-6 sm:p-10">
              <div className="text-white space-y-2 max-w-3xl">
                <span className="inline-block px-3 py-1 bg-[#064D35] text-[#B2E5C0] text-xs font-bold uppercase rounded-full">
                  Dịch vụ chuyên nghiệp
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  {service.name}
                </h1>
              </div>
            </div>
            <span className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded backdrop-blur-xs">
              Hình minh họa
            </span>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            {/* Overview */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#064D35] mb-2">
                Tổng quan dịch vụ
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {service.shortDesc}
              </p>
            </div>

            {/* Scope and Target Customers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-[#064D35]">Khách hàng mục tiêu:</span>
                <p className="text-xs text-gray-700">{service.targetCustomers}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-[#064D35]">Phạm vi thực hiện:</span>
                <p className="text-xs text-gray-700">{service.scope}</p>
              </div>
            </div>

            {/* Accepted waste */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Các loại phế thải tiếp nhận & xử lý
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.acceptedWaste.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-200 text-xs text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-[#064D35] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-step Process */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Quy trình triển khai tiêu chuẩn 5 bước
              </h3>
              <div className="space-y-3">
                {service.process.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="w-6 h-6 rounded-full bg-[#064D35] text-[#B2E5C0] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-800 leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-600">
                <span>Cần tư vấn trực tiếp và khảo sát khối lượng tại công trường?</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`tel:${companyInfo.hotline.replace(/\s/g, '')}`}
                  className="flex-1 sm:flex-none px-5 py-3 border border-[#064D35] text-[#064D35] font-bold text-xs uppercase rounded-xl transition hover:bg-emerald-50 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Hotline: {companyInfo.hotline}</span>
                </a>

                <Link
                  to="/yeu-cau-bao-gia"
                  className="flex-1 sm:flex-none px-6 py-3 bg-[#064D35] hover:bg-[#043826] text-white font-bold text-xs uppercase rounded-xl transition flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4 text-[#B2E5C0]" />
                  <span>Yêu cầu báo giá</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
