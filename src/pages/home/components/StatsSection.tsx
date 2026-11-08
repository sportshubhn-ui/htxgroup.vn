import { StatItem } from '@/types'

const stats: StatItem[] = [
  { value: '500+', label: 'Hợp tác xã thành viên', description: 'Trải rộng khắp cả nước' },
  { value: '63', label: 'Tỉnh thành phủ sóng', description: 'Mạng lưới liên kết sâu rộng' },
  { value: '1.200+', label: 'Sản phẩm OCOP & VietGAP', description: 'Đạt chuẩn xuất khẩu và tiêu thụ' },
  { value: '98%', label: 'Đối tác hài lòng', description: 'Đồng hành phát triển lâu dài' },
]

export function StatsSection() {
  return (
    <section className="py-12 bg-emerald-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-emerald-800">
          {stats.map((stat, idx) => (
            <div key={idx} className="pt-6 lg:pt-0 px-4">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-300 tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 text-sm sm:text-base font-semibold text-white">
                {stat.label}
              </div>
              {stat.description && (
                <div className="mt-1 text-xs text-emerald-200/80">
                  {stat.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
