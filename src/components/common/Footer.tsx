import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Globe, ArrowRight, ShieldCheck, Sprout } from 'lucide-react'
import { companyInfo, coreServices } from '@/data/htxData'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="ht-colophon" className="bg-[#092317] text-emerald-100/80 pt-14 pb-8 border-t-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Company Profile & Logo */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-3 inline-block shadow-lg max-w-[260px]">
              <img src="/images/logo.png" alt={companyInfo.name} className="h-12 w-auto object-contain" />
            </div>
            <p className="text-xs uppercase font-extrabold text-emerald-400 tracking-wider">
              {companyInfo.name}
            </p>
            <p className="text-xs text-emerald-200/90 italic font-medium">
              "{companyInfo.slogan}"
            </p>
            <p className="text-xs text-emerald-300/70 leading-relaxed">
              Tên tiếng Anh: {companyInfo.englishName} ({companyInfo.abbreviation}).
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900/60 border border-emerald-700/60 rounded-md text-xs text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Tiên phong công nghệ xử lý tái chế CTRXD</span>
            </div>
          </div>

          {/* Column 2: Head Office & Disposal Yard */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-emerald-800/80 pb-2">
              Trụ sở & Bãi tập kết
            </h4>
            <div className="space-y-4 text-xs text-emerald-100/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Trụ sở chính:</strong>
                  <span>{companyInfo.officeAddress}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Sprout className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Bãi tập kết & xử lý CTRXD:</strong>
                  <span className="text-emerald-200 font-medium">{companyInfo.yardAddress}</span>
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
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hotline tư vấn: <strong className="text-white text-sm">{companyInfo.hotline}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{companyInfo.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>https://htxgroup.vn</span>
              </li>
            </ul>

            <h5 className="text-xs font-bold uppercase tracking-wider text-white pt-3 border-t border-emerald-800/60">
              Lĩnh vực hoạt động
            </h5>
            <ul className="space-y-1.5 text-xs text-emerald-300/80">
              {coreServices.map((s) => (
                <li key={s.id}>
                  <Link to={s.href} className="hover:text-emerald-300 transition flex items-center gap-1">
                    <ArrowRight className="w-3 h-3 text-emerald-400" />
                    <span className="truncate">{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social & Environmental Notice */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-emerald-800/80 pb-2">
              Bảo vệ môi trường
            </h4>
            <div className="bg-emerald-950/80 rounded-lg p-3 text-xs border border-emerald-800/60 space-y-2">
              <p className="font-semibold text-white">Điểm tập kết Thượng Cát:</p>
              <p className="text-emerald-200/80 leading-relaxed text-[11px]">
                Tiếp nhận chất thải rắn xây dựng (CTRXD) từ các công trình phá dỡ, nâng cấp hạ tầng đô thị. Cam kết không đổ trộm, xử lý quy chuẩn 100%.
              </p>
              <Link
                to="/lien-he"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-semibold transition text-xs"
              >
                <span>Đăng ký bãi đổ CTRXD</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="pt-2 text-[10px] text-emerald-400/60 leading-tight">
              Thu gom phế thải xây dựng • Tái chế rác thải rắn • Bãi tập kết CTRXD Thượng Cát • San lấp mặt bằng • Cát san lấp tái chế • Đá cấp phối nghiền.
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400/80 gap-4">
          <p>© {currentYear} {companyInfo.name}. Bản quyền thuộc về Hành Tinh Xanh.</p>
          <div className="flex gap-4">
            <Link to="/gioi-thieu/thong-tin-chung" className="hover:text-white transition">Hồ sơ pháp lý</Link>
            <Link to="/lien-he" className="hover:text-white transition">Liên hệ & Báo giá</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
