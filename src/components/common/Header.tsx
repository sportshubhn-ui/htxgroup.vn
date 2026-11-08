import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, PhoneCall, Sprout } from 'lucide-react'
import { mainNavigation } from '@/config/navigation'
import { siteConfig } from '@/config/site.config'
import { Button } from '@/components/ui/Button'
import { useScroll } from '@/hooks/useScroll'
import { cn } from '@/utils/cn'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isScrolled = useScroll(20)

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
          : 'bg-white py-4 border-b border-gray-100'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-emerald-700 transition">
                {siteConfig.name}
              </span>
              <span className="hidden sm:block text-[10px] uppercase font-semibold text-emerald-600 tracking-wider">
                Hợp Tác Xã Việt Nam
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {mainNavigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'text-emerald-700 bg-emerald-50/80 font-semibold'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                  )
                }
              >
                {item.title}
              </NavLink>
            ))}
          </nav>

          {/* Action button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${siteConfig.contact.hotline.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-emerald-600 transition px-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>{siteConfig.contact.hotline}</span>
            </a>
            <Link to="/lien-he">
              <Button size="sm" variant="primary">
                Tư vấn ngay
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-gray-100 pb-4 space-y-1">
            {mainNavigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'block px-3 py-2.5 rounded-md text-base font-medium',
                    isActive
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
                  )
                }
              >
                {item.title}
              </NavLink>
            ))}
            <div className="pt-3 border-t border-gray-100 px-3">
              <Link to="/lien-he" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Tư vấn ngay</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
