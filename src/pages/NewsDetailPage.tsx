import { useParams, Link } from 'react-router-dom'
import { newsArticles, companyInfo } from '@/data/htxData'
import { SEO } from '@/components/common/SEO'
import { Calendar, ChevronRight, Share2, Printer, ArrowLeft } from 'lucide-react'

export function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  const article = newsArticles.find((a: typeof newsArticles[0]) => a.slug === slug) || {
    title: 'Bài viết không tìm thấy',
    date: '',
    image: '/images/banner-htx-engineers-crusher.jpg',
    excerpt: 'Bài viết bạn yêu cầu hiện không tồn tại hoặc đã bị di chuyển.',
    content: '<p>Xin lỗi, bài viết bạn đang tìm kiếm không tồn tại.</p>',
    slug: '',
  }

  return (
    <div className="bg-gray-50 py-10 lg:py-14 min-h-[70vh]">
      <SEO
        title={article.title}
        description={article.excerpt}
        image={article.image}
        type="article"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 gap-2">
          <Link to="/" className="hover:text-emerald-700">Trang Chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/tin-tuc" className="hover:text-emerald-700">Tin Tức</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium truncate max-w-xs">{article.title}</span>
        </nav>

        <article className="bg-white rounded-xl p-6 sm:p-10 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold mb-3">
            <Calendar className="w-4 h-4" />
            <span>Ngày đăng: {article.date}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex items-center justify-between text-xs text-gray-500 pb-4 mb-6 border-b border-gray-100">
            <span>Đơn vị: <strong>{companyInfo.name}</strong></span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1 hover:text-emerald-700 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>In</span>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  alert('Đã sao chép liên kết bài viết!')
                }}
                className="flex items-center gap-1 hover:text-emerald-700 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Chia sẻ</span>
              </button>
            </div>
          </div>

          {/* Featured Image */}
          {article.image && (
            <div className="mb-8 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto max-h-[480px] object-cover mx-auto"
              />
            </div>
          )}

          {/* Excerpt / Lead */}
          {article.excerpt && (
            <div className="p-4 bg-emerald-50/70 border-l-4 border-emerald-600 text-sm sm:text-base font-semibold text-emerald-950 mb-6 italic leading-relaxed rounded-r-lg">
              {article.excerpt}
            </div>
          )}

          {/* HTML / Raw Content */}
          <div
            className="prose max-w-none text-gray-700 leading-relaxed text-sm sm:text-base space-y-4 [&>p]:mb-4 [&>p]:leading-relaxed [&>img]:rounded-xl [&>img]:my-4 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-emerald-900 [&>h3]:text-lg [&>h3]:font-bold"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Bottom Back Button */}
          <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
            <Link
              to="/tin-tuc"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 hover:text-emerald-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại danh mục tin tức</span>
            </Link>
            <a
              href={`tel:${companyInfo.hotline.replace(/\s/g, '')}`}
              className="text-xs font-semibold text-gray-700 hover:text-emerald-700"
            >
              Hotline 24/7: <strong>{companyInfo.hotline}</strong>
            </a>
          </div>
        </article>
      </div>
    </div>
  )
}
