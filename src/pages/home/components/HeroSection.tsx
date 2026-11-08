import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, TrendingUp, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-white py-16 sm:py-24">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-emerald-200/30 to-teal-200/30 blur-3xl -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Tiên phong liên kết & phát triển kinh tế tập thể
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Kiến tạo hệ sinh thái <span className="text-emerald-600">Hợp tác xã bền vững</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              HTX Group đồng hành cùng các hợp tác xã, liên hiệp HTX trên toàn quốc nhằm tối ưu chuỗi cung ứng nông sản, chuyển đổi số toàn diện và đưa thương hiệu Việt vươn tầm quốc tế.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link to="/lien-he">
                <Button size="lg" className="shadow-lg shadow-emerald-600/20 gap-2">
                  <span>Hợp tác cùng chúng tôi</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/gioi-thieu">
                <Button variant="outline" size="lg">
                  Tìm hiểu thêm
                </Button>
              </Link>
            </div>

            {/* Quick feature pill items */}
            <div className="pt-6 border-t border-gray-100 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Tiêu chuẩn OCOP & VietGAP</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <TrendingUp className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Tăng trưởng bền vững</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Users className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Mạng lưới 500+ HTX</span>
              </div>
            </div>
          </div>

          {/* Right card illustration */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 space-y-6">
              <div className="h-48 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-600 to-green-700 flex flex-col justify-end p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative z-10">
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-200">Giải pháp tổng thể</span>
                  <h3 className="text-xl font-bold mt-1">Chuỗi Giá Trị Nông Sản Số</h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <span className="text-sm font-medium text-gray-700">Quy chuẩn chất lượng quốc gia</span>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">Đạt chuẩn</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <span className="text-sm font-medium text-gray-700">Số hoá truy xuất nguồn gốc</span>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">100% QR Code</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <span className="text-sm font-medium text-gray-700">Kênh phân phối siêu thị & XK</span>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-amber-100 text-amber-800 rounded">Đang mở rộng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
