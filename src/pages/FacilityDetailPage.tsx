import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { facilitiesData, companyInfo } from '@/data/htxData'
import {
  MapPin,
  Truck,
  CheckCircle2,
  Navigation,
  Phone,
  Send,
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react'

export function FacilityDetailPage() {
  const facility = facilitiesData[0]

  return (
    <div className="bg-[#FFFCF6] min-h-[80vh] py-10 lg:py-14">
      <SEO
        title="Bãi Tập Kết & Xử Lý CTRXD Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội"
        description="Thông tin chi tiết bãi tập kết và xử lý chất thải rắn xây dựng tại Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội. Định vị Google Maps, trạm cân 80T, tiếp nhận 24/7."
        image={facility.image}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-[#064D35]">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/nang-luc" className="hover:text-[#064D35]">Năng lực</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-semibold">Bãi tập kết Liên Mạc</span>
        </nav>

        {/* Header Title */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-100 text-[#064D35] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Điểm tập kết & xử lý chất thải rắn xây dựng</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase text-[#064D35] tracking-tight">
            {facility.name}
          </h1>
          <p className="mt-2 text-sm text-gray-600 flex items-center justify-center gap-1.5 font-medium">
            <MapPin className="w-4 h-4 text-[#064D35]" />
            <span>{facility.address}</span>
          </p>
          <p className="text-xs text-emerald-800 font-semibold mt-1">
            ({facility.note})
          </p>
        </div>

        {/* Google Map Pin Section - Pinned and clearly highlighted */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-emerald-900/10 shadow-sm mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-[#064D35]" />
              <h2 className="text-sm sm:text-base font-bold text-gray-900 uppercase">
                Định vị vệ tinh Google Maps – {companyInfo.yardAddress}
              </h2>
            </div>
            <a
              href={companyInfo.googleMapsDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#064D35] hover:bg-[#043826] text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              <span>Mở Google Maps chỉ đường</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#B2E5C0]" />
            </a>
          </div>

          {/* Interactive Map Iframe */}
          <div className="relative w-full h-[380px] sm:h-[450px] rounded-2xl overflow-hidden border border-gray-200">
            <iframe
              src={companyInfo.mapEmbedUrl}
              title={`Định vị bãi tập kết ${companyInfo.yardAddress}`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-gray-600">
            <div className="p-3 bg-gray-50 rounded-xl">
              <strong className="block text-gray-900 font-bold mb-1">Tọa độ GPS:</strong>
              <span>{facility.coordinates}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <strong className="block text-gray-900 font-bold mb-1">Thời gian đón xe:</strong>
              <span>{facility.openingHours}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <strong className="block text-gray-900 font-bold mb-1">Tải trọng trạm cân:</strong>
              <span>{facility.weighbridge}</span>
            </div>
          </div>
        </div>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Accepted Materials & Equipment */}
          <div className="lg:col-span-7 space-y-6">
            {/* Road Access */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-[#064D35]">
                <Truck className="w-5 h-5" />
                <h3 className="font-bold text-base uppercase">Chỉ dẫn đường vào cho phương tiện tải nặng</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {facility.roadAccess}. Lộ trình ven đê thông thoáng, không bị vướng cầu vượt hay dây điện thấp. Bãi có sân quay đầu rộng rãi cho cả xe đầu kéo và xe 4 chân.
              </p>
            </div>

            {/* Accepted Materials */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xs space-y-4">
              <h3 className="font-bold text-base uppercase text-gray-900">
                Danh mục chất thải rắn xây dựng được phép đổ
              </h3>
              <div className="space-y-2.5">
                {facility.acceptedMaterials.map((mat, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 bg-emerald-50/60 rounded-xl text-xs sm:text-sm text-gray-800 border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-[#064D35] shrink-0" />
                    <span>{mat}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-500 italic pt-1">
                * Lưu ý: Nghiêm cấm đưa rác thải nguy hại, hóa chất, amiăng hoặc rác sinh hoạt vào bãi.
              </p>
            </div>

            {/* Equipment on site */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xs space-y-4">
              <h3 className="font-bold text-base uppercase text-gray-900">
                Thiết bị máy móc vận hành tại bãi
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {facility.equipment.map((eq, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-xl text-xs text-gray-700 border border-gray-100">
                    <span className="font-bold text-[#064D35] block mb-0.5">• Thiết bị 0{i+1}:</span>
                    <span>{eq}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Reception Procedure & Direct Registration */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-[#064D35] to-[#03271B] text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-5">
              <div className="space-y-1">
                <span className="text-xs uppercase font-extrabold text-[#B2E5C0] tracking-wider">
                  Quy trình tiếp nhận
                </span>
                <h3 className="text-xl font-bold">Quy trình cân xe & phát hành phiếu</h3>
              </div>

              <div className="space-y-3 text-xs text-emerald-100">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#B2E5C0] text-[#064D35] font-bold flex items-center justify-center shrink-0">1</span>
                  <span>Xe vào cổng, dừng đúng vị trí bàn cân điện tử 80T kiểm tra tải trọng tổng.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#B2E5C0] text-[#064D35] font-bold flex items-center justify-center shrink-0">2</span>
                  <span>Cán bộ bãi kiểm tra chất lượng phế thải và hướng dẫn xe vào bãi đổ theo phân khu.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#B2E5C0] text-[#064D35] font-bold flex items-center justify-center shrink-0">3</span>
                  <span>Xe quay lại bàn cân để cân xác định khối lượng tịnh và nhận phiếu cân điện tử.</span>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-800 space-y-3">
                <Link
                  to="/yeu-cau-bao-gia?type=dua-vao-bai"
                  className="w-full py-3.5 bg-[#B2E5C0] hover:bg-emerald-200 text-[#064D35] font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Đăng ký đưa xe vào bãi</span>
                </Link>

                <a
                  href={`tel:${companyInfo.hotline.replace(/\s/g, '')}`}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 border border-white/20"
                >
                  <Phone className="w-4 h-4 text-[#B2E5C0]" />
                  <span>Trực bãi 24/7: {companyInfo.hotline}</span>
                </a>
              </div>
            </div>

            {/* Corporate Office reminder */}
            <div className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-xs space-y-2 text-xs">
              <strong className="text-gray-900 font-bold block">Văn phòng giao dịch / Ký kết hợp đồng:</strong>
              <p className="text-gray-600">{companyInfo.officeAddress}</p>
              <p className="text-gray-500 pt-1">Giờ hành chính: Thứ 2 – Thứ 7 (08:00 – 17:30)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
