import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { equipmentData } from '@/data/htxData'
import { Wrench, CheckCircle, ChevronRight } from 'lucide-react'

export function EquipmentPage() {
  return (
    <div className="bg-[#FFFCF6] min-h-[80vh] py-10 lg:py-14">
      <SEO
        title="Năng Lực Thiết Bị & Đội Xe – Hành Tinh Xanh"
        description="Dây chuyền máy nghiền kẹp hàm di động, máy sàng rung 3 tầng, máy xúc bánh xích gầu kẹp và đội xe tải ben 3 chân 4 chân của Hành Tinh Xanh."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-[#064D35]">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/nang-luc" className="hover:text-[#064D35]">Năng lực</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-semibold">Thiết bị & Đội xe</span>
        </nav>

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-[#064D35] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            <span>Cơ giới hiện đại</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase text-[#064D35] tracking-tight">
            NĂNG LỰC THIẾT BỊ & PHƯƠNG TIỆN
          </h1>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Hành Tinh Xanh đầu tư đồng bộ hệ thống thiết bị cơ giới chuyên dụng phục vụ công tác phá dỡ, thu gom, vận chuyển và nghiền sàng tái chế chất thải rắn xây dựng.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {equipmentData.map((item) => (
            <div
              key={item.slug}
              className="bg-white rounded-3xl overflow-hidden border border-emerald-900/10 shadow-xs hover:shadow-lg transition-all flex flex-col group"
            >
              <div className="relative h-64 bg-gray-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded backdrop-blur-xs">
                  Hình minh họa
                </span>
                <span className="absolute top-3 right-3 px-3 py-1 bg-[#064D35] text-[#B2E5C0] text-[11px] font-bold rounded shadow-xs">
                  {item.status}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#064D35] transition">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    <strong>Vai trò chính:</strong> {item.role}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100 text-xs">
                  <span className="font-bold text-[#064D35] block">Đặc điểm kỹ thuật nổi bật:</span>
                  <div className="space-y-1.5">
                    {item.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="w-3.5 h-3.5 text-[#064D35] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <Link
                    to="/yeu-cau-bao-gia"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#064D35] text-xs font-bold uppercase rounded-lg transition"
                  >
                    <span>Liên hệ thuê thiết bị / Dịch vụ</span>
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
