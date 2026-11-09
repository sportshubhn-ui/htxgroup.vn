import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { productsData, companyInfo } from '@/data/htxData'
import { useQuoteCart } from '@/context/QuoteCartContext'
import { ChevronRight, Plus, Check, Phone, Truck, Send } from 'lucide-react'

export function MaterialDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { addItem, items } = useQuoteCart()
  const [quantity, setQuantity] = useState(20)
  const [added, setAdded] = useState(false)

  const product = productsData.find((p) => p.slug === slug)

  if (!product) {
    return (
      <div className="py-20 text-center max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800">Không tìm thấy sản phẩm</h2>
        <p className="text-gray-500 mt-2 text-sm">Vật liệu bạn đang tìm kiếm không tồn tại hoặc đã được cập nhật lại.</p>
        <Link to="/vat-lieu" className="mt-6 inline-block px-5 py-2.5 bg-[#064D35] text-white rounded-lg text-xs font-bold uppercase">
          Về danh mục vật liệu
        </Link>
      </div>
    )
  }

  const inCart = items.some((i) => i.slug === product.slug)

  const handleAddToCart = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      category: product.category,
      unit: product.unit,
      isRecycled: product.isRecycled,
      image: product.image,
    }, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleQuoteDirect = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      category: product.category,
      unit: product.unit,
      isRecycled: product.isRecycled,
      image: product.image,
    }, quantity)
    navigate('/yeu-cau-bao-gia?type=mua-vat-lieu')
  }

  return (
    <div className="bg-[#FFFCF6] min-h-[80vh] py-10 lg:py-14">
      <SEO
        title={`${product.name} – Báo Giá Vật Liệu Xây Dựng`}
        description={`${product.name} - ${product.specification}. Cung cấp bởi Hành Tinh Xanh. Đặt hàng và nhận báo giá theo khối lượng.`}
        image={product.image}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-[#064D35]">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/vat-lieu" className="hover:text-[#064D35]">Vật liệu</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-semibold">{product.name}</span>
        </nav>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Product Image */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-gray-200 aspect-4/3">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded backdrop-blur-xs">
                Hình minh họa
              </span>
              {product.isRecycled && (
                <span className="absolute top-3 right-3 px-3 py-1 bg-[#064D35] text-[#B2E5C0] text-xs font-black uppercase rounded shadow-sm">
                  Cốt liệu tái sinh xanh
                </span>
              )}
            </div>

            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2 text-xs text-emerald-900">
              <div className="flex items-center gap-2 font-bold">
                <Truck className="w-4 h-4 text-[#064D35]" />
                <span>Phương thức giao nhận & thanh toán:</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Giao hàng bằng xe ben 3 chân - 4 chân hoặc khách tự điều xe lấy tại bãi Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội. Cân xuất phiếu điện tử 80 tấn.
              </p>
            </div>
          </div>

          {/* Right: Info & Quoting */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase mb-2">
                <span>{product.category}</span>
                <span>•</span>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded">Trạng thái: Báo giá theo lô</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#064D35] tracking-tight">
                {product.name}
              </h1>

              <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 block">Đơn giá tham chiếu</span>
                  <span className="text-lg font-bold text-[#064D35]">{product.price}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 block">Đơn vị đo lường</span>
                  <span className="text-sm font-bold text-gray-800">{product.unit}</span>
                </div>
              </div>
            </div>

            {/* Technical specs */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-2">
                Thông số kỹ thuật & Quy cách
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.specification}
              </p>

              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-2 pt-2">
                Ứng dụng thực tế
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.applications}
              </p>
            </div>

            {/* Quantity Selector and Action */}
            <div className="pt-4 border-t border-gray-200 space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-xs font-bold text-gray-700">Khối lượng dự kiến ({product.unit}):</label>
                <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(5, quantity - 5))}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="5"
                    step="5"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-16 text-center text-xs font-bold text-[#064D35] focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 5)}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-5 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer border border-[#064D35] text-[#064D35] hover:bg-emerald-50"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Đã thêm vào giỏ!</span>
                    </>
                  ) : inCart ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Đang có trong giỏ (Cộng thêm)</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Thêm vào giỏ báo giá</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleQuoteDirect}
                  className="flex-1 py-3 px-5 bg-[#064D35] hover:bg-[#043826] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#B2E5C0]" />
                  <span>Yêu cầu báo giá nhanh</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                <span>Cần tư vấn ngay khối lượng lớn?</span>
                <a
                  href={`tel:${companyInfo.hotline.replace(/\s/g, '')}`}
                  className="font-bold text-[#064D35] hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Hotline: {companyInfo.hotline}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Other Products */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 uppercase">Sản phẩm vật liệu khác</h3>
            <Link to="/vat-lieu" className="text-xs font-bold text-[#064D35] hover:underline flex items-center gap-1">
              <span>Xem tất cả</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsData
              .filter((p) => p.slug !== product.slug)
              .slice(0, 4)
              .map((p) => (
                <Link
                  key={p.slug}
                  to={`/vat-lieu/${p.slug}`}
                  className="bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition group block"
                >
                  <div className="h-36 rounded-lg overflow-hidden bg-gray-100 mb-3">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#064D35] truncate">{p.name}</h4>
                  <p className="text-[11px] text-gray-500 mt-1">{p.category} • {p.unit}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
