import { Link } from 'react-router-dom'
import { Sprout, Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import { mainNavigation } from '@/config/navigation'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Liên kết nhanh
            </h4>
            <ul className="space-y-2.5 text-sm">
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="hover:text-emerald-400 transition flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Fields */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Lĩnh vực hoạt động
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Nông nghiệp công nghệ cao</li>
              <li>Chuỗi cung ứng & tiêu thụ nông sản</li>
              <li>Chuyển đổi số quản lý HTX</li>
              <li>Đầu tư & Hỗ trợ vốn liên kết</li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Thông tin liên hệ
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{siteConfig.contact.hotline}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{siteConfig.contact.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} {siteConfig.name}. Bảo lưu mọi quyền.</p>
          <div className="flex space-x-6 text-xs">
            <span className="hover:text-slate-400 cursor-pointer">Chính sách bảo mật</span>
            <span className="hover:text-slate-400 cursor-pointer">Điều khoản dịch vụ</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
