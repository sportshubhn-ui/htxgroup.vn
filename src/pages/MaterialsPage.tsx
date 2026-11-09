import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { Search, Plus, Check, ChevronRight, AlertTriangle, ArrowRight, Layers } from 'lucide-react'
import { productsData } from '@/data/htxData'
import { useQuoteCart } from '@/context/QuoteCartContext'

export function MaterialsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentCategory = searchParams.get('cat') || 'all'
  const [searchQuery, setSearchQuery] = useState('')
  const { addItem, items } = useQuoteCart()
  const [addedSlug, setAddedSlug] = useState<string | null>(null)

  const categories = [
    { id: 'all', name: 'Tất cả vật liệu' },
    { id: 'Đá xây dựng', name: 'Đá xây dựng' },
    { id: 'Cát xây dựng', name: 'Cát xây dựng' },
    { id: 'Vật liệu tái chế', name: 'Vật liệu tái chế (RCA)' },
  ]

  const filteredProducts = useMemo(() => {
    return productsData.filter((p) => {
      const matchCat =
        currentCategory === 'all' ||
        (currentCategory === 'tai-che' ? p.isRecycled : p.category === currentCategory)
      const matchQuery =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.specification.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchQuery
    })
  }, [currentCategory, searchQuery])

  const handleAddToCart = (product: typeof productsData[0]) => {
    addItem({
      slug: product.slug,
      name: product.name,
      category: product.category,
      unit: product.unit,
      isRecycled: product.isRecycled,
      image: product.image,
    }, 10)
    setAddedSlug(product.slug)
    setTimeout(() => setAddedSlug(null), 2000)
  }

  return (
    <div className="bg-[#FFFCF6] min-h-[80vh] py-10 lg:py-14">
      <SEO
        title="Danh Mục Vật Liệu Xây Dựng & Cốt Liệu Tái Chế"
        description="Cung cấp đá 1x2, cấp phối đá dăm, cát bê tông, cát xây tô, cát san lấp và cốt liệu bê tông tái chế (RCA) từ Hành Tinh Xanh. Báo giá nhanh theo khối lượng."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-[#064D35]">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-semibold">Vật liệu xây dựng</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-[#064D35] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Nguồn cung vật tư & Cốt liệu xanh</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase text-[#064D35] tracking-tight">
            VẬT LIỆU XÂY DỰNG & TÁI CHẾ
          </h1>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Hành Tinh Xanh cung cấp các dòng vật liệu xây dựng tiêu chuẩn và cốt liệu tái chế từ công trình phá dỡ. Mọi sản phẩm được kiểm soát chất lượng nghiêm ngặt, giao nhận nhanh chóng theo khối lượng thực tế.
          </p>
        </div>

        {/* Disclaimer per MASTER_BRIEF */}
        <div className="mb-8 p-4 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Lưu ý báo giá:</span> Danh mục thể hiện các dòng sản phẩm Hành Tinh Xanh tiếp nhận cung ứng. Giá bán thực tế phụ thuộc vào cự ly công trình, khối lượng đặt hàng và thời điểm giao. Quý khách vui lòng chọn sản phẩm vào giỏ hoặc gọi trực tiếp Hotline <strong>0707 155 666</strong> để nhận báo giá chi tiết.
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-emerald-900/10 shadow-xs mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSearchParams(c.id === 'all' ? {} : { cat: c.id })}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase transition cursor-pointer ${
                  currentCategory === c.id
                    ? 'bg-[#064D35] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên vật liệu..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#064D35] focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const inCart = items.some((i) => i.slug === product.slug)
            return (
              <div
                key={product.slug}
                className="bg-white rounded-2xl overflow-hidden border border-emerald-900/10 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-52 bg-slate-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Illustration badge per brief */}
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded backdrop-blur-xs">
                    Hình minh họa
                  </span>
                  {product.isRecycled && (
                    <span className="absolute top-2 right-2 px-2.5 py-1 bg-[#064D35] text-[#B2E5C0] text-[10px] font-extrabold uppercase rounded shadow-sm">
                      Tái chế sinh thái (RCA)
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-gray-500">
                      <span className="font-semibold text-emerald-800">{product.category}</span>
                      <span>Đơn vị: {product.unit}</span>
                    </div>

                    <Link
                      to={`/vat-lieu/${product.slug}`}
                      className="text-base font-bold text-gray-900 group-hover:text-[#064D35] transition block"
                    >
                      {product.name}
                    </Link>

                    <p className="text-xs text-gray-600 line-clamp-2">
                      {product.specification}
                    </p>

                    <div className="text-[11px] text-gray-500 pt-1">
                      <strong className="text-gray-700">Ứng dụng:</strong> {product.applications}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold uppercase transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        addedSlug === product.slug || inCart
                          ? 'bg-emerald-100 text-[#064D35] border border-emerald-300'
                          : 'bg-[#064D35] hover:bg-[#043826] text-white shadow-xs'
                      }`}
                    >
                      {addedSlug === product.slug ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Đã thêm 10 {product.unit}</span>
                        </>
                      ) : inCart ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Trong giỏ (+10)</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Thêm vào giỏ báo giá</span>
                        </>
                      )}
                    </button>

                    <Link
                      to={`/vat-lieu/${product.slug}`}
                      className="p-2.5 border border-gray-200 hover:border-[#064D35] text-gray-700 hover:text-[#064D35] rounded-lg transition"
                      title="Xem chi tiết"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
