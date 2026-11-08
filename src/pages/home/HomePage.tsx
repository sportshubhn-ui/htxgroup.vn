import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Building,
  Recycle,
  PackageCheck,
  CheckCircle,
  Truck,
  Wrench,
  PlayCircle,
  Calendar,
  Layers
} from 'lucide-react'
import {
  homeHeroSlides,
  homeProgressBars,
  coreServices,
  featuredProjects,
  productList,
  companyCounters,
  newsArticles,
  companyInfo
} from '@/data/tcgroupData'
import { SEO } from '@/components/common/SEO'

export function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % homeHeroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % homeHeroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + homeHeroSlides.length) % homeHeroSlides.length)
  }

  return (
    <div className="bg-white">
      <SEO
        title="Trang Chủ"
        description="TC GROUP Giải pháp hoàn hảo xử lý chất thải rắn xây dựng. Tiếp nhận, thu gom, vận chuyển rác thải xây dựng, phá dỡ công trình dân dụng và công nghiệp, tái chế và cung cấp vật liệu xây dựng."
      />

      {/* 1. HERO SLIDER */}
      <section className="relative h-[480px] sm:h-[560px] lg:h-[620px] overflow-hidden bg-slate-900">
        {homeHeroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/55" />

            {/* Slide caption */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl space-y-4 text-white">
                  <div className="inline-block bg-[#1c84cd] px-4 py-2 font-bold text-lg sm:text-2xl lg:text-3xl shadow-lg leading-snug">
                    {slide.title}
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-200 bg-black/60 p-4 rounded-md backdrop-blur-sm max-w-2xl leading-relaxed">
                    {slide.desc}
                  </p>
                  <div className="pt-2">
                    <Link
                      to={slide.ctaLink}
                      className="inline-flex items-center gap-2 bg-[#1c84cd] hover:bg-[#1977b9] text-white px-6 py-3 rounded font-bold uppercase text-xs tracking-wider transition shadow-md"
                    >
                      <span>{slide.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider arrow controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-[#1c84cd] text-white flex items-center justify-center transition focus:outline-none"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-[#1c84cd] text-white flex items-center justify-center transition focus:outline-none"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {homeHeroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentSlide ? 'bg-[#1c84cd] w-8' : 'bg-white/60 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. ABOUT US WITH PROGRESS BARS */}
      <section id="ht-about-us-section" className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 tracking-tight">
              Giới Thiệu Về <span className="text-[#1c84cd]">{companyInfo.shortName}</span>
            </h2>
            <div className="w-20 h-1 bg-[#1c84cd] mx-auto mt-3" />
            <p className="mt-4 text-sm sm:text-base text-gray-600">
              {companyInfo.name} tự hào là đơn vị tiên phong ứng dụng công nghệ cao trong thu gom, xử lý chất thải rắn xây dựng (CTRXD) và phá dỡ công trình quy chuẩn tại Việt Nam.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Progress Bars */}
            <div className="lg:col-span-7 space-y-6">
              {homeProgressBars.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold text-gray-800">
                    <span>{item.label}</span>
                    <span className="text-[#1c84cd]">{item.percent}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1c84cd] rounded-full transition-all duration-1000"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/gioi-thieu/thong-tin-chung"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1c84cd] hover:bg-[#1977b9] text-white font-semibold text-xs uppercase tracking-wider rounded transition"
                >
                  <span>Tìm hiểu thêm</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/lien-he"
                  className="inline-flex items-center gap-2 px-6 py-2.5 border border-gray-300 hover:border-[#1c84cd] text-gray-700 hover:text-[#1c84cd] font-semibold text-xs uppercase tracking-wider rounded transition"
                >
                  <span>Liên hệ hợp tác</span>
                </Link>
              </div>
            </div>

            {/* Right: Featured image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-lg overflow-hidden shadow-xl border-4 border-white group">
                <img
                  src="/images/about-img.jpg"
                  alt="Giải pháp hoàn hảo để xử lý chất thải rắn xây dựng"
                  className="w-full h-[360px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="text-xs uppercase font-bold tracking-wider text-blue-300">Công nghệ Áo & Châu Âu</span>
                    <h3 className="text-lg font-bold">Giải pháp hoàn hảo xử lý phế thải xây dựng</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LĨNH VỰC HOẠT ĐỘNG (FEATURED SERVICES) */}
      <section id="ht-featured-post-section" className="py-16 bg-[#1c84cd] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
              LĨNH VỰC HOẠT ĐỘNG
            </h2>
            <div className="w-20 h-1 bg-white mx-auto mt-3" />
            <p className="mt-3 text-sm text-blue-100 max-w-2xl mx-auto">
              Ba trụ cột hoạt động then chốt định hình năng lực và uy tín vượt trội của Toàn Cầu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreServices.map((service) => {
              return (
                <div
                  key={service.id}
                  className="bg-white text-gray-800 rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-14 h-14 rounded-full bg-blue-50 text-[#1c84cd] flex items-center justify-center mb-6 group-hover:bg-[#1c84cd] group-hover:text-white transition-colors">
                      {service.icon === 'Building' && <Building className="w-7 h-7" />}
                      {service.icon === 'Recycle' && <Recycle className="w-7 h-7" />}
                      {service.icon === 'PackageCheck' && <PackageCheck className="w-7 h-7" />}
                    </div>
                    <h3 className="text-lg font-bold uppercase text-gray-900 group-hover:text-[#1c84cd] transition leading-snug">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-100">
                    <Link
                      to={service.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1c84cd] hover:text-[#1977b9] transition"
                    >
                      <span>Chi tiết</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. DỰ ÁN TIÊU BIỂU (FEATURED PROJECTS) */}
      <section id="ht-service-post-section" className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 tracking-tight">
              DỰ ÁN TIÊU BIỂU
            </h2>
            <div className="w-20 h-1 bg-[#1c84cd] mx-auto mt-3" />
            <p className="mt-3 text-sm text-gray-600">
              Các công trình trọng điểm cấp thành phố và dự án kỹ thuật cao do Toàn Cầu thực hiện
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1c84cd] flex items-center justify-center shrink-0">
                      {project.icon === 'CheckSquare' && <CheckCircle className="w-5 h-5" />}
                      {project.icon === 'Truck' && <Truck className="w-5 h-5" />}
                      {project.icon === 'Wrench' && <Wrench className="w-5 h-5" />}
                      {project.icon === 'PlayCircle' && <PlayCircle className="w-5 h-5" />}
                      {project.icon === 'ArrowRight' && <Layers className="w-5 h-5" />}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 hover:text-[#1c84cd] transition line-clamp-2">
                      <Link to={project.href}>{project.title}</Link>
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-50">
                  <Link
                    to={project.href}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#1c84cd] hover:text-[#1977b9]"
                  >
                    <span>Xem chi tiết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/cac-du-an-tieu-bieu"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1c84cd] hover:bg-[#1977b9] text-white font-semibold text-xs uppercase tracking-wider rounded transition shadow-sm"
            >
              <span>Xem tất cả dự án</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. SẢN PHẨM VẬT LIỆU TÁI CHẾ */}
      <section id="ht-team-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 tracking-tight">
              SẢN PHẨM CỦA TOÀN CẦU
            </h2>
            <div className="w-20 h-1 bg-[#1c84cd] mx-auto mt-3" />
            <p className="mt-3 text-sm text-gray-600">
              Vật liệu xây dựng tái chế chất lượng cao, thân thiện với môi trường theo chuẩn quốc gia
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productList.map((product) => (
              <div
                key={product.id}
                className="relative overflow-hidden rounded-md shadow-md group h-[380px] bg-slate-100"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Bottom title banner by default */}
                <div className="absolute bottom-0 inset-x-0 bg-[#1c84cd]/95 text-white py-3 px-4 text-center transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-wide truncate">
                    {product.title}
                  </h3>
                </div>

                {/* Hover full overlay */}
                <Link
                  to={product.href}
                  className="absolute inset-0 bg-[#1c84cd]/92 text-white p-6 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <h3 className="font-bold text-base uppercase tracking-wider mb-3 border-b border-white/40 pb-2">
                    {product.title}
                  </h3>
                  <p className="text-xs text-white/95 leading-relaxed mb-4">
                    {product.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#1c84cd] rounded font-bold text-xs uppercase tracking-wider shadow">
                    <span>Xem chi tiết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BỘ ĐẾM THÀNH TỰU (COUNTERS) */}
      <section
        id="ht-counter-section"
        className="py-16 bg-slate-900 text-white relative bg-cover bg-center"
        style={{ backgroundImage: `url('/images/slider-3.jpg')` }}
      >
        <div className="absolute inset-0 bg-[#1c84cd]/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {companyCounters.map((counter, idx) => (
              <div key={idx} className="p-4">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  {counter.value}
                </div>
                <div className="mt-2 text-xs sm:text-sm uppercase font-bold text-blue-100 tracking-wider">
                  {counter.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TIN TỨC SỰ KIỆN */}
      <section id="ht-blog-section" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 tracking-tight">
              TIN TỨC SỰ KIỆN
            </h2>
            <div className="w-20 h-1 bg-[#1c84cd] mx-auto mt-3" />
            <p className="mt-3 text-sm text-gray-600">
              Cập nhật thông tin chính sách, hoạt động thu gom xử lý và bảo vệ môi trường mới nhất
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsArticles.slice(0, 4).map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="h-40 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-[#1c84cd]" />
                      <span>{post.date}</span>
                    </div>
                    <h3 className="font-bold text-sm text-gray-900 hover:text-[#1c84cd] transition line-clamp-2 leading-snug">
                      <Link to={`/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="mt-2 text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <Link
                    to={`/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#1c84cd] hover:text-[#1977b9]"
                  >
                    <span>Đọc tiếp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/tin-tuc"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1c84cd] hover:bg-[#1977b9] text-white font-semibold text-xs uppercase tracking-wider rounded transition"
            >
              <span>Xem tất cả tin tức</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. ĐỐI TÁC CỦA TOÀN CẦU */}
      <section id="ht-logo-section" className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold uppercase text-gray-700 tracking-wider">
              ĐỐI TÁC CỦA TOÀN CẦU
            </h3>
            <div className="w-12 h-0.5 bg-[#1c84cd] mx-auto mt-2" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-85 hover:opacity-100 transition-all">
            <img src="/images/partner-1.jpg" alt="Đối tác 1" className="h-16 w-auto object-contain hover:scale-105 transition" />
            <img src="/images/partner-2.jpg" alt="Đối tác 2" className="h-16 w-auto object-contain hover:scale-105 transition" />
            <img src="/images/partner-3.png" alt="Đối tác 3" className="h-16 w-auto object-contain hover:scale-105 transition" />
            <img src="/images/partner-4.jpg" alt="Đối tác 4" className="h-16 w-auto object-contain hover:scale-105 transition" />
            <img src="/images/partner-5.gif" alt="Đối tác 5" className="h-16 w-auto object-contain hover:scale-105 transition" />
          </div>
        </div>
      </section>
    </div>
  )
}
