import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { Recycle, ChevronRight, ArrowRight } from 'lucide-react'

export function TechnologyPage() {
  const processSteps = [
    {
      step: '01',
      title: 'Tiếp nhận & Kiểm tra phân loại đầu vào',
      desc: 'Phương tiện chở bê tông tháo dỡ và trạc thải qua trạm cân 80T tại bãi Liên Mạc (Tây Hồ). Cán bộ kỹ thuật kiểm tra và loại bỏ rác thải sinh hoạt, gỗ mục trước khi tập kết.',
      icon: 'Scale'
    },
    {
      step: '02',
      title: 'Đập thô & Tách sắt thép bằng máy xúc gầu kẹp',
      desc: 'Máy xúc gắn búa thủy lực đập vỡ các khối dầm sàn bê tông quá khổ thành kích thước dưới 600mm. Gầu kẹp thủy lực phân tách các thanh sắt thép xây dựng tái chế riêng.',
      icon: 'Hammer'
    },
    {
      step: '03',
      title: 'Nghiền đập thứ cấp bằng máy nghiền kẹp hàm',
      desc: 'Phế liệu bê tông được cấp liên tục vào buồng nghiền kẹp hàm chịu mài mòn cao, phá vỡ cấu trúc đá vữa thành các mảnh cốt liệu nhỏ theo khe xả điều chỉnh.',
      icon: 'Cog'
    },
    {
      step: '04',
      title: 'Băng tải từ tính hút sạch kim loại thừa',
      desc: 'Băng chuyền từ tính siêu mạnh hút toàn bộ mạt sắt, đinh ốc, sợi thép văng còn sót lại trong dòng cốt liệu, đảm bảo sản phẩm đầu ra đạt độ tinh khiết tối đa.',
      icon: 'Magnet'
    },
    {
      step: '05',
      title: 'Sàng rung phân cấp đa tầng (Screening)',
      desc: 'Dây chuyền máy sàng 3 tầng lưới phân tách dòng hạt thành: Mạt đá nghiền (0-5mm), Cốt liệu dăm (10-25mm) và Cấp phối đá dăm tái chế (RCA).',
      icon: 'Layers'
    },
    {
      step: '06',
      title: 'Thử nghiệm chất lượng & Bàn giao công trình',
      desc: 'Lấy mẫu kiểm tra thành phần hạt, độ hao mòn va đập và hệ số đầm nén trước khi xuất kho cho các dự án giao thông, tôn nền công trình xanh.',
      icon: 'Check'
    }
  ]

  return (
    <div className="bg-[#FFFCF6] min-h-[80vh] py-10 lg:py-14">
      <SEO
        title="Công Nghệ Tái Chế CTRXD – Giải Pháp Tuần Hoàn Xanh"
        description="Quy trình công nghệ nghiền sàng tái chế bê tông và chất thải rắn xây dựng khép kín tại bãi Ngõ 46 Liên Mạc, Thượng Cát, Tây Hồ. Tiết kiệm tài nguyên và bảo vệ môi trường."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-[#064D35]">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/nang-luc" className="hover:text-[#064D35]">Năng lực</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-semibold">Công nghệ tái chế</span>
        </nav>

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-[#064D35] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            <Recycle className="w-3.5 h-3.5" />
            <span>Kinh tế tuần hoàn</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase text-[#064D35] tracking-tight">
            QUY TRÌNH CÔNG NGHỆ XỬ LÝ & TÁI CHẾ
          </h1>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Mô hình xử lý khép kín biến phế thải bê tông công trình thành nguồn cốt liệu xây dựng đạt chuẩn kỹ thuật, thay thế nguồn đá tự nhiên và giải quyết triệt để vấn đề đổ thải bừa bãi.
          </p>
        </div>

        {/* Visual Workflow Steps */}
        <div className="space-y-6 mb-12">
          {processSteps.map((s, index) => (
            <div
              key={s.step}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-900/10 shadow-xs flex flex-col md:flex-row items-start md:items-center gap-6 group hover:border-[#064D35] transition"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#064D35] to-[#043826] text-[#B2E5C0] font-black text-xl flex items-center justify-center shrink-0 shadow-md">
                {s.step}
              </div>

              <div className="flex-1 space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#064D35] transition">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              {index < processSteps.length - 1 && (
                <div className="hidden md:block text-emerald-300">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-8 bg-gradient-to-r from-[#064D35] to-[#03271B] text-white rounded-3xl text-center space-y-4 shadow-md">
          <h3 className="text-xl font-bold uppercase tracking-wide">
            Đồng hành cùng Hành Tinh Xanh kiến tạo công trình xanh
          </h3>
          <p className="text-xs sm:text-sm text-[#B2E5C0] max-w-xl mx-auto">
            Sử dụng cốt liệu tái chế (RCA) giúp doanh nghiệp đạt chứng chỉ công trình xanh (LOTUS, LEED) và tối ưu 20-30% chi phí so với vật liệu khai thác tự nhiên.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              to="/vat-lieu/cot-lieu-tai-che"
              className="px-6 py-3 bg-[#B2E5C0] hover:bg-emerald-200 text-[#064D35] font-bold text-xs uppercase tracking-wider rounded-xl transition"
            >
              Xem mẫu cốt liệu RCA
            </Link>
            <Link
              to="/yeu-cau-bao-gia"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition border border-white/20"
            >
              Yêu cầu báo giá
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
