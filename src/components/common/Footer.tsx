import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Globe, ArrowRight, ShieldCheck } from 'lucide-react'
import { companyInfo, coreServices } from '@/data/htxData'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="ht-colophon" className="bg-[#22252a] text-gray-300 pt-14 pb-8 border-t-4 border-[#1c84cd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="bg-white/95 rounded-lg p-2.5 inline-block shadow-sm">
              <img src="/images/logo.svg" alt={companyInfo.name} className="h-8 w-auto max-w-[200px]" />
            </div>
            <p className="text-xs uppercase font-bold text-[#1c84cd] tracking-wider">
              {companyInfo.name}
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Tên tiếng Anh: {companyInfo.englishName} ({companyInfo.abbreviation}).
            </p>
            <p className="text-xs text-gray-400">
              <strong>Mã số thuế:</strong> {companyInfo.taxCode}
            </p>
            <p className="text-xs text-gray-400">
              ĐKKD cấp ngày {companyInfo.licenseDate}.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-950/70 border border-blue-800/60 rounded text-xs text-blue-200">
              <ShieldCheck className="w-4 h-4 text-[#1c84cd]" />
              <span>Tiên phong công nghệ xử lý CTRXD</span>
            </div>
          </div>

          {/* Column 2: Head Office & Yard */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-gray-700 pb-2">
              Trụ sở & Điểm tiếp nhận
            </h4>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#1c84cd] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Văn phòng chính:</strong>
                  <span>{companyInfo.officeAddress}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#1c84cd] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Bãi tiếp nhận & xử lý (6.5 ha):</strong>
                  <span>{companyInfo.yardAddress}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Contact & Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-gray-700 pb-2">
              Thông tin liên hệ
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#1c84cd] shrink-0" />
                <span>Hotline: <strong className="text-white">{companyInfo.hotline}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#1c84cd] shrink-0" />
                <span>Kỹ thuật: {companyInfo.phoneAlt}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#1c84cd] shrink-0" />
                <span>{companyInfo.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#1c84cd] shrink-0" />
                <span>https://htxgroup.vn</span>
              </li>
            </ul>

            <h5 className="text-xs font-bold uppercase tracking-wider text-white pt-2 border-t border-gray-800">
              Lĩnh vực hoạt động
            </h5>
            <ul className="space-y-1.5 text-xs text-gray-400">
              {coreServices.map((s) => (
                <li key={s.id}>
                  <Link to={s.href} className="hover:text-[#1c84cd] transition flex items-center gap-1">
                    <ArrowRight className="w-3 h-3 text-[#1c84cd]" />
                    <span className="truncate">{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Facebook Connect & SEO Keywords */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-gray-700 pb-2">
              Kết nối với chúng tôi
            </h4>
            <div className="bg-gray-800/80 rounded-lg p-3 text-xs border border-gray-700">
              <p className="font-semibold text-white mb-2">Fanpage Facebook chính thức:</p>
              <a
                href={companyInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1877f2] hover:bg-[#166fe5] text-white rounded font-medium transition text-xs"
              >
                <span>Xem trên Facebook</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Micro SEO Keywords as in original site */}
            <div className="pt-2 text-[10px] text-gray-500 leading-tight">
              Rác thải..rác thải rắn..rác thải rắn xây dựng..phế liệu xây dựng..xử lý rác thải rắn..tái chế rác thải rắn..tận thu rác thải rắn..sản phẩm từ rác thải rắn..Phế thải xây dựng, phế thải rắn xây dựng, bãi rác thải xây dựng.
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {currentYear} {companyInfo.name}. Bản quyền thuộc về HTX GROUP.</p>
          <div className="flex gap-4">
            <Link to="/gioi-thieu/thong-tin-chung" className="hover:text-white transition">Hồ sơ pháp lý</Link>
            <Link to="/lien-he" className="hover:text-white transition">Hỗ trợ khách hàng</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
