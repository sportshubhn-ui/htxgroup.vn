import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react'
import { navigationItems, companyInfo } from '@/data/tcgroupData'
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
      <div className="hidden lg:block bg-gray-50 border-b border-gray-100 py-1.5 text-xs text-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="font-semibold text-gray-800">{companyInfo.name}</span>
            <span>•</span>
            <span>MST: {companyInfo.taxCode}</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${companyInfo.hotline.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 hover:text-[#1c84cd] transition"
            >
              <Phone className="w-3.5 h-3.5 text-[#1c84cd]" />
              <span>Hotline: <strong>{companyInfo.hotline}</strong></span>
            </a>
            <a
              href={`mailto:${companyInfo.email}`}
              className="flex items-center gap-1.5 hover:text-[#1c84cd] transition"
            >
              <Mail className="w-3.5 h-3.5 text-[#1c84cd]" />
              <span>{companyInfo.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 py-2">
            <img
              src="/images/logo.svg"
              alt={companyInfo.name}
              className="h-12 w-auto max-w-[260px] object-contain"
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
                        'px-3 py-2 text-sm font-semibold uppercase tracking-wider transition-colors duration-150',
                        isActive
                          ? 'text-[#1c84cd] border-b-2 border-[#1c84cd]'
                          : 'text-gray-700 hover:text-[#1c84cd]'
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
                        'px-3 py-2 text-sm font-semibold uppercase tracking-wider transition-colors flex items-center gap-1',
                        isActive ? 'text-[#1c84cd]' : 'text-gray-700 group-hover:text-[#1c84cd]'
                      )
                    }
                  >
                    <span>{item.title}</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </NavLink>

                  {/* Dropdown menu */}
                  <div className="absolute left-0 top-full pt-1 hidden group-hover:block w-64 z-50">
                    <div className="bg-white rounded-md shadow-lg border border-gray-100 py-2 submenu-shadow">
                      {item.children?.map((sub) => (
                        <NavLink
                          key={sub.href}
                          to={sub.href}
                          className={({ isActive }) =>
                            cn(
                              'block px-4 py-2 text-xs font-medium transition-colors border-l-2',
                              isActive
                                ? 'text-[#1c84cd] border-[#1c84cd] bg-blue-50/50'
                                : 'text-gray-700 border-transparent hover:text-[#1c84cd] hover:bg-gray-50 hover:border-[#1c84cd]'
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
            className="xl:hidden p-2.5 rounded-lg text-gray-700 hover:text-[#1c84cd] hover:bg-gray-100 transition focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 shadow-xl max-h-[80vh] overflow-y-auto px-4 py-4 space-y-2">
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
                      'block px-3 py-2.5 text-sm font-semibold uppercase rounded-md transition',
                      isActive ? 'bg-blue-50 text-[#1c84cd]' : 'text-gray-800 hover:bg-gray-50'
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
                    className="flex-grow px-3 py-2.5 text-sm font-semibold uppercase text-gray-800 hover:text-[#1c84cd]"
                  >
                    {item.title}
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => toggleSubmenu(item.title)}
                    className="p-2 text-gray-500 hover:text-[#1c84cd]"
                    aria-label={`Toggle ${item.title}`}
                  >
                    <ChevronDown
                      className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')}
                    />
                  </button>
                </div>

                {isOpen && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-gray-50 rounded-lg my-1">
                    {item.children?.map((sub) => (
                      <NavLink
                        key={sub.href}
                        to={sub.href}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            'block px-3 py-2 text-xs font-medium rounded transition',
                            isActive ? 'text-[#1c84cd] font-bold bg-white' : 'text-gray-600 hover:text-[#1c84cd]'
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
              className="flex items-center justify-center gap-2 py-2.5 bg-[#1c84cd] text-white rounded-lg font-semibold shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Gọi ngay: {companyInfo.hotline}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
