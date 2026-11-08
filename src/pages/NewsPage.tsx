import { Link } from 'react-router-dom'
import { newsArticles } from '@/data/htxData'
import { SEO } from '@/components/common/SEO'
import { Calendar, ArrowRight, ChevronRight } from 'lucide-react'

export function NewsPage() {
  return (
    <div className="bg-gray-50 py-10 lg:py-14 min-h-[70vh]">
      <SEO
        title="Tin Tức Sự Kiện"
        description="Tin tức hoạt động, quy định xử lý chất thải rắn xây dựng và công nghệ tái chế bảo vệ môi trường của HTX GROUP."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-[#1c84cd]">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium">Tin Tức</span>
        </nav>

        <div className="mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 tracking-tight">
            TIN TỨC & SỰ KIỆN
          </h1>
          <div className="w-20 h-1 bg-[#1c84cd] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-[#1c84cd]" />
                    <span>{article.date}</span>
                  </div>
                  <h2 className="font-bold text-base text-gray-900 group-hover:text-[#1c84cd] transition line-clamp-2 leading-snug">
                    <Link to={`/${article.slug}`}>{article.title}</Link>
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  to={`/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1c84cd] hover:text-[#1977b9]"
                >
                  <span>Xem chi tiết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
