import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Globe, ArrowRight, ShieldCheck, Sprout } from 'lucide-react'
import { companyInfo } from '@/data/htxData'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="ht-colophon" className="bg-[#03271B] text-[#B2E5C0]/85 pt-14 pb-8 border-t-4 border-[#064D35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Company Profile & Logo */}
          <div className="space-y-4">
            <div className="bg-white/95 rounded-xl p-3 inline-block shadow-lg max-w-[260px]">
              <img
                src="/brand/logo-glass.png"
                alt={companyInfo.name}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-xs uppercase font-extrabold text-[#B2E5C0] tracking-wider">
              {companyInfo.name}
            </p>
            <p className="text-xs text-white/90 italic font-medium">
              "{companyInfo.slogan}"
            </p>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Giải pháp thu gom, vận chuyển, tiếp nhận và tái chế chất thải rắn xây dựng (CTRXD), kết nối nguồn vật liệu với nhu cầu công trình thủ đô.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/80 border border-emerald-800 rounded-md text-xs text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-[#B2E5C0] shrink-0" />
              <span>Tiên phong kinh tế tuần hoàn chất thải xây dựng</span>
            </div>
          </div>

          {/* Column 2: Head Office & Disposal Yard */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-emerald-800/80 pb-2">
              Trụ sở & Bãi tập kết
            </h4>
            <div className="space-y-4 text-xs text-emerald-100/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B2E5C0] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Trụ sở văn phòng:</strong>
                  <span>{companyInfo.officeAddress}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Sprout className="w-4 h-4 text-[#B2E5C0] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Bãi tập kết & Xử lý CTRXD:</strong>
                  <span className="text-[#B2E5C0] font-semibold">{companyInfo.yardAddress}</span>
                  <p className="text-[11px] text-emerald-300/70 mt-1">Bãi chính quy được cấp phép • Tiếp nhận xe 24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Contact & Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-emerald-800/80 pb-2">
              Thông tin liên hệ
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/90">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B2E5C0] shrink-0" />
                <span>Hotline 24/7: <strong className="text-white text-sm">{companyInfo.hotline}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B2E5C0] shrink-0" />
                <span>{companyInfo.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#B2E5C0] shrink-0" />
                <span>https://htxgroup.vn</span>
              </li>
            </ul>

            <h5 className="text-xs font-bold uppercase tracking-wider text-white pt-3 border-t border-emerald-800/60">
              Dịch vụ & Vật liệu
            </h5>
            <ul className="space-y-1.5 text-xs text-emerald-200/80">
              <li>
                <Link to="/dich-vu/thu-gom" className="hover:text-white transition flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-[#B2E5C0]" />
                  <span>Thu gom phế thải công trình</span>
                </Link>
              </li>
              <li>
                <Link to="/dich-vu/tiep-nhan-tap-ket" className="hover:text-white transition flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-[#B2E5C0]" />
                  <span>Tiếp nhận đổ thải bãi Liên Mạc</span>
                </Link>
              </li>
              <li>
                <Link to="/vat-lieu/cot-lieu-tai-che" className="hover:text-white transition flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-[#B2E5C0]" />
                  <span>Cốt liệu bê tông tái chế (RCA)</span>
                </Link>
              </li>
              <li>
                <Link to="/vat-lieu" className="hover:text-white transition flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-[#B2E5C0]" />
                  <span>Catalog cát đá xây dựng</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Environmental Commitment & Location Notice */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-emerald-800/80 pb-2">
              Bãi tiếp nhận Liên Mạc
            </h4>
            <div className="bg-emerald-950/70 rounded-xl p-3.5 text-xs border border-emerald-800/60 space-y-2">
              <p className="font-semibold text-white">Điểm tập kết Thượng Cát - Hà Nội:</p>
              <p className="text-emerald-200/80 leading-relaxed text-[11px]">
                Tiếp nhận và tập kết tại bãi chính quy được cấp phép của công ty từ các công trình phá dỡ và cải tạo đô thị. Cấp biên bản giao nhận và nghiệm thu minh bạch.
              </p>
              <div className="pt-1 flex flex-col gap-2">
                <Link
                  to="/co-so/bai-tap-ket-lien-mac"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#064D35] hover:bg-emerald-700 text-white rounded-lg font-semibold transition text-xs"
                >
                  <span>Xem chỉ đường vào bãi</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B2E5C0]" />
                </Link>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-emerald-400/60 leading-tight">
              Pháp nhân: {companyInfo.name} • Trụ sở: Tầng 4 Grandeur Palace 138 Giảng Võ • Hotline: 0707 155 666.
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400/80 gap-4">
          <p>© {currentYear} {companyInfo.name}. Bảo lưu mọi quyền.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/chinh-sach-bao-mat" className="hover:text-white transition">Chính sách bảo mật</Link>
            <Link to="/dieu-kien-giao-dich" className="hover:text-white transition">Điều kiện giao dịch</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
