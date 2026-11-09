import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react'
import { navigationItems, companyInfo } from '@/data/htxData'
import { cn } from '@/utils/cn'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }

  return (
    <header className="tc-masthead bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      {/* Top bar with contact info */}
      <div className="hidden lg:block bg-emerald-50/60 border-b border-emerald-100/60 py-1.5 text-xs text-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="font-bold text-emerald-950 uppercase tracking-wide">{companyInfo.name}</span>
            <span className="text-emerald-300">•</span>
            <span className="text-gray-600 italic">"{companyInfo.slogan}"</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${companyInfo.hotline.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 text-emerald-800 hover:text-emerald-600 font-semibold transition"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hotline: <strong>{companyInfo.hotline}</strong></span>
            </a>
            <a
              href={`mailto:${companyInfo.email}`}
              className="flex items-center gap-1.5 hover:text-emerald-600 transition"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              <span>{companyInfo.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 py-2">
            <img
              src="/images/logo.png"
              alt={companyInfo.name}
              className="h-14 sm:h-16 w-auto max-w-[280px] sm:max-w-[340px] object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0

              if (!hasChildren) {
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        'px-3.5 py-2 text-sm font-bold uppercase tracking-wider transition-colors duration-150',
                        isActive
                          ? 'text-emerald-700 border-b-2 border-emerald-600'
                          : 'text-gray-700 hover:text-emerald-600'
                      )
                    }
                  >
                    {item.title}
                  </NavLink>
                )
              }

              return (
                <div key={item.href} className="relative group">
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        'px-3.5 py-2 text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-1',
                        isActive ? 'text-emerald-700' : 'text-gray-700 group-hover:text-emerald-600'
                      )
                    }
                  >
                    <span>{item.title}</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </NavLink>

                  {/* Dropdown menu */}
                  <div className="absolute left-0 top-full pt-1 hidden group-hover:block w-72 z-50">
                    <div className="bg-white rounded-md shadow-xl border border-emerald-100 py-2 submenu-shadow">
                      {item.children?.map((sub) => (
                        <NavLink
                          key={sub.href}
                          to={sub.href}
                          className={({ isActive }) =>
                            cn(
                              'block px-4 py-2.5 text-xs font-semibold transition-colors border-l-2',
                              isActive
                                ? 'text-emerald-700 border-emerald-600 bg-emerald-50/80'
                                : 'text-gray-700 border-transparent hover:text-emerald-700 hover:bg-emerald-50/40 hover:border-emerald-600'
                            )
                          }
                        >
                          {sub.title}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </nav>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="xl:hidden p-2.5 rounded-lg text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 transition focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 shadow-2xl max-h-[80vh] overflow-y-auto px-4 py-4 space-y-2">
          {navigationItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0

            if (!hasChildren) {
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'block px-3 py-2.5 text-sm font-bold uppercase rounded-md transition',
                      isActive ? 'bg-emerald-50 text-emerald-700 font-extrabold' : 'text-gray-800 hover:bg-gray-50'
                    )
                  }
                >
                  {item.title}
                </NavLink>
              )
            }

            const isOpen = openSubmenu === item.title

            return (
              <div key={item.href} className="border-b border-gray-50 pb-1">
                <div className="flex items-center justify-between">
                  <NavLink
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex-grow px-3 py-2.5 text-sm font-bold uppercase text-gray-800 hover:text-emerald-700"
                  >
                    {item.title}
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => toggleSubmenu(item.title)}
                    className="p-2 text-gray-500 hover:text-emerald-700"
                    aria-label={`Toggle ${item.title}`}
                  >
                    <ChevronDown
                      className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')}
                    />
                  </button>
                </div>

                {isOpen && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-emerald-50/40 rounded-lg my-1">
                    {item.children?.map((sub) => (
                      <NavLink
                        key={sub.href}
                        to={sub.href}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            'block px-3 py-2 text-xs font-semibold rounded transition',
                            isActive ? 'text-emerald-800 font-bold bg-white shadow-xs' : 'text-gray-600 hover:text-emerald-700'
                          )
                        }
                      >
                        {sub.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          {/* Quick contact on mobile */}
          <div className="pt-4 mt-4 border-t border-gray-100 flex flex-col gap-2 text-sm text-gray-700">
            <a
              href={`tel:${companyInfo.hotline.replace(/\s/g, '')}`}
              className="flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-md tracking-wider uppercase text-xs"
            >
              <Phone className="w-4 h-4" />
              <span>Hotline 24/7: {companyInfo.hotline}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
