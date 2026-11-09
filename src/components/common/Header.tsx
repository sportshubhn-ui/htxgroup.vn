import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown, Phone, ShoppingCart, AlertCircle, MapPin, Send } from 'lucide-react'
import { navigationItems, companyInfo } from '@/data/htxData'
import { useQuoteCart } from '@/context/QuoteCartContext'
import { cn } from '@/utils/cn'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
  const { items, totalCount, removeItem, updateQuantity } = useQuoteCart()
  const navigate = useNavigate()

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }

  const handleProceedQuote = () => {
    setCartDrawerOpen(false)
    navigate('/yeu-cau-bao-gia?type=mua-vat-lieu')
  }

  return (
    <header className="sticky top-0 z-50 bg-[#FFFCF6] border-b border-emerald-900/10 shadow-xs">
      {/* 1. Preview notice banner according to MASTER_BRIEF */}
      <div className="bg-[#064D35] text-[#B2E5C0] text-[11px] py-1 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-emerald-800/50">
        <AlertCircle className="w-3.5 h-3.5 text-[#B2E5C0] shrink-0" />
        <span>Bản xem trước thử nghiệm (htxgroup.vn) — Một số thông tin đang chờ doanh nghiệp xác nhận hoàn tất</span>
      </div>

      {/* 2. Top contact bar */}
      <div className="hidden lg:block bg-emerald-50/70 border-b border-emerald-100 py-1.5 text-xs text-[#172D24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-[#064D35] uppercase tracking-wide">
              {companyInfo.name}
            </span>
            <span className="text-emerald-400">•</span>
            <span className="text-emerald-800 italic font-medium">"{companyInfo.slogan}"</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-xs text-gray-600">
              <MapPin className="w-3.5 h-3.5 text-[#064D35]" />
              <span>Bãi tiếp nhận: Ngõ 46 Liên Mạc, Thượng Cát, Tây Hồ</span>
            </span>
            <a
              href={`tel:${companyInfo.hotline.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 text-[#064D35] hover:text-emerald-700 font-bold transition"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hotline 24/7: <strong>{companyInfo.hotline}</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 py-2 group">
            <picture>
              <source srcSet="/brand/logo-glass.webp" type="image/webp" />
              <img
                src="/brand/logo-glass.png"
                alt={companyInfo.name}
                className="h-14 sm:h-16 w-auto max-w-[280px] sm:max-w-[340px] object-contain group-hover:scale-[1.02] transition-transform"
              />
            </picture>
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
                        'px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-150 rounded-md',
                        isActive
                          ? 'text-[#064D35] bg-emerald-100/60 font-extrabold'
                          : 'text-[#172D24] hover:text-[#064D35] hover:bg-emerald-50/50'
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
                        'px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1 rounded-md',
                        isActive
                          ? 'text-[#064D35] bg-emerald-100/60 font-extrabold'
                          : 'text-[#172D24] group-hover:text-[#064D35] group-hover:bg-emerald-50/50'
                      )
                    }
                  >
                    <span>{item.title}</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </NavLink>

                  {/* Dropdown menu */}
                  <div className="absolute left-0 top-full pt-1 hidden group-hover:block w-72 z-50">
                    <div className="bg-[#FFFCF6] rounded-xl shadow-xl border border-emerald-900/10 py-2 brand-dropdown-shadow">
                      {item.children?.map((sub) => (
                        <NavLink
                          key={sub.href}
                          to={sub.href}
                          className={({ isActive }) =>
                            cn(
                              'block px-4 py-2.5 text-xs font-semibold transition-colors border-l-2',
                              isActive
                                ? 'text-[#064D35] border-[#064D35] bg-emerald-50'
                                : 'text-gray-700 border-transparent hover:text-[#064D35] hover:bg-emerald-50/60 hover:border-emerald-600'
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

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quote Cart Button */}
            <button
              onClick={() => setCartDrawerOpen(!cartDrawerOpen)}
              className="relative p-2.5 rounded-lg border border-emerald-900/15 text-[#064D35] hover:bg-emerald-100/50 transition cursor-pointer"
              title="Giỏ yêu cầu báo giá vật liệu"
              aria-label="Giỏ báo giá"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#064D35] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {totalCount}
                </span>
              )}
            </button>

            {/* CTA Button */}
            <Link
              to="/yeu-cau-bao-gia"
              className="px-4 py-2.5 bg-[#064D35] hover:bg-[#043826] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-[#B2E5C0]" />
              <span>Yêu cầu báo giá</span>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => setCartDrawerOpen(!cartDrawerOpen)}
              className="relative p-2 rounded-lg text-[#064D35] hover:bg-emerald-50 transition"
              aria-label="Giỏ báo giá"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#064D35] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="p-2 rounded-lg text-gray-700 hover:text-[#064D35] hover:bg-emerald-50 transition focus:outline-none"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Cart Drawer Overlay */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity">
          <div className="bg-[#FFFCF6] w-full max-w-md h-full shadow-2xl flex flex-col border-l border-emerald-900/10">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-emerald-50/50">
              <div className="flex items-center gap-2 text-[#064D35]">
                <ShoppingCart className="w-5 h-5" />
                <h3 className="font-extrabold text-sm uppercase">Giỏ yêu cầu báo giá ({items.length})</h3>
              </div>
              <button
                onClick={() => setCartDrawerOpen(false)}
                className="p-1.5 text-gray-500 hover:text-gray-800 rounded-lg"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="text-center py-12 text-gray-500 space-y-3">
                  <ShoppingCart className="w-12 h-12 mx-auto text-gray-300" />
                  <p className="text-sm font-medium">Giỏ báo giá đang trống</p>
                  <p className="text-xs text-gray-400">Chọn các loại vật liệu xây dựng hoặc cốt liệu tái chế để thêm vào danh sách báo giá.</p>
                  <Link
                    to="/vat-lieu"
                    onClick={() => setCartDrawerOpen(false)}
                    className="inline-block mt-3 px-4 py-2 bg-[#064D35] text-white rounded-lg text-xs font-bold uppercase tracking-wider"
                  >
                    Xem catalog vật liệu
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.slug} className="p-3 bg-white rounded-lg border border-emerald-900/10 flex items-center justify-between gap-3 shadow-2xs">
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 truncate">{item.name}</h4>
                      <p className="text-[11px] text-gray-500">{item.category} • Đơn vị: {item.unit}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.slug, item.quantity - 5)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-bold text-[#064D35] min-w-[28px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.slug, item.quantity + 5)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.slug)}
                        className="text-red-500 hover:text-red-700 text-xs p-1"
                        title="Xóa"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-gray-200 bg-white space-y-3">
                <div className="text-xs text-gray-500 flex justify-between">
                  <span>Tổng số lượng ước tính:</span>
                  <span className="font-bold text-[#064D35]">{totalCount} (tấn / m³)</span>
                </div>
                <button
                  onClick={handleProceedQuote}
                  className="w-full py-3 bg-[#064D35] hover:bg-[#043826] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4 text-[#B2E5C0]" />
                  <span>Điền thông tin & Nhận báo giá</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. Mobile Drawer */}
      {mobileOpen && (
        <div className="xl:hidden bg-[#FFFCF6] border-t border-emerald-900/10 shadow-2xl max-h-[80vh] overflow-y-auto px-4 py-4 space-y-2">
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
                      isActive ? 'bg-emerald-100/70 text-[#064D35] font-extrabold' : 'text-gray-800 hover:bg-gray-50'
                    )
                  }
                >
                  {item.title}
                </NavLink>
              )
            }

            const isOpen = openSubmenu === item.title

            return (
              <div key={item.href} className="border-b border-gray-100 pb-1">
                <div className="flex items-center justify-between">
                  <NavLink
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex-grow px-3 py-2.5 text-sm font-bold uppercase text-gray-800 hover:text-[#064D35]"
                  >
                    {item.title}
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => toggleSubmenu(item.title)}
                    className="p-2 text-gray-500 hover:text-[#064D35]"
                    aria-label={`Toggle ${item.title}`}
                  >
                    <ChevronDown
                      className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')}
                    />
                  </button>
                </div>

                {isOpen && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-emerald-50/60 rounded-lg my-1">
                    {item.children?.map((sub) => (
                      <NavLink
                        key={sub.href}
                        to={sub.href}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            'block px-3 py-2 text-xs font-semibold rounded transition',
                            isActive ? 'text-[#064D35] font-bold bg-white shadow-xs' : 'text-gray-600 hover:text-[#064D35]'
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

          {/* Quick contact & quote on mobile */}
          <div className="pt-4 mt-4 border-t border-gray-100 flex flex-col gap-2">
            <Link
              to="/yeu-cau-bao-gia"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 py-3 bg-[#064D35] text-white rounded-lg font-bold shadow-md tracking-wider uppercase text-xs"
            >
              <Send className="w-4 h-4 text-[#B2E5C0]" />
              <span>Yêu cầu báo giá trực tuyến</span>
            </Link>
            <a
              href={`tel:${companyInfo.hotline.replace(/\s/g, '')}`}
              className="flex items-center justify-center gap-2 py-3 bg-emerald-100 text-[#064D35] rounded-lg font-bold tracking-wider uppercase text-xs"
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
