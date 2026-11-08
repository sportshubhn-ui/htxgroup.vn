import { CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export function AboutPreview() {
  const highlights = [
    'Hơn 10 năm kinh nghiệm đồng hành cùng nông dân và ban quản trị HTX',
    'Liên kết bền vững theo mô hình 4 nhà (Nhà nước - Nhà khoa học - Doanh nghiệp - Nhà nông)',
    'Hệ sinh thái công nghệ giúp nâng cao 40% giá trị nông sản',
    'Chính sách hỗ trợ rủi ro thị trường và cam kết bao tiêu minh bạch',
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Về HTX Group
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 leading-tight">
              Đưa kinh tế tập thể Việt Nam bước vào kỷ nguyên số
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              HTX Group được thành lập với mục tiêu trở thành điểm tựa vững chắc cho các hợp tác xã trên khắp mọi miền tổ quốc. Chúng tôi không chỉ cung cấp nền tảng quản trị thông minh, mà còn trực tiếp mở rộng đầu ra nông sản thông qua liên kết chuỗi giá trị khép kín.
            </p>

            <div className="mt-6 space-y-3">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link to="/gioi-thieu">
                <Button variant="primary">Tìm hiểu sứ mệnh & tầm nhìn</Button>
              </Link>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 flex flex-col justify-center">
            <div className="space-y-6">
              <div className="border-l-4 border-emerald-600 pl-4 py-1">
                <h4 className="font-bold text-gray-900">Sứ mệnh</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Nâng tầm thu nhập cho xã viên, gìn giữ nguồn nông sản sạch và thúc đẩy nông thôn mới phồn vinh.
                </p>
              </div>
              <div className="border-l-4 border-emerald-600 pl-4 py-1">
                <h4 className="font-bold text-gray-900">Tầm nhìn 2030</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Trở thành tập đoàn dịch vụ & liên minh hợp tác xã hàng đầu Đông Nam Á về nông nghiệp bền vững.
                </p>
              </div>
              <div className="border-l-4 border-emerald-600 pl-4 py-1">
                <h4 className="font-bold text-gray-900">Giá trị cốt lõi</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Liên kết - Minh bạch - Đổi mới - Bền vững.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
