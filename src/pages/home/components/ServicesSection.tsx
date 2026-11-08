import { Link } from 'react-router-dom'
import { Cpu, Truck, BarChart3, Coins, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { SectionHeading } from '@/components/ui/SectionHeading'

const services = [
  {
    icon: Cpu,
    title: 'Chuyển đổi số HTX',
    description: 'Hỗ trợ phần mềm quản lý mùa vụ, nhân sự, tài chính kế toán chuyên biệt cho mô hình hợp tác xã.',
  },
  {
    icon: Truck,
    title: 'Logistics & Chuỗi Cung Ứng',
    description: 'Tối ưu hóa khâu bảo quản lạnh, vận chuyển và kết nối hệ thống siêu thị, sàn thương mại điện tử.',
  },
  {
    icon: BarChart3,
    title: 'Tư Vấn & Tiêu Chuẩn Hóa',
    description: 'Định hướng sản xuất sạch, chứng nhận VietGAP, GlobalGAP, OCOP 3-5 sao và truy xuất mã vùng trồng.',
  },
  {
    icon: Coins,
    title: 'Tiếp Cận Nguồn Vốn & Đầu Tư',
    description: 'Cầu nối liên kết các quỹ hỗ trợ phát triển kinh tế tập thể, ngân hàng chính sách và nhà đầu tư.',
  },
]

export function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Lĩnh vực hoạt động"
          title="Giải pháp toàn diện cho Hợp tác xã hiện đại"
          subtitle="Chúng tôi cung cấp các gói dịch vụ và giải pháp công nghệ nhằm giải quyết những điểm nghẽn lớn nhất của kinh tế tập thể."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, idx) => {
            const Icon = item.icon
            return (
              <Card key={idx} className="group hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/dich-vu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition"
          >
            <span>Khám phá chi tiết các lĩnh vực hợp tác</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
