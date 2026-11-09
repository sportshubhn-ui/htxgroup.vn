import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { ChevronRight, PlayCircle } from 'lucide-react'

export function VideoPage() {
  const videos = [
    {
      id: 1,
      title: 'Vận hành bãi tiếp nhận và trạm nghiền tái chế CTRXD Thượng Cát',
      desc: 'Quy trình thu gom, tiếp nhận xe tải và vận hành máy nghiền hiện đại xử lý phế thải xây dựng tại Ngõ 46 Liên Mạc, Thượng Cát, Tây Hồ, Hà Nội.',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      date: '08/11/2026',
    },
    {
      id: 2,
      title: 'Công tác thi công phá dỡ an toàn và phân loại phế thải tại công trình',
      desc: 'Áp dụng thiết bị cơ giới chuyên dụng, biện pháp che chắn bụi mịn và đảm bảo an toàn tuyệt đối cho các công trình lân cận.',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      date: '15/10/2026',
    },
  ]

  return (
    <div className="bg-gray-50 py-10 lg:py-14 min-h-[70vh]">
      <SEO
        title="Video Hoạt Động & Quy Trình Tái Chế"
        description="Video hoạt động thu gom xử lý rác thải xây dựng và công nghệ tái chế bảo vệ môi trường của Công ty TNHH TM&DV Giải Pháp Hành Tinh Xanh."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-emerald-700">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium">Video</span>
        </nav>

        <div className="mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 tracking-tight">
            VIDEO HOẠT ĐỘNG & CÔNG NGHỆ
          </h1>
          <div className="w-20 h-1 bg-emerald-600 mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((vid) => (
            <div key={vid.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm p-6">
              <div className="aspect-video bg-emerald-950 rounded-xl overflow-hidden mb-4 relative flex items-center justify-center">
                <div className="text-center p-6 text-white">
                  <PlayCircle className="w-16 h-16 text-emerald-400 mx-auto mb-2 opacity-90 hover:scale-110 transition cursor-pointer" />
                  <p className="text-xs text-emerald-200">Truyền thông Hành Tinh Xanh</p>
                </div>
              </div>
              <div className="text-xs text-emerald-700 font-bold mb-2">{vid.date}</div>
              <h2 className="font-bold text-base text-gray-900 mb-2 leading-snug">{vid.title}</h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{vid.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
