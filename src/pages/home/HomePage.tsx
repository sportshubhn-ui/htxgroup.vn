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
  Calendar,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles
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
} from '@/data/htxData'
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
        description="Công ty TNHH TM&DV Giải Pháp Hành Tinh Xanh - Tiếp nhận, thu gom, vận chuyển và tái chế chất thải rắn xây dựng (CTRXD) tại Ngõ 46 Liên Mạc, Thượng Cát. Trụ sở tại 138 Giảng Võ. Hotline 0707 155 666."
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
            {/* Dark green overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/85 via-slate-950/70 to-emerald-950/80" />

            {/* Slide caption */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl space-y-4 text-white">
                  <div className="inline-flex items-center gap-2 bg-emerald-600/90 text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md backdrop-blur-sm">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                    <span>{companyInfo.slogan}</span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-md">
                    {slide.title}
                  </h1>

                  <p className="text-sm sm:text-base lg:text-lg text-emerald-100/90 bg-emerald-950/60 p-4 rounded-lg backdrop-blur-sm max-w-2xl leading-relaxed border border-emerald-500/30">
                    {slide.desc}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      to={slide.ctaLink}
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3.5 rounded-lg font-bold uppercase text-xs tracking-wider transition shadow-lg shadow-emerald-900/40 cursor-pointer"
                    >
                      <span>{slide.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href={`tel:${companyInfo.hotline.replace(/\s/g, '')}`}
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider backdrop-blur-sm border border-white/20 transition cursor-pointer"
                    >
                      <span>Hotline: {companyInfo.hotline}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider arrow controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-emerald-600 text-white flex items-center justify-center transition focus:outline-none backdrop-blur-xs cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-emerald-600 text-white flex items-center justify-center transition focus:outline-none backdrop-blur-xs cursor-pointer"
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
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                idx === currentSlide ? 'bg-emerald-500 w-8' : 'bg-white/50 hover:bg-white w-2.5'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. CÔNG BỐ BÃI TẬP KẾT & GIỚI THIỆU */}
      <section id="ht-about-us-section" className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Announcement Callout Banner */}
          <div className="mb-14 p-6 sm:p-8 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-500/40 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 text-white text-[11px] font-extrabold uppercase rounded-md tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Công bố chính thức</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-emerald-950">
                Bãi tập kết & Xử lý chất thải rắn xây dựng (CTRXD) tại Thượng Cát
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Địa chỉ bãi tiếp nhận: <strong>Ngõ 46 Liên Mạc, Phường Thượng Cát, Quận Bắc Từ Liêm, Hà Nội</strong></span>
              </p>
            </div>
            <div className="shrink-0 flex gap-3">
              <Link
                to="/lien-he"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition shadow-sm"
              >
                Đăng ký tiếp nhận CTRXD
              </Link>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 tracking-tight">
              Giới Thiệu Về <span className="text-emerald-700">{companyInfo.name}</span>
            </h2>
            <div className="w-20 h-1 bg-emerald-600 mx-auto mt-3" />
            <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              Trụ sở đặt tại <strong>Tầng 4 tòa nhà Grandeur Palace, 138 Giảng Võ, Ba Đình, Hà Nội</strong>. Hành Tinh Xanh là đơn vị chuyên nghiệp hàng đầu trong lĩnh vực phá dỡ công trình, thu gom vận chuyển và tái chế phế thải xây dựng theo mô hình kinh tế tuần hoàn.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Progress Bars */}
            <div className="lg:col-span-7 space-y-6">
              {homeProgressBars.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold text-gray-800">
                    <span>{item.label}</span>
                    <span className="text-emerald-700 font-extrabold">{item.percent}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all duration-1000"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/gioi-thieu/thong-tin-chung"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition shadow-sm"
                >
                  <span>Hồ sơ năng lực</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/lien-he"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 hover:border-emerald-600 text-gray-700 hover:text-emerald-700 font-semibold text-xs uppercase tracking-wider rounded-lg transition"
                >
                  <span>Liên hệ báo giá</span>
                </Link>
              </div>
            </div>

            {/* Right: Featured image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
                <img
                  src="/images/about-img.jpg"
                  alt="Trạm xử lý chất thải rắn xây dựng Hành Tinh Xanh"
                  className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/30 to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-300">Công nghệ hiện đại</span>
                    <h3 className="text-lg font-bold">Quy trình xử lý & Tái chế phế thải xanh</h3>
                    <p className="text-xs text-emerald-200">Bãi tiếp nhận Ngõ 46 Liên Mạc, P. Thượng Cát, Bắc Từ Liêm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LĨNH VỰC HOẠT ĐỘNG */}
      <section id="ht-featured-post-section" className="py-16 bg-gradient-to-b from-emerald-800 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
              LĨNH VỰC HOẠT ĐỘNG CỐT LÕI
            </h2>
            <div className="w-20 h-1 bg-white mx-auto mt-3" />
            <p className="mt-3 text-sm text-emerald-100 max-w-2xl mx-auto">
              Ba trụ cột dịch vụ chuyên sâu bảo vệ môi trường và phát triển kinh tế tuần hoàn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreServices.map((service) => (
              <div
                key={service.id}
                className="bg-white text-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-sm">
                    {service.icon === 'Building' && <Building className="w-7 h-7" />}
                    {service.icon === 'Recycle' && <Recycle className="w-7 h-7" />}
                    {service.icon === 'PackageCheck' && <PackageCheck className="w-7 h-7" />}
                  </div>
                  <h3 className="text-lg font-bold uppercase text-gray-900 group-hover:text-emerald-700 transition leading-snug">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100">
                  <Link
                    to={service.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 hover:text-emerald-800 transition"
                  >
                    <span>Chi tiết dịch vụ</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DỰ ÁN TIÊU BIỂU */}
      <section id="ht-service-post-section" className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 tracking-tight">
              DỰ ÁN & HẠNG MỤC TIÊU BIỂU
            </h2>
            <div className="w-20 h-1 bg-emerald-600 mx-auto mt-3" />
            <p className="mt-3 text-sm text-gray-600">
              Các công trình giải phóng mặt bằng, vận chuyển và trạm xử lý CTRXD trọng điểm
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                      {project.icon === 'CheckSquare' && <CheckCircle className="w-5 h-5" />}
                      {project.icon === 'Truck' && <Truck className="w-5 h-5" />}
                      {project.icon === 'Wrench' && <Wrench className="w-5 h-5" />}
                      {project.icon === 'ArrowRight' && <Layers className="w-5 h-5" />}
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 hover:text-emerald-700 transition line-clamp-2">
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
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition shadow-sm"
            >
              <span>Xem tất cả dự án</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. SẢN PHẨM VẬT LIỆU XANH TÁI CHẾ */}
      <section id="ht-team-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 tracking-tight">
              SẢN PHẨM VẬT LIỆU TÁI CHẾ HÀNH TINH XANH
            </h2>
            <div className="w-20 h-1 bg-emerald-600 mx-auto mt-3" />
            <p className="mt-3 text-sm text-gray-600">
              Vật liệu xây dựng tái sinh đạt chuẩn kỹ thuật, tối ưu chi phí và thân thiện môi trường
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productList.map((product) => (
              <div
                key={product.id}
                className="relative overflow-hidden rounded-xl shadow-md group h-[380px] bg-slate-100 border border-gray-100"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Bottom title banner by default */}
                <div className="absolute bottom-0 inset-x-0 bg-emerald-800/95 text-white py-3.5 px-4 text-center transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-wide truncate">
                    {product.title}
                  </h3>
                </div>

                {/* Hover full overlay */}
                <Link
                  to={product.href}
                  className="absolute inset-0 bg-emerald-900/92 text-white p-6 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <h3 className="font-bold text-base uppercase tracking-wider mb-3 border-b border-emerald-400/50 pb-2">
                    {product.title}
                  </h3>
                  <p className="text-xs text-emerald-100 leading-relaxed mb-5">
                    {product.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-emerald-800 rounded-lg font-bold text-xs uppercase tracking-wider shadow">
                    <span>Xem thông số kỹ thuật</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BỘ ĐẾM THÀNH TỰU */}
      <section
        id="ht-counter-section"
        className="py-16 bg-slate-900 text-white relative bg-cover bg-center"
        style={{ backgroundImage: `url('/images/slider-1.jpg')` }}
      >
        <div className="absolute inset-0 bg-emerald-950/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {companyCounters.map((counter, idx) => (
              <div key={idx} className="p-4">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-300 tracking-tight">
                  {counter.value}
                </div>
                <div className="mt-2 text-xs sm:text-sm uppercase font-bold text-emerald-100 tracking-wider">
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
              TIN TỨC & CHÍNH SÁCH MÔI TRƯỜNG
            </h2>
            <div className="w-20 h-1 bg-emerald-600 mx-auto mt-3" />
            <p className="mt-3 text-sm text-gray-600">
              Quy định quản lý chất thải rắn xây dựng và thông báo tiếp nhận vật liệu mới nhất
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsArticles.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </div>
                    <h3 className="font-bold text-sm text-gray-900 hover:text-emerald-700 transition line-clamp-2 leading-snug">
                      <Link to={`/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="mt-2 text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={`/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>Đọc tiếp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. ĐỐI TÁC ĐỒNG HÀNH */}
      <section id="ht-logo-section" className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-base font-bold uppercase text-gray-700 tracking-wider">
              ĐỐI TÁC ĐỒNG HÀNH CÙNG HÀNH TINH XANH
            </h3>
            <div className="w-12 h-0.5 bg-emerald-600 mx-auto mt-2" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <div className="px-5 py-3 rounded-lg border border-gray-200 bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SỞ XÂY DỰNG HÀ NỘI</span>
            </div>
            <div className="px-5 py-3 rounded-lg border border-gray-200 bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SỞ TÀI NGUYÊN & MÔI TRƯỜNG</span>
            </div>
            <div className="px-5 py-3 rounded-lg border border-gray-200 bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>UBND QUẬN BẮC TỪ LIÊM</span>
            </div>
            <div className="px-5 py-3 rounded-lg border border-gray-200 bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>HỘI MÔI TRƯỜNG XÂY DỰNG VIỆT NAM</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
