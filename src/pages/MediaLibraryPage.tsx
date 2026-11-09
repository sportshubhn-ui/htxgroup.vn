import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { Image, ChevronRight } from 'lucide-react'

export function MediaLibraryPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const mediaList = [
    { title: 'Dây chuyền máy nghiền kẹp hàm tại bãi', category: 'machinery', image: '/images/equip-crusher.jpg' },
    { title: 'Trạm máy sàng rung 3 tầng phân cấp', category: 'machinery', image: '/images/equip-screen.jpg' },
    { title: 'Máy xúc bánh xích gầu kẹp chuyên dụng', category: 'machinery', image: '/images/equip-excavator.jpg' },
    { title: 'Đoàn xe ben 3 chân 4 chân vận chuyển', category: 'fleet', image: '/images/fleet-trucks.jpg' },
    { title: 'Trạm cân điện tử tự động 80T đón xe', category: 'fleet', image: '/images/weighbridge-truck.jpg' },
    { title: 'Mặt bằng bãi tập kết Ngõ 46 Liên Mạc', category: 'facility', image: '/images/facility-lienmac.jpg' },
    { title: 'Kho bãi cốt liệu và trạm nghiền liên hoàn', category: 'facility', image: '/images/slider-1.jpg' },
    { title: 'Cốt liệu bê tông tái chế (RCA) 10-25mm', category: 'materials', image: '/images/prod-cotlieutaiche.jpg' },
    { title: 'Đá 1x2 xây dựng tiêu chuẩn', category: 'materials', image: '/images/prod-da1x2.jpg' },
    { title: 'Cát bê tông vàng rửa sạch', category: 'materials', image: '/images/prod-catbetong.jpg' },
    { title: 'Cát san lấp mặt bằng móng', category: 'materials', image: '/images/prod-catsanlap.jpg' },
    { title: 'Cấp phối đá dăm loại 1 và loại 2', category: 'materials', image: '/images/prod-capphoida.jpg' },
  ]

  const filtered = activeFilter === 'all'
    ? mediaList
    : mediaList.filter((m) => m.category === activeFilter)

  return (
    <div className="bg-[#FFFCF6] min-h-[80vh] py-10 lg:py-14">
      <SEO
        title="Thư Viện Hình Ảnh & Hoạt Động – Hành Tinh Xanh"
        description="Thư viện hình ảnh hoạt động bãi tập kết Ngõ 46 Liên Mạc Thượng Cát Tây Hồ, dây chuyền máy nghiền, đội xe ben và cốt liệu xây dựng."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-[#064D35]">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-semibold">Thư viện hình ảnh</span>
        </nav>

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-[#064D35] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            <Image className="w-3.5 h-3.5" />
            <span>Hình ảnh & Video</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase text-[#064D35] tracking-tight">
            THƯ VIỆN HÌNH ẢNH HOẠT ĐỘNG
          </h1>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Ghi nhận các góc hình hoạt động vận hành thực tế và hình ảnh minh họa quy trình thu gom, tiếp nhận và nghiền sàng cốt liệu xanh.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'Tất cả hình ảnh' },
            { id: 'facility', label: 'Bãi tập kết Liên Mạc' },
            { id: 'machinery', label: 'Máy móc & Dây chuyền' },
            { id: 'fleet', label: 'Đội xe vận tải & Cân' },
            { id: 'materials', label: 'Vật liệu & Cốt liệu RCA' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition cursor-pointer ${
                activeFilter === btn.id
                  ? 'bg-[#064D35] text-white shadow-xs'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-emerald-900/10 shadow-xs group"
            >
              <div className="relative h-60 bg-gray-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded backdrop-blur-xs">
                  Hình minh họa
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-[#064D35] transition">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
