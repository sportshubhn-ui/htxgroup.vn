import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { companyInfo } from '@/data/htxData'
import {
  FileText,
  Download,
  ShieldCheck,
  Warehouse,
  Wrench,
  ChevronRight,
  AlertCircle
} from 'lucide-react'

export function CapabilityPage() {
  return (
    <div className="bg-[#FFFCF6] min-h-[80vh] py-10 lg:py-14">
      <SEO
        title="Hồ Sơ Năng Lực & Năng Lực Thực Thi – Hành Tinh Xanh"
        description="Tổng quan năng lực cơ sở bãi tập kết Ngõ 46 Liên Mạc Thượng Cát Tây Hồ, dây chuyền nghiền sàng tái chế, đội xe ben và hồ sơ pháp nhân Hành Tinh Xanh."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-[#064D35]">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-semibold">Hồ sơ năng lực</span>
        </nav>

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-[#064D35] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Năng lực thực thi</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase text-[#064D35] tracking-tight">
            HỒ SƠ NĂNG LỰC DOANH NGHIỆP
          </h1>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Hành Tinh Xanh sở hữu nền tảng cơ sở bãi tập kết hợp pháp, dây chuyền thiết bị cơ giới đồng bộ và quy trình kiểm soát khối lượng minh bạch bằng trạm cân điện tử tự động.
          </p>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Facility card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#064D35]">
              <Warehouse className="w-6 h-6" />
              <h3 className="font-bold text-base uppercase">Cơ sở bãi tập kết & xử lý</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Bãi tiếp nhận tại <strong>Ngõ 46 Liên Mạc, Phường Thượng Cát, Quận Tây Hồ, Hà Nội</strong>. Mặt bằng rộng rãi, trạm cân điện tử 80T, tiếp nhận phương tiện 24/7 không gây ùn tắc giao thông.
            </p>
            <div className="pt-2">
              <Link
                to="/co-so/bai-tap-ket-lien-mac"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#064D35] hover:underline"
              >
                <span>Xem chi tiết & Bản đồ bãi Liên Mạc</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Machinery card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#064D35]">
              <Wrench className="w-6 h-6" />
              <h3 className="font-bold text-base uppercase">Thiết bị cơ giới & Đội xe</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Đồng bộ dây chuyền nghiền kẹp hàm, máy sàng rung phân tầng 3 lớp, máy xúc bánh xích gầu kẹp và đội xe tải ben 3 chân, 4 chân phủ bạt kín chống bụi.
            </p>
            <div className="pt-2">
              <Link
                to="/thiet-bi"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#064D35] hover:underline"
              >
                <span>Xem danh sách thiết bị & Đội xe</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Profile Document Download Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-xs mb-10 space-y-6">
          <div className="flex items-center gap-2 text-[#064D35]">
            <FileText className="w-6 h-6" />
            <h3 className="font-bold text-lg uppercase">Tài liệu hồ sơ năng lực chính thức</h3>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Hồ sơ năng lực (Profile) bản chuẩn bị cho công tác đấu thầu và hợp tác doanh nghiệp bao gồm: Giới thiệu pháp nhân, năng lực tài chính, danh mục thiết bị, quy trình tiếp nhận xử lý phế thải và danh mục vật liệu cung ứng.
          </p>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <strong className="text-sm font-bold text-gray-900 block">
                Profile Doanh Nghiệp Hành Tinh Xanh (Green Planet) 2026
              </strong>
              <span className="text-xs text-gray-500">
                Định dạng: PDF • Bản tóm tắt giới thiệu năng lực doanh nghiệp
              </span>
            </div>

            <a
              href={`tel:${companyInfo.hotline.replace(/\s/g, '')}`}
              className="px-5 py-2.5 bg-[#064D35] hover:bg-[#043826] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4 text-[#B2E5C0]" />
              <span>Yêu cầu gửi hồ sơ qua Zalo / Email</span>
            </a>
          </div>

          <div className="flex items-start gap-2 text-[11px] text-gray-500 bg-amber-50 p-3 rounded-xl border border-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Để đảm bảo bảo mật thông tin dự án, file hồ sơ bản đầy đủ (kèm báo cáo tài chính và giấy phép) sẽ được gửi trực tiếp cho đối tác và chủ đầu tư có nhu cầu thực tế.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
