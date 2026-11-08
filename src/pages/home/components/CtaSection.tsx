import { Link } from 'react-router-dom'
import { ArrowRight, PhoneCall } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/config/site.config'

export function CtaSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-emerald-800 to-teal-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Sẵn sàng kết nối và gia nhập mạng lưới HTX Group?
        </h2>
        <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto">
          Hãy cùng chúng tôi xây dựng mô hình hợp tác hiệu quả, gia tăng lợi nhuận và mở rộng thị trường cho hợp tác xã của bạn ngay hôm nay.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/lien-he">
            <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50">
              Đăng ký tư vấn miễn phí
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <a href={`tel:${siteConfig.contact.hotline.replace(/\s/g, '')}`}>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <PhoneCall className="w-4 h-4 mr-2" />
              Hotline: {siteConfig.contact.hotline}
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
