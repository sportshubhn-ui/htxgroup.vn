import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { Newspaper, ChevronRight } from 'lucide-react'

export function PressPage() {
  return (
    <div className="bg-[#FFFCF6] min-h-[80vh] py-10 lg:py-14">
      <SEO
        title="Báo Chí & Truyền Thông – Hành Tinh Xanh"
        description="Tổng hợp các bài viết, phóng sự và đưa tin chính thống về hoạt động tái chế chất thải rắn xây dựng và kinh tế tuần hoàn của Hành Tinh Xanh."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-[#064D35]">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-semibold">Báo chí</span>
        </nav>

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-[#064D35] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Báo chí & Truyền thông</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase text-[#064D35] tracking-tight">
            GÓC NHÌN BÁO CHÍ
          </h1>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Mục tổng hợp các bài báo, phóng sự phản ánh về thực trạng quản lý chất thải rắn xây dựng tại Hà Nội và giải pháp tái chế theo kinh tế tuần hoàn.
          </p>
        </div>

        {/* Honest Notice per MASTER_BRIEF Section 2 */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-900/10 shadow-xs text-center space-y-4">
          <div className="w-14 h-14 bg-emerald-50 text-[#064D35] rounded-full flex items-center justify-center mx-auto">
            <Newspaper className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Nội dung báo chí đang được thẩm định nguồn
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
            Hành Tinh Xanh tuân thủ nguyên tắc trung thực và minh bạch: chỉ dẫn nguồn các phóng sự, bài báo có đường dẫn chính thức và được cơ quan báo chí cho phép trích dẫn. Các bài viết truyền thông đang được cập nhật và liên kết xác thực.
          </p>
          <div className="pt-2">
            <Link
              to="/tin-tuc"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#064D35] hover:bg-[#043826] text-white rounded-xl text-xs font-bold uppercase transition"
            >
              <span>Xem chuyên mục tin tức ngành</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
