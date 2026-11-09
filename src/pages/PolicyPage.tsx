import { Link, useLocation } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { companyInfo } from '@/data/htxData'
import { Shield, FileCheck, ChevronRight, AlertCircle } from 'lucide-react'

export function PolicyPage() {
  const location = useLocation()
  const isPrivacy = location.pathname.includes('chinh-sach-bao-mat')

  return (
    <div className="bg-[#FFFCF6] min-h-[80vh] py-10 lg:py-14">
      <SEO
        title={isPrivacy ? 'Chính Sách Bảo Mật Thông Tin' : 'Điều Kiện Giao Dịch & Quy Định Bãi Đổ'}
        description={`Văn bản quy định của Công ty TNHH TM&DV Giải Pháp Hành Tinh Xanh.`}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-[#064D35]">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-semibold">
            {isPrivacy ? 'Chính sách bảo mật' : 'Điều kiện giao dịch'}
          </span>
        </nav>

        {/* Heading */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-[#064D35] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            {isPrivacy ? <Shield className="w-3.5 h-3.5" /> : <FileCheck className="w-3.5 h-3.5" />}
            <span>Văn bản pháp lý</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#064D35]">
            {isPrivacy ? 'CHÍNH SÁCH BẢO MẬT THÔNG TIN KHÁCH HÀNG' : 'ĐIỀU KIỆN TIẾP NHẬN & GIAO DỊCH DỊCH VỤ'}
          </h1>
          <p className="mt-2 text-xs text-gray-500">
            Áp dụng cho khách hàng, đối tác giao dịch với {companyInfo.name} qua website htxgroup.vn
          </p>
        </div>

        {/* Draft Notice per MASTER_BRIEF */}
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Bản dự thảo đang hoàn thiện:</span> Nội dung chính sách đang được bộ phận pháp chế của Hành Tinh Xanh rà soát và chuẩn hóa theo quy chuẩn pháp luật hiện hành trước ngày công bố chính thức.
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-xs space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
          {isPrivacy ? (
            <>
              <section className="space-y-2">
                <h3 className="font-bold text-gray-900 text-sm uppercase">1. Mục đích thu thập thông tin</h3>
                <p>
                  Hành Tinh Xanh chỉ thu thập các thông tin tối thiểu cần thiết để phục vụ công tác liên hệ, khảo sát khối lượng thực tế, lập phương án vận chuyển và gửi bảng báo giá theo yêu cầu của Quý khách.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-gray-900 text-sm uppercase">2. Phạm vi sử dụng thông tin</h3>
                <p>
                  Thông tin thu thập từ các biểu mẫu "Yêu cầu báo giá" hoặc "Liên hệ" được sử dụng nội bộ để:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Điều phối nhân viên liên hệ xác nhận tọa độ công trình và thời gian đón xe.</li>
                  <li>Phát hành phiếu cân điện tử và đối soát khối lượng.</li>
                  <li>Gửi hợp đồng nguyên tắc hoặc biên bản bàn giao - xử lý chất thải rắn xây dựng.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-gray-900 text-sm uppercase">3. Cam kết không chia sẻ dữ liệu</h3>
                <p>
                  Chúng tôi tuyệt đối không bán, cho thuê hoặc chuyển nhượng thông tin liên hệ của Quý khách cho bất kỳ bên thứ ba nào vì mục đích quảng cáo không mong muốn.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-2">
                <h3 className="font-bold text-gray-900 text-sm uppercase">1. Quy định về chủng loại phế thải đưa vào bãi</h3>
                <p>
                  Bãi tập kết tại Ngõ 46 Liên Mạc, Phường Thượng Cát, Quận Tây Hồ chỉ tiếp nhận chất thải rắn xây dựng thông thường (bê tông, trạc gạch vữa, đất đào sạch). Tuyệt đối không tiếp nhận chất thải nguy hại, bùn độc hại hoặc rác sinh hoạt.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-gray-900 text-sm uppercase">2. Quy định về phương tiện vận tải</h3>
                <p>
                  Phương tiện lưu thông vào bãi phải chấp hành Luật Giao thông đường bộ, có bạt phủ cơ học che kín thành thùng, đảm bảo vệ sinh và không rơi vãi trên tuyến đường vận chuyển. Lái xe tuân thủ hướng dẫn của cán bộ điều phối trạm cân.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-gray-900 text-sm uppercase">3. Nghiệm thu khối lượng & Thanh toán</h3>
                <p>
                  Khối lượng giao dịch căn cứ theo phiếu cân điện tử 80T in tự động tại bãi. Các điều khoản thanh toán, xuất hóa đơn VAT được thực hiện theo hợp đồng cung ứng dịch vụ đã ký kết giữa hai bên.
                </p>
              </section>
            </>
          )}

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-gray-500 text-xs">Mọi thắc mắc xin liên hệ Hotline:</span>
            <span className="font-bold text-[#064D35]">{companyInfo.hotline}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
