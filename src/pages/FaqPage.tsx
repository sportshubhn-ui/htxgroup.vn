import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { faqList, companyInfo } from '@/data/htxData'
import { ChevronDown, Search, HelpCircle, ChevronRight, Phone } from 'lucide-react'

export function FaqPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const categories = ['all', 'Tiếp nhận', 'Vận hành', 'Dịch vụ', 'Vật liệu', 'Báo giá']

  const filteredFaqs = useMemo(() => {
    return faqList.filter((f) => {
      const matchCat = selectedCategory === 'all' || f.category === selectedCategory
      const matchQuery =
        !searchQuery ||
        f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchQuery
    })
  }, [selectedCategory, searchQuery])

  return (
    <div className="bg-[#FFFCF6] min-h-[80vh] py-10 lg:py-14">
      <SEO
        title="Câu Hỏi Thường Gặp (FAQ) – Hành Tinh Xanh"
        description="Giải đáp các câu hỏi thường gặp về thủ tục đổ phế thải tại bãi Ngõ 46 Liên Mạc Thượng Cát Tây Hồ, quy trình thu gom, xe ben vận chuyển và báo giá vật liệu."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-[#064D35]">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-semibold">Hỏi đáp thường gặp</span>
        </nav>

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-[#064D35] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Hỗ trợ khách hàng</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase text-[#064D35] tracking-tight">
            CÂU HỎI THƯỜNG GẶP (FAQ)
          </h1>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Các câu hỏi phổ biến nhất về thủ tục tiếp nhận chất thải rắn xây dựng, điều kiện vào bãi Ngõ 46 Liên Mạc, Thượng Cát, Tây Hồ và chính sách cung cấp vật liệu.
          </p>
        </div>

        {/* Search & Categories */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm câu hỏi (vd: bãi Liên Mạc, thủ tục cân xe, cốt liệu tái chế...)"
              className="w-full h-12 pl-11 pr-4 text-xs sm:text-sm bg-white border border-emerald-900/10 rounded-2xl shadow-xs focus:ring-2 focus:ring-[#064D35] focus:outline-none"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#064D35] text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat === 'all' ? 'Tất cả chủ đề' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3 mb-12">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 text-gray-500">
              <p className="text-sm">Không tìm thấy câu hỏi phù hợp với từ khóa của bạn.</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="mt-3 text-xs font-bold text-[#064D35] underline"
              >
                Xem tất cả câu hỏi
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-emerald-900/10 overflow-hidden shadow-2xs transition"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/70 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 bg-emerald-100 text-[#064D35] text-[10px] font-bold rounded uppercase">
                        {faq.category}
                      </span>
                      <h3 className="font-bold text-xs sm:text-sm text-gray-900">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#064D35]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-emerald-50/20">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Contact banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xs text-center space-y-3">
          <h4 className="text-base font-bold text-gray-900">Bạn có câu hỏi riêng về công trình của mình?</h4>
          <p className="text-xs text-gray-500">
            Hãy liên hệ với đội ngũ chuyên môn của chúng tôi để được giải đáp cụ thể theo đặc thù công trường.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <a
              href={`tel:${companyInfo.hotline.replace(/\s/g, '')}`}
              className="px-5 py-2.5 bg-[#064D35] text-white rounded-xl text-xs font-bold uppercase transition flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Gọi ngay: {companyInfo.hotline}</span>
            </a>
            <Link
              to="/lien-he"
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold uppercase transition"
            >
              Gửi biểu mẫu liên hệ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
