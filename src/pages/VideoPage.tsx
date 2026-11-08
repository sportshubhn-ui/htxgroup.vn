import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { ChevronRight, PlayCircle } from 'lucide-react'

export function VideoPage() {
  const videos = [
    {
      id: 1,
      title: 'Công ty CP DV SX HTX Group HTX Group hỗ trợ người dân Thanh Trì chung tay cùng đẩy lùi đại dịch',
      desc: 'Gần 10 tấn gạo đặc sản Nam Định đã được công ty CP DV SX HTX Group vận chuyển đến 6 xã Tân Triều, Tam Hiệp, Hữu Hòa, Tả Thanh Oai, Thịnh Liệt, Vĩnh Quỳnh, Yên Mỹ trên địa bàn huyện Thanh Trì...',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder or real YouTube embed
      date: '16/09/2021',
    },
    {
      id: 2,
      title: 'Vận hành thực tế máy nghiền RM 70GO! công suất 120 tấn/giờ tại công trường',
      desc: 'Công nghệ nghiền trực tiếp bê tông cốt thép, phế thải xây dựng thành cát san lấp và đá cấp phối ngay tại hiện trường thi công.',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      date: '14/12/2020',
    },
  ]

  return (
    <div className="bg-gray-50 py-10 lg:py-14 min-h-[70vh]">
      <SEO
        title="Video Hoạt Động"
        description="Các video phóng sự, tài liệu hoạt động thu gom xử lý rác thải xây dựng và công tác xã hội vì cộng đồng của HTX GROUP."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-[#1c84cd]">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium">Video</span>
        </nav>

        <div className="mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 tracking-tight">
            VIDEO HOẠT ĐỘNG
          </h1>
          <div className="w-20 h-1 bg-[#1c84cd] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((vid) => (
            <div key={vid.id} className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm p-6">
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4 relative flex items-center justify-center">
                <div className="text-center p-6 text-white">
                  <PlayCircle className="w-16 h-16 text-[#1c84cd] mx-auto mb-2 opacity-90 hover:scale-110 transition cursor-pointer" />
                  <p className="text-xs text-gray-400">Xem video trên kênh truyền thông HTX GROUP</p>
                </div>
              </div>
              <div className="text-xs text-[#1c84cd] font-semibold mb-2">{vid.date}</div>
              <h2 className="font-bold text-base text-gray-900 mb-2 leading-snug">{vid.title}</h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{vid.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
