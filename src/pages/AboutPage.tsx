import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { companyInfo } from '@/data/htxData'
import { ShieldCheck, Sprout, Target, Eye, Award, ChevronRight } from 'lucide-react'

export function AboutPage() {
  return (
    <div className="bg-[#FFFCF6] min-h-[80vh] py-10 lg:py-14">
      <SEO
        title="Giới Thiệu Doanh Nghiệp – Hành Tinh Xanh"
        description="Tổng quan Công ty TNHH TM&DV Giải Pháp Hành Tinh Xanh. Trụ sở Tầng 4 Grandeur Palace 138 Giảng Võ. Bãi tập kết Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội. Slogan: Cho hành tinh nhẹ gánh hơn."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-[#064D35]">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-semibold">Giới thiệu</span>
        </nav>

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-[#064D35] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            <Sprout className="w-3.5 h-3.5" />
            <span>Về chúng tôi</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase text-[#064D35] tracking-tight">
            {companyInfo.name}
          </h1>
          <p className="mt-3 text-base text-emerald-800 font-semibold italic">
            "{companyInfo.slogan}"
          </p>
          <p className="mt-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
            Thành lập với sứ mệnh giải quyết bài toán phế thải xây dựng đô thị, Hành Tinh Xanh hướng tới mô hình kinh tế tuần hoàn: biến chất thải rắn xây dựng thành nguồn cốt liệu tái sinh có giá trị, giảm thiểu áp lực khai thác tài nguyên tự nhiên và bảo vệ môi trường Thủ đô.
          </p>
        </div>

        {/* Brand identity story card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-xs mb-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 max-w-[240px]">
              <img
                src="/brand/logo-glass.png"
                alt="Logo Hành Tinh Xanh"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
          <div className="md:col-span-8 space-y-3">
            <span className="text-xs uppercase font-extrabold text-[#064D35] tracking-wider">
              Ý nghĩa biểu trưng nhận diện
            </span>
            <h2 className="text-xl font-bold text-gray-900">
              Khối cầu xanh nguyên khối & Quỹ đạo elip tuần hoàn
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Biểu trưng của Hành Tinh Xanh khắc họa một tinh cầu xanh thuần khiết được ôm trọn bởi quỹ đạo elip chuyển động không ngừng. Quỹ đạo này tượng trưng cho vòng tuần hoàn sinh thái vĩnh cửu: nơi mà chất thải từ công trình cũ được tái sinh thành vật liệu cho công trình mới, để Trái Đất luôn nhẹ gánh và phát triển bền vững.
            </p>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#064D35] flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#064D35] uppercase">Tầm nhìn chiến lược</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Trở thành thương hiệu dẫn đầu tại khu vực phía Bắc trong lĩnh vực thu gom, trung chuyển và tái chế chất thải rắn xây dựng (CTRXD) theo các tiêu chuẩn công nghệ cao và kinh tế tuần hoàn tiên tiến.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#064D35] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#064D35] uppercase">Sứ mệnh cốt lõi</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Đồng hành cùng chủ đầu tư, tổng thầu và cơ quan quản lý đô thị trong việc thu dọn sạch sẽ, hợp pháp và minh bạch 100% phế thải công trình; cung cấp nguồn vật liệu cát đá tái chế đạt chuẩn chất lượng cho hạ tầng giao thông và dân dụng.
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-xs mb-10 space-y-6">
          <h3 className="text-lg font-bold text-gray-900 uppercase text-center">
            Cam kết hoạt động của Hành Tinh Xanh
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2 text-center p-4 bg-gray-50 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-[#064D35] mx-auto" />
              <h4 className="font-bold text-sm text-gray-900">Pháp lý minh bạch</h4>
              <p className="text-xs text-gray-600">Cơ sở bãi tập kết và quy trình tiếp nhận phế thải tuân thủ tuyệt đối quy định bảo vệ môi trường.</p>
            </div>
            <div className="space-y-2 text-center p-4 bg-gray-50 rounded-2xl">
              <Award className="w-8 h-8 text-[#064D35] mx-auto" />
              <h4 className="font-bold text-sm text-gray-900">Chính xác & Trung thực</h4>
              <p className="text-xs text-gray-600">Tiếp nhận và tập kết tại bãi chính quy được cấp phép của công ty, lập biên bản giao nhận rõ ràng, minh bạch.</p>
            </div>
            <div className="space-y-2 text-center p-4 bg-gray-50 rounded-2xl">
              <Sprout className="w-8 h-8 text-[#064D35] mx-auto" />
              <h4 className="font-bold text-sm text-gray-900">Vì môi trường xanh</h4>
              <p className="text-xs text-gray-600">Cam kết không đổ trộm, không gây rơi vãi bụi bẩn trên các tuyến đường vận tải.</p>
            </div>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#064D35] to-[#03271B] text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold">Quý khách cần tư vấn hoặc báo giá trực tiếp?</h4>
            <p className="text-xs text-[#B2E5C0]">Hotline tiếp nhận 24/7: {companyInfo.hotline}</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/yeu-cau-bao-gia"
              className="px-5 py-2.5 bg-[#B2E5C0] hover:bg-emerald-200 text-[#064D35] font-bold text-xs uppercase rounded-xl transition shadow-xs"
            >
              Yêu cầu báo giá
            </Link>
            <Link
              to="/lien-he"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase rounded-xl transition border border-white/20"
            >
              Xem thông tin liên hệ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
