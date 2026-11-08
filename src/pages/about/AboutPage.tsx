import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card, CardContent } from '@/components/ui/Card'
import { Award, Compass, HeartHandshake, Lightbulb } from 'lucide-react'

export function AboutPage() {
  const values = [
    {
      icon: HeartHandshake,
      title: 'Hợp tác & Đồng hành',
      desc: 'Đặt lợi ích của bà con nông dân và xã viên làm trung tâm của mọi hoạt động.',
    },
    {
      icon: Lightbulb,
      title: 'Đổi mới Sáng tạo',
      desc: 'Áp dụng công nghệ số và phương pháp canh tác hiện đại vào từng khâu sản xuất.',
    },
    {
      icon: Award,
      title: 'Chất lượng Chuẩn mực',
      desc: 'Tuyệt đối cam kết về chất lượng sản phẩm theo tiêu chuẩn quốc gia và quốc tế.',
    },
    {
      icon: Compass,
      title: 'Bền vững Lâu dài',
      desc: 'Phát triển hài hòa giữa kinh tế, môi trường sinh thái và phúc lợi xã hội vùng nông thôn.',
    },
  ]

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Giới thiệu"
          title="Về Tập Đoàn HTX Group"
          subtitle="Tổ chức liên kết kinh tế tập thể hàng đầu, thúc đẩy nền nông nghiệp xanh và hiện đại hóa chuỗi giá trị tại Việt Nam."
        />

        {/* Story Section */}
        <div className="prose prose-emerald max-w-4xl mx-auto text-gray-600 leading-relaxed space-y-6 text-base sm:text-lg">
          <p>
            HTX Group ra đời trong bối cảnh các hợp tác xã nông nghiệp tại Việt Nam đang đứng trước bước ngoặt lớn về chuyển đổi số và nâng cao năng lực cạnh tranh. Chúng tôi hiểu rằng, sức mạnh lớn nhất của mô hình hợp tác xã chính là sự đoàn kết và liên kết quy mô lớn.
          </p>
          <p>
            Bằng việc kết hợp các chuyên gia nông nghiệp hàng đầu, đội ngũ kỹ sư công nghệ và mạng lưới thương mại quốc tế, HTX Group mang đến giải pháp trọn gói từ khâu hạt giống, canh tác chuẩn VietGAP/GlobalGAP cho tới đóng gói bao bì, truy xuất nguồn gốc và đưa vào các kênh bán buôn, siêu thị.
          </p>
        </div>

        {/* Values Grid */}
        <div className="mt-20">
          <SectionHeading
            badge="Giá trị"
            title="Giá Trị Cốt Lõi"
            subtitle="Những nguyên tắc định hướng cho từng quyết định và dự án của HTX Group."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <Card key={i} className="text-center p-6 border-emerald-100/60 bg-emerald-50/30">
                  <CardContent className="p-0 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">{v.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{v.desc}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
