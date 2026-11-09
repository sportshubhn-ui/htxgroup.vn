import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Truck,
  MapPin,
  Phone,
  Send,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react'
import {
  homeHeroSlides,
  servicesData,
  productsData,
  equipmentData,
  companyInfo
} from '@/data/htxData'
import { SEO } from '@/components/common/SEO'
import { useQuoteCart } from '@/context/QuoteCartContext'

export function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { addItem } = useQuoteCart()

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
    <div className="bg-[#FFFCF6] text-[#172D24]">
      <SEO
        title="Trang Chủ – Giải Pháp Hành Tinh Xanh"
        description="Giải pháp thu gom, vận chuyển, tiếp nhận và tái chế chất thải xây dựng, kết nối nguồn vật liệu với nhu cầu công trình tại Hà Nội. Hotline: 0707 155 666."
      />

      {/* 1. HERO SLIDER */}
      <section className="relative h-[500px] sm:h-[580px] lg:h-[640px] overflow-hidden bg-slate-950">
        {homeHeroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Dark green overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#03271B]/95 via-[#064D35]/80 to-transparent" />

            {/* Slide caption */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl space-y-4 text-white">
                  <div className="inline-flex items-center gap-2 bg-[#B2E5C0]/20 text-[#B2E5C0] border border-[#B2E5C0]/40 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#B2E5C0]" />
                    <span>{companyInfo.slogan}</span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-md">
                    {slide.title}
                  </h1>

                  <p className="text-xs sm:text-base text-emerald-100/90 bg-[#03271B]/70 p-4 rounded-xl backdrop-blur-xs max-w-2xl leading-relaxed border border-emerald-500/20">
                    {slide.desc}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      to={slide.primaryCtaLink}
                      className="inline-flex items-center gap-2 bg-[#064D35] hover:bg-[#043826] text-white px-6 py-3.5 rounded-xl font-bold uppercase text-xs tracking-wider transition shadow-lg shadow-emerald-950/40 cursor-pointer border border-[#B2E5C0]/40"
                    >
                      <span>{slide.primaryCtaText}</span>
                      <ArrowRight className="w-4 h-4 text-[#B2E5C0]" />
                    </Link>

                    <Link
                      to={slide.secondaryCtaLink}
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider backdrop-blur-xs border border-white/20 transition cursor-pointer"
                    >
                      <span>{slide.secondaryCtaText}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-[#064D35] text-white flex items-center justify-center transition backdrop-blur-xs cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-[#064D35] text-white flex items-center justify-center transition backdrop-blur-xs cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {homeHeroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                idx === currentSlide ? 'bg-[#B2E5C0] w-8' : 'bg-white/50 hover:bg-white w-2.5'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. HAI THẺ NHU CẦU CHÍNH (MASTER_BRIEF Section 5 Item 2) */}
      <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Journey 1: Cần thu gom / đổ thải */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-lg flex flex-col justify-between group hover:border-[#064D35] transition">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-[#064D35] text-xs font-bold uppercase rounded-full">
                <Truck className="w-3.5 h-3.5" />
                <span>Hành trình 1 • Quản lý chất thải</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#064D35] transition">
                Bạn cần thu gom phế thải công trình hoặc đưa xe vào bãi?
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Khảo sát hiện trường tận nơi, xúc dọn trọn gói bằng máy xúc gầu kẹp và xe ben; hoặc tiếp nhận xe vào đổ tại Bãi Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội qua trạm cân 80 tấn.
              </p>
            </div>
            <div className="pt-6 flex flex-wrap gap-3">
              <Link
                to="/yeu-cau-bao-gia?type=thu-gom"
                className="px-5 py-2.5 bg-[#064D35] hover:bg-[#043826] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 shadow-xs"
              >
                <span>Yêu cầu thu gom</span>
                <ArrowRight className="w-4 h-4 text-[#B2E5C0]" />
              </Link>
              <Link
                to="/yeu-cau-bao-gia?type=dua-vao-bai"
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold uppercase transition"
              >
                Đăng ký vào bãi Liên Mạc
              </Link>
            </div>
          </div>

          {/* Journey 2: Cần mua vật liệu xây dựng & tái chế */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-lg flex flex-col justify-between group hover:border-[#064D35] transition">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-[#064D35] text-xs font-bold uppercase rounded-full">
                <Layers className="w-3.5 h-3.5" />
                <span>Hành trình 2 • Cung ứng vật tư</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#064D35] transition">
                Bạn cần tìm vật liệu xây dựng hoặc cốt liệu tái chế (RCA)?
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Cung cấp đá 1x2, cấp phối đá dăm, cát bê tông, cát xây tô, cát san lấp và cốt liệu bê tông tái chế (RCA) đạt chuẩn kỹ thuật, tối ưu chi phí và thân thiện môi trường.
              </p>
            </div>
            <div className="pt-6 flex flex-wrap gap-3">
              <Link
                to="/vat-lieu"
                className="px-5 py-2.5 bg-[#064D35] hover:bg-[#043826] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 shadow-xs"
              >
                <span>Xem catalog vật liệu</span>
                <ArrowRight className="w-4 h-4 text-[#B2E5C0]" />
              </Link>
              <Link
                to="/yeu-cau-bao-gia?type=mua-vat-lieu"
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold uppercase transition"
              >
                Nhận báo giá theo khối lượng
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BỐN DỊCH VỤ CỐT LÕI */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#064D35] bg-emerald-100 px-3.5 py-1 rounded-full">
              Dịch vụ trọn gói
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase text-[#064D35] tracking-tight mt-3">
              CHUỖI DỊCH VỤ XỬ LÝ CHẤT THẢI RẮN XÂY DỰNG
            </h2>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              Quy trình khép kín từ chân công trình đến nhà máy tái chế, bảo đảm pháp lý minh bạch 100% cho chủ đầu tư và nhà thầu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((svc, i) => (
              <div
                key={svc.slug}
                className="bg-white rounded-2xl overflow-hidden border border-emerald-900/10 shadow-xs hover:shadow-lg transition flex flex-col group"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={svc.image}
                    alt={svc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded backdrop-blur-xs">
                    Hình minh họa
                  </span>
                  <span className="w-8 h-8 rounded-full bg-[#064D35] text-[#B2E5C0] text-xs font-bold flex items-center justify-center absolute top-3 left-3 shadow-sm">
                    0{i + 1}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#064D35] transition leading-snug">
                      {svc.name}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {svc.shortDesc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <Link
                      to={`/dich-vu/${svc.slug}`}
                      className="text-xs font-bold uppercase text-[#064D35] hover:text-emerald-700 flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      <span>Xem chi tiết</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VẬT LIỆU XÂY DỰNG & CỐT LIỆU TÁI CHẾ */}
      <section className="py-16 bg-white border-y border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#064D35] bg-emerald-100 px-3.5 py-1 rounded-full">
                Sản phẩm hạt nhân
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#064D35] tracking-tight mt-3">
                DANH MỤC VẬT LIỆU XÂY DỰNG & CỐT LIỆU TÁI CHẾ
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-gray-600">
                Đá 1x2, cấp phối đá dăm, cát xây tô, cát bê tông, cát san lấp và cốt liệu tái sinh (RCA).
              </p>
            </div>

            <Link
              to="/vat-lieu"
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#064D35] text-[#064D35] hover:bg-emerald-50 rounded-xl text-xs font-bold uppercase tracking-wider transition"
            >
              <span>Xem toàn bộ catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsData.map((p) => (
              <div
                key={p.slug}
                className="bg-[#FFFCF6] rounded-2xl overflow-hidden border border-emerald-900/10 shadow-2xs hover:shadow-md transition flex flex-col group"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded backdrop-blur-xs">
                    Hình minh họa
                  </span>
                  {p.isRecycled && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-[#064D35] text-[#B2E5C0] text-[10px] font-bold rounded uppercase">
                      Tái chế sinh thái
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-emerald-800">{p.category}</span>
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#064D35] transition">
                      {p.name}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">{p.specification}</p>
                  </div>

                  <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-500">Đơn vị: {p.unit}</span>
                    <button
                      onClick={() => addItem({
                        slug: p.slug,
                        name: p.name,
                        category: p.category,
                        unit: p.unit,
                        isRecycled: p.isRecycled,
                        image: p.image
                      }, 10)}
                      className="px-3 py-1.5 bg-[#064D35] text-white rounded-lg text-xs font-bold uppercase hover:bg-[#043826] transition cursor-pointer"
                    >
                      + Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. QUY TRÌNH GIAO DỊCH 5 BƯỚC */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#064D35] bg-emerald-100 px-3.5 py-1 rounded-full">
              Quy trình minh bạch
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#064D35] tracking-tight mt-3">
              QUY TRÌNH GIAO DỊCH TIÊU CHUẨN 5 BƯỚC
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-600">
              Từ tiếp nhận yêu cầu ban đầu đến bàn giao mặt bằng và nghiệm thu khối lượng.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Tiếp nhận nhu cầu', desc: 'Qua hotline 0707 155 666 hoặc form trực tuyến trên website.' },
              { step: '02', title: 'Khảo sát & Xác nhận', desc: 'Cán bộ kỹ thuật kiểm tra vị trí công trình, điều kiện tiếp cận xe và mẫu phế thải.' },
              { step: '03', title: 'Báo giá & Hợp đồng', desc: 'Gửi bảng báo giá chi tiết, phương án xe và ký kết hợp đồng vận chuyển xử lý.' },
              { step: '04', title: 'Triển khai thi công', desc: 'Bốc xúc, vận chuyển xe ben phủ bạt hoặc đón xe vào bãi cân điện tử 80T.' },
              { step: '05', title: 'Bàn giao & Đối soát', desc: 'Ký biên bản bàn giao mặt bằng sạch và cung cấp đầy đủ phiếu cân tịnh.' },
            ].map((s) => (
              <div key={s.step} className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs space-y-2">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-[#064D35] font-black text-xs flex items-center justify-center">
                  {s.step}
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-gray-900">{s.title}</h4>
                <p className="text-[11px] text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 & 7. CƠ SỞ BÃI LIÊN MẠC & GOOGLE MAPS GHIM TÂM (CRITICAL REQUEST) */}
      <section className="py-16 bg-white border-t border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-3xl p-6 sm:p-10 border-2 border-emerald-600/30 mb-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#064D35] text-white text-[11px] font-extrabold uppercase rounded-md tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B2E5C0]" />
                  <span>Công bố điểm tập kết chính thức</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#064D35]">
                  BÃI TẬP KẾT & XỬ LÝ CHẤT THẢI RẮN XÂY DỰNG HÀNH TINH XANH
                </h3>
                <p className="text-xs sm:text-sm text-gray-800 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#064D35] shrink-0" />
                  <span>
                    Địa chỉ tiếp nhận: <strong>{companyInfo.yardAddress}</strong>
                  </span>
                </p>
                <p className="text-xs text-emerald-800 italic">
                  * Địa bàn tiếp nhận: {companyInfo.yardAddress}
                </p>
              </div>

              <div className="shrink-0 flex flex-wrap gap-3">
                <Link
                  to="/yeu-cau-bao-gia?type=dua-vao-bai"
                  className="px-5 py-3 bg-[#064D35] hover:bg-[#043826] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#B2E5C0]" />
                  <span>Đăng ký đưa xe vào bãi</span>
                </Link>
                <a
                  href={`tel:${companyInfo.hotline.replace(/\s/g, '')}`}
                  className="px-4 py-3 bg-white border border-[#064D35] text-[#064D35] font-bold text-xs uppercase rounded-xl transition hover:bg-emerald-50 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{companyInfo.hotline}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Map interactive section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Map iframe */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-4 border border-emerald-900/10 shadow-md">
              <div className="flex items-center justify-between pb-3 px-2 border-b border-gray-100 text-xs">
                <span className="font-bold text-[#064D35] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>Định vị Google Maps: {companyInfo.yardAddress}</span>
                </span>
                <a
                  href={companyInfo.googleMapsDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#064D35] hover:underline font-bold flex items-center gap-1"
                >
                  <span>Mở Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="h-[360px] sm:h-[420px] rounded-2xl overflow-hidden mt-3 border border-gray-200">
                <iframe
                  src={companyInfo.mapEmbedUrl}
                  title={`Bản đồ định vị ${companyInfo.yardAddress}`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Yard specifications */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#FFFCF6] p-6 rounded-3xl border border-emerald-900/10 space-y-4 shadow-2xs">
                <h4 className="font-bold text-sm text-[#064D35] uppercase border-b border-gray-200 pb-2">
                  Thông số vận hành bãi tiếp nhận
                </h4>
                <div className="space-y-3 text-xs text-gray-700">
                  <div>
                    <span className="text-gray-500 block">Thời gian tiếp nhận:</span>
                    <strong className="text-gray-900">24/7 (Cả Thứ Bảy, Chủ Nhật & Ngày Lễ)</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Trọng tải trạm cân:</span>
                    <strong className="text-gray-900">Cân điện tử kỹ thuật số 80 Tấn</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Tiếp cận phương tiện:</span>
                    <strong className="text-gray-900">Xe ben 2.5T, xe 3 chân, 4 chân, xe đầu kéo</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Trụ sở công ty:</span>
                    <span className="text-gray-900">{companyInfo.officeAddress}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/co-so/bai-tap-ket-lien-mac"
                    className="w-full py-2.5 bg-emerald-100 hover:bg-emerald-200 text-[#064D35] font-bold text-xs uppercase rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    <span>Xem hướng dẫn chi tiết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. NĂNG LỰC THIẾT BỊ MÁY MÓC */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#064D35] bg-emerald-100 px-3.5 py-1 rounded-full">
              Trang thiết bị
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#064D35] tracking-tight mt-3">
              NĂNG LỰC MÁY MÓC & ĐỘI XE CHUYÊN DỤNG
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-600">
              Đầu tư hệ thống cơ giới công suất cao đáp ứng yêu cầu xử lý phế thải khối lượng lớn.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipmentData.map((eq) => (
              <div key={eq.slug} className="bg-white rounded-2xl overflow-hidden border border-emerald-900/10 shadow-xs group">
                <div className="relative h-44 bg-gray-100 overflow-hidden">
                  <img src={eq.image} alt={eq.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded backdrop-blur-xs">
                    Hình minh họa
                  </span>
                </div>
                <div className="p-4 space-y-1.5">
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-[#064D35] transition">{eq.name}</h4>
                  <p className="text-[11px] text-gray-600 line-clamp-2">{eq.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FORM BÁO GIÁ NHANH & CAM KẾT */}
      <section className="py-16 bg-gradient-to-br from-[#064D35] to-[#03271B] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B2E5C0]/20 text-[#B2E5C0] border border-[#B2E5C0]/40 rounded-full text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Đồng hành cùng công trình thủ đô</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            LIÊN HỆ KHẢO SÁT & NHẬN BÁO GIÁ TRONG 30 PHÚT
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Hành Tinh Xanh sẵn sàng phục vụ Quý khách 24/7. Hỗ trợ đầy đủ thủ tục hóa đơn, biên bản xử lý chất thải rắn xây dựng theo đúng quy chuẩn pháp luật.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/yeu-cau-bao-gia"
              className="px-8 py-3.5 bg-[#B2E5C0] hover:bg-emerald-200 text-[#064D35] font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Gửi yêu cầu báo giá trực tuyến</span>
            </Link>

            <a
              href={`tel:${companyInfo.hotline.replace(/\s/g, '')}`}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition border border-white/20 flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#B2E5C0]" />
              <span>Hotline 24/7: {companyInfo.hotline}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
