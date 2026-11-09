import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { ShieldCheck, ChevronRight, Award, FileCheck } from 'lucide-react'

export function QualityPage() {
  return (
    <div className="bg-[#FFFCF6] min-h-[80vh] py-10 lg:py-14">
      <SEO
        title="Kiểm Soát Chất Lượng & Tiêu Chuẩn Kỹ Thuật"
        description="Quy trình kiểm soát chất lượng vật liệu xây dựng và cốt liệu tái chế tại Hành Tinh Xanh. Đảm bảo an toàn kỹ thuật, bảo vệ môi trường."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-[#064D35]">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-semibold">Kiểm soát chất lượng</span>
        </nav>

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-[#064D35] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Tiêu chuẩn kỹ thuật</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase text-[#064D35] tracking-tight">
            KIỂM SOÁT CHẤT LƯỢNG & AN TOÀN MÔI TRƯỜNG
          </h1>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Hành Tinh Xanh áp dụng quy trình kiểm định chất lượng chặt chẽ cho từng lô hàng phế thải tiếp nhận và từng mẻ cốt liệu thành phẩm xuất xưởng.
          </p>
        </div>

        {/* Quality pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#064D35] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-gray-900 uppercase">Sàng tuyển tạp chất</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              100% phế liệu bê tông tháo dỡ được tách bỏ rác hữu cơ, gỗ mục và kim loại thừa bằng hệ thống băng từ trường trước khi nghiền sàng thành cốt liệu.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#064D35] flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-gray-900 uppercase">Thành phần hạt chuẩn</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Dải phân bố cỡ hạt của đá 1x2, cát bê tông và cấp phối đá dăm tuân thủ các quy định hiện hành theo TCVN đối với vật liệu nền móng đường và xây dựng.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#064D35] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-gray-900 uppercase">Minh bạch khối lượng</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Trạm cân kỹ thuật số 80 tấn kiểm định định kỳ, tự động lưu trữ và xuất phiếu cân xe chính xác đến từng kg cho từng chuyến xe vào/ra bãi.
            </p>
          </div>
        </div>

        {/* Commitment note */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-xs mb-10 space-y-4">
          <h3 className="text-lg font-bold text-[#064D35] uppercase">
            Cam kết an toàn môi trường & pháp lý
          </h3>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            Hành Tinh Xanh cam kết mọi hoạt động trung chuyển, xử lý và nghiền sàng chất thải rắn xây dựng tại bãi Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội đều có hệ thống phun sương dập bụi, rãnh thu gom nước mưa lắng đọng, đảm bảo vệ sinh môi trường khu vực dân cư xung quanh.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/co-so/bai-tap-ket-lien-mac"
              className="px-5 py-2.5 bg-[#064D35] text-white rounded-xl text-xs font-bold uppercase"
            >
              Xem bãi tập kết Liên Mạc
            </Link>
            <Link
              to="/lien-he"
              className="px-5 py-2.5 bg-gray-100 text-gray-800 rounded-xl text-xs font-bold uppercase hover:bg-gray-200"
            >
              Liên hệ bộ phận kỹ thuật
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
