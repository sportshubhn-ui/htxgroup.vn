import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { servicesData } from '@/data/htxData'
import { ArrowRight, ShieldCheck, ChevronRight, Recycle, CheckCircle } from 'lucide-react'

export function ServicesPage() {
  return (
    <div className="bg-[#FFFCF6] min-h-[80vh] py-10 lg:py-14">
      <SEO
        title="Dịch Vụ Thu Gom & Tái Chế Chất Thải Rắn Xây Dựng"
        description="Các dịch vụ cốt lõi của Hành Tinh Xanh: Thu gom tại công trình, vận chuyển xe ben chuyên dụng, tiếp nhận tại bãi Ngõ 46 Liên Mạc Tây Hồ, và phân loại nghiền sàng tái chế."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-[#064D35]">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-semibold">Dịch vụ</span>
        </nav>

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-[#064D35] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            <Recycle className="w-3.5 h-3.5" />
            <span>Kinh tế tuần hoàn xây dựng</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase text-[#064D35] tracking-tight">
            DỊCH VỤ XỬ LÝ & TÁI CHẾ CTRXD
          </h1>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Hành Tinh Xanh cung cấp chuỗi dịch vụ khép kín từ khâu thu gom tại chân công trình, vận chuyển xe ben chuyên dụng, tiếp nhận tại bãi Ngõ 46 Liên Mạc, Thượng Cát, Tây Hồ đến nghiền sàng tái sinh thành cốt liệu xây dựng đạt chuẩn.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service, idx) => (
            <div
              key={service.slug}
              className="bg-white rounded-3xl overflow-hidden border border-emerald-900/10 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="text-xs uppercase font-bold text-[#B2E5C0] tracking-wider">
                      Dịch vụ 0{idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-white drop-shadow-sm">
                      {service.name}
                    </h3>
                  </div>
                </div>
                <span className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded backdrop-blur-xs">
                  Hình minh họa
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {service.shortDesc}
                </p>

                <div className="space-y-2 pt-2 border-t border-gray-100 text-xs">
                  <div className="flex items-start gap-2 text-gray-700">
                    <ShieldCheck className="w-4 h-4 text-[#064D35] shrink-0 mt-0.5" />
                    <span><strong>Đối tượng phù hợp:</strong> {service.targetCustomers}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-[#064D35] shrink-0 mt-0.5" />
                    <span><strong>Phạm vi phục vụ:</strong> {service.scope}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    to={`/dich-vu/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#064D35] group-hover:text-emerald-700 transition"
                  >
                    <span>Xem quy trình chi tiết</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/yeu-cau-bao-gia"
                    className="px-3.5 py-1.5 bg-[#064D35] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#043826] transition shadow-xs"
                  >
                    Báo giá
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
