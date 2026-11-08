/**
 * Complete Data Module for HTX GROUP (Công ty Cổ phần Tập đoàn HTX Group)
 */

export interface NavItem {
  title: string
  href: string
  children?: { title: string; href: string }[]
}

export const companyInfo = {
  name: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN HTX GROUP',
  shortName: 'HTX GROUP',
  englishName: 'HTX Group Joint Stock Company',
  abbreviation: 'HTX GROUP.,JSC',
  taxCode: '0106501398',
  licenseDate: '04/04/2014 do Sở Kế Hoạch và Đầu tư TP Hà Nội cấp',
  hotline: '0966 269 956',
  phoneAlt: '0359 028 779',
  email: 'contact@htxgroup.vn',
  website: 'https://htxgroup.vn',
  officeAddress: 'Tầng 12, số 164 đường Khuất Duy Tiến, Phường Thanh Xuân, TP Hà Nội',
  yardAddress: 'Khu tiếp nhận 6.5 ha nút giao cao tốc Pháp Vân – Cầu Giẽ với đường vành đai 3 trên cao, Phường Hoàng Liệt, Quận Hoàng Mai, Hà Nội',
  facebook: 'https://facebook.com/htxgroup.vn'
}

export const navigationItems: NavItem[] = [
  {
    title: 'Trang Chủ',
    href: '/'
  },
  {
    title: 'Giới thiệu',
    href: '/gioi-thieu',
    children: [
      { title: 'Thông tin chung', href: '/gioi-thieu/thong-tin-chung' },
      { title: 'Thư ngỏ', href: '/gioi-thieu/thu-ngo' },
      { title: 'Tầm nhìn sứ mệnh', href: '/gioi-thieu/tam-nhin-su-menh' },
      { title: 'Cam kết của chúng tôi', href: '/gioi-thieu/cam-ket-cua-chung-toi' },
      { title: 'Quá trình hình thành & phát triển', href: '/gioi-thieu/qua-trinh-hinh-thanh-phat-trien' }
    ]
  },
  {
    title: 'Sản phẩm',
    href: '/san-pham',
    children: [
      { title: 'Sản phẩm của HTX Group', href: '/san-pham-cua-toan-cau' },
      { title: 'Cát san lấp', href: '/cat-san-lap' },
      { title: 'Bê tông vụn', href: '/be-tong-vun' },
      { title: 'Đá tự nhiên', href: '/da-tu-nhien1' },
      { title: 'Nhựa đường vụn', href: '/nhua-duong-vun' },
      { title: 'Phế liệu thi công', href: '/phe-lieu-thi-cong' }
    ]
  },
  {
    title: 'Lĩnh vực hoạt động',
    href: '/linh-vuc-hoat-dong',
    children: [
      { title: 'Phá dỡ công trình dân dụng & CN', href: '/pha-do-cong-trinh-dan-dung-va-cong-nghiep' },
      { title: 'Thu gom - Xử lý CTRXD', href: '/xu-ly-chat-thai-ran-xay-dung' },
      { title: 'Kinh doanh vật liệu xây dựng', href: '/kinh-doanh-vat-lieu-xay-dung' },
      { title: 'Thu gom tái chế', href: '/thu-gom-taiche' }
    ]
  },
  {
    title: 'Dự án tiêu biểu',
    href: '/cac-du-an-tieu-bieu',
    children: [
      { title: 'Phá dỡ nhà B - CA Hà Nội', href: '/pha-do-nha-b-tru-so-cong-an-thanh-pho-ha-noi' },
      { title: 'Xử lý CTRXD Vành Đai 2', href: '/hang-muc-tiep-nhan-cong-trinh-va-xu-ly-chat-thai-ran' },
      { title: 'Máy nghiền RM 70GO!', href: '/may-nghien-rm-70go' },
      { title: 'Phá dỡ 138 Giảng Võ', href: '/pha-do-bon-toa-nha-tai-dia-chi-so-138-pho-giang-vo-ha-noi' }
    ]
  },
  {
    title: 'Hồ sơ năng lực',
    href: '/ho-so-nang-luc',
    children: [
      { title: 'Nguồn nhân lực', href: '/ho-so-nang-luc/nguon-nhan-luc' },
      { title: 'Năng lực thiết bị', href: '/ho-so-nang-luc/nang-luc-thiet-bi' }
    ]
  },
  {
    title: 'Tin tức',
    href: '/tin-tuc'
  },
  {
    title: 'Video',
    href: '/video'
  },
  {
    title: 'Liên hệ',
    href: '/lien-he'
  }
]

export const homeHeroSlides = [
  {
    id: 1,
    image: '/images/slider-1.jpg',
    title: 'Thu gom – xử lý – tái chế CTRXD. Hotline: 0966 269 956',
    desc: 'HTX Group hướng tới đưa vật liệu tái chế từ chất thải rắn xây dựng ứng dụng rộng rãi vào thi công công trình, san lấp mặt bằng, nguồn vật liệu mới.',
    ctaText: 'Xem chi tiết',
    ctaLink: '/xu-ly-chat-thai-ran-xay-dung'
  },
  {
    id: 2,
    image: '/images/slider-2.jpg',
    title: 'Phá dỡ và tái chế vật liệu xây dựng',
    desc: 'Hướng tới một môi trường làm việc chuyên nghiệp, năng động, hiệu quả. Đáp ứng các yêu cầu của công trình kỹ thuật cao.',
    ctaText: 'Khám phá dịch vụ',
    ctaLink: '/pha-do-cong-trinh-dan-dung-va-cong-nghiep'
  },
  {
    id: 3,
    image: '/images/slider-3.jpg',
    title: 'Giải pháp hoàn hảo để xử lý chất thải rắn xây dựng',
    desc: 'The perfect solution for handing industrial and construction waste. Biến phế thải thành tài nguyên xanh.',
    ctaText: 'Liên hệ hợp tác',
    ctaLink: '/lien-he'
  }
]

export const homeProgressBars = [
  { label: 'Thu gom - Xử lý chất thải rắn xây dựng', percent: 82 },
  { label: 'Tiên phong tái chế phế thải xây dựng', percent: 96 },
  { label: 'Cung cấp nguyên liệu xây dựng sau tái chế', percent: 87 },
  { label: 'Đảm bảo vệ sinh môi trường nhất', percent: 94 },
  { label: 'Công nghệ hiện đại nhất', percent: 97 }
]

export const coreServices = [
  {
    id: 'pha-do-cong-trinh-dan-dung-va-cong-nghiep',
    title: 'Phá dỡ công trình dân dụng và công nghiệp',
    desc: 'Nhà dân, khách sạn, chung cư, bệnh viện, cơ quan... luôn đi đầu về chất lượng: thi công nhanh, an toàn, chi phí tiết kiệm nhất.',
    href: '/pha-do-cong-trinh-dan-dung-va-cong-nghiep',
    icon: 'Building'
  },
  {
    id: 'xu-ly-chat-thai-ran-xay-dung',
    title: 'THU GOM – XỬ LÝ CHẤT THẢI RẮN XÂY DỰNG',
    desc: 'Tiếp nhận xử lý chất thải rắn xây dựng. Thu gom, vận chuyển rác thải xây dựng tại nguồn đến điểm tập kết, trạm trung chuyển.',
    href: '/xu-ly-chat-thai-ran-xay-dung',
    icon: 'Recycle'
  },
  {
    id: 'kinh-doanh-vat-lieu-xay-dung',
    title: 'Cung cấp nguyên liệu xây dựng sau tái chế',
    desc: 'Với quyết tâm “biến phế thải thành tài nguyên” Công ty HTX Group đã mạnh dạn đầu tư hàng loạt máy móc thiết bị hiện đại công nghệ cao.',
    href: '/kinh-doanh-vat-lieu-xay-dung',
    icon: 'PackageCheck'
  }
]

export const featuredProjects = [
  {
    id: 'pha-do-cong-trinh',
    title: 'Phá dỡ công trình',
    summary: 'Phá dỡ nhà B – trụ sở công an thành phố Hà Nội. Chủ đầu tư: Công an TP Hà Nội.',
    href: '/pha-do-nha-b-tru-so-cong-an-thanh-pho-ha-noi',
    icon: 'CheckSquare'
  },
  {
    id: 'hang-muc-tiep-nhan-cong-trinh-va-xu-ly-chat-thai-ran',
    title: 'HẠNG MỤC TIẾP NHẬN CÔNG TRÌNH VÀ XỬ LÝ CHẤT THẢI RẮN',
    summary: 'Tiếp nhận CTR XD từ dự án: Xây dựng tuyến đường bộ trên cao dọc đường vành đai 2.',
    href: '/hang-muc-tiep-nhan-cong-trinh-va-xu-ly-chat-thai-ran',
    icon: 'Truck'
  },
  {
    id: 'may-nghien-rm-70go',
    title: 'MÁY NGHIỀN RM 70GO!',
    summary: 'Máy nghiền tính lưu động tối đa, công suất 120 tấn/giờ, thiết kế nhỏ gọn, hiệu suất vận hành vượt trội.',
    href: '/may-nghien-rm-70go',
    icon: 'Wrench'
  },
  {
    id: 'video-hoat-dong',
    title: 'Video Hoạt Động',
    summary: 'Công ty CP DV SX HTX Group HTX Group hỗ trợ người dân Thanh Trì chung tay cùng đẩy lùi đại dịch.',
    href: '/video',
    icon: 'PlayCircle'
  },
  {
    id: 'pha-do-va-tai-che',
    title: 'Phá dỡ và tái chế vật liệu xây dựng',
    summary: 'Hướng tới một môi trường làm việc chuyên nghiệp, năng động, hiệu quả. Đáp ứng mọi tiêu chuẩn khắt khe.',
    href: '/thu-gom-taiche',
    icon: 'ArrowRight'
  }
]

export const productList = [
  {
    id: 'san-pham-cua-toan-cau',
    title: 'Sản phẩm của HTX Group',
    image: '/images/prod-htxgroup.jpg',
    desc: 'Các sản phẩm của HTX Group: Cát san lấp, Base, Supbase, Cát xây dựng, Cọc tiêu đường...',
    href: '/san-pham-cua-toan-cau'
  },
  {
    id: 'phe-lieu-thi-cong',
    title: 'PHẾ LIỆU THI CÔNG',
    image: '/images/prod-catsanlap.png',
    desc: 'Quy trình: Gạch đá vụn – Gia công sản phẩm – Cát đã tái chế – Tái sử dụng để lắp mương máng.',
    href: '/phe-lieu-thi-cong'
  },
  {
    id: 'da-tu-nhien1',
    title: 'Đá tự nhiên',
    image: '/images/prod-datunhien.jpg',
    desc: 'Đá tự nhiên và cốt liệu bê tông nghiền phân loại chất lượng cao phục vụ các công trình xây dựng.',
    href: '/da-tu-nhien1'
  },
  {
    id: 'nhua-duong-vun',
    title: 'Nhựa đường vụn',
    image: '/images/prod-nhuaduong.jpg',
    desc: 'Quy trình: Nhựa đường vụn – Gia công sản phẩm – Các hạt nhựa đường tái chế làm nền đường chịu tải không nén.',
    href: '/nhua-duong-vun'
  },
  {
    id: 'cat-san-lap',
    title: 'Cát san lấp',
    image: '/images/prod-catsanlap.png',
    desc: 'Cát tái chế từ chất thải rắn xây dựng, dùng cho san lấp mặt bằng, làm mương máng, nền móng vững chắc.',
    href: '/cat-san-lap'
  },
  {
    id: 'be-tong-vun',
    title: 'Bê tông vụn',
    image: '/images/prod-datunhien.jpg',
    desc: 'Bê tông vụn đã qua nghiền tuyển chọn kỹ thuật, tái sử dụng hiệu quả và tiết kiệm chi phí xây dựng.',
    href: '/be-tong-vun'
  }
]

export const companyCounters = [
  { value: '37', label: 'ĐỐI TÁC' },
  { value: '200', label: 'KHÁCH HÀNG' },
  { value: '150', label: 'DỰ ÁN THAM GIA' },
  { value: '40', label: 'DỰ ÁN ĐẦU TƯ' }
]

export const newsArticles = [
  {
    "slug": "ha-noi-kiem-tra-xu-ly-dut-diem-tinh-trang-do-trom-rac-tren-vanh-dai-2-va-vanh-dai-3",
    "url": "https://htxgroup.vn/ha-noi-kiem-tra-xu-ly-dut-diem-tinh-trang-do-trom-rac-tren-vanh-dai-2-va-vanh-dai-3/",
    "title": "Hà Nội: Kiểm tra, xử lý dứt điểm tình trạng đổ trộm rác trên Vành đai 2 và Vành đai 3",
    "date": "2025",
    "image": "/images/news-vanhdai2.jpg",
    "excerpt": "05 Th12 2025 by admin...",
    "content": "<div class=\"entry-meta ht-post-info\"> <span class=\"entry-date published updated\"><span class=\"ht-day\">05</span><span class=\"ht-month-year\">Th12 2025</span></span><span class=\"byline\"> by <span class=\"author vcard\"><a class=\"url fn n\" href=\"https://htxgroup.vn/author/admin/\">admin</a></span></span>"
  },
  {
    "slug": "tao-dot-pha-trong-quan-ly-chat-thai-ran-xay-dung-o-ha-noi",
    "url": "https://htxgroup.vn/tao-dot-pha-trong-quan-ly-chat-thai-ran-xay-dung-o-ha-noi/",
    "title": "Tạo đột phá trong quản lý chất thải rắn xây dựng ở Hà Nội",
    "date": "2025",
    "image": "/images/news-nguyenxuandai.jpg",
    "excerpt": "27 Th6 2025 by admin...",
    "content": "<div class=\"entry-meta ht-post-info\"> <span class=\"entry-date published updated\"><span class=\"ht-day\">27</span><span class=\"ht-month-year\">Th6 2025</span></span><span class=\"byline\"> by <span class=\"author vcard\"><a class=\"url fn n\" href=\"https://htxgroup.vn/author/admin/\">admin</a></span></span>"
  },
  {
    "slug": "ha-noi-phat-nang-hanh-vi-san-gat-dat-nong-nghiep",
    "url": "https://htxgroup.vn/ha-noi-phat-nang-hanh-vi-san-gat-dat-nong-nghiep/",
    "title": "Hà Nội phạt nặng hành vi san gạt đất nông nghiệp",
    "date": "2025",
    "image": "https://htxgroup.vn/wp-content/uploads/2025/05/datnongnghiep1-1.jpg",
    "excerpt": "05 Th5 2025 by admin...",
    "content": "<div class=\"entry-meta ht-post-info\"> <span class=\"entry-date published updated\"><span class=\"ht-day\">05</span><span class=\"ht-month-year\">Th5 2025</span></span><span class=\"byline\"> by <span class=\"author vcard\"><a class=\"url fn n\" href=\"https://htxgroup.vn/author/admin/\">admin</a></span></span>"
  },
  {
    "slug": "san-xuat-vat-lieu-xay-dung-tu-phe-thai",
    "url": "https://htxgroup.vn/san-xuat-vat-lieu-xay-dung-tu-phe-thai/",
    "title": "Sản xuất vật liệu xây dựng từ phế thải",
    "date": "2025",
    "image": "https://htxgroup.vn/wp-content/uploads/2025/03/1.jpg",
    "excerpt": "24 Th3 2025 by admin...",
    "content": "<div class=\"entry-meta ht-post-info\"> <span class=\"entry-date published updated\"><span class=\"ht-day\">24</span><span class=\"ht-month-year\">Th3 2025</span></span><span class=\"byline\"> by <span class=\"author vcard\"><a class=\"url fn n\" href=\"https://htxgroup.vn/author/admin/\">admin</a></span></span>"
  },
  {
    "slug": "khuyen-khich-dau-tu-tai-che-phe-thai-xay-dung-de-khong-lang-phi-tai-nguyen",
    "url": "https://htxgroup.vn/khuyen-khich-dau-tu-tai-che-phe-thai-xay-dung-de-khong-lang-phi-tai-nguyen/",
    "title": "Khuyến khích đầu tư, tái chế phế thải xây dựng để không lãng phí ‘tài nguyên’",
    "date": "2025",
    "image": "https://htxgroup.vn/wp-content/uploads/2025/01/taiche.jpg",
    "excerpt": "17 Th1 2025 by admin...",
    "content": "<div class=\"entry-meta ht-post-info\"> <span class=\"entry-date published updated\"><span class=\"ht-day\">17</span><span class=\"ht-month-year\">Th1 2025</span></span><span class=\"byline\"> by <span class=\"author vcard\"><a class=\"url fn n\" href=\"https://htxgroup.vn/author/admin/\">admin</a></span></span>"
  },
  {
    "slug": "toan-cau-chung-tay-cung-ha-noi-don-dep-moi-truong-sau-bao-yagi",
    "url": "https://htxgroup.vn/toan-cau-chung-tay-cung-ha-noi-don-dep-moi-truong-sau-bao-yagi/",
    "title": "HTX Group chung tay cùng Hà Nội dọn dẹp môi trường sau bão Yagi",
    "date": "2025",
    "image": "https://htxgroup.vn/wp-content/uploads/2024/09/Bao-so-3-a2.jpg",
    "excerpt": "12 Th9 2024 by admin...",
    "content": "<div class=\"entry-meta ht-post-info\"> <span class=\"entry-date published updated\"><span class=\"ht-day\">12</span><span class=\"ht-month-year\">Th9 2024</span></span><span class=\"byline\"> by <span class=\"author vcard\"><a class=\"url fn n\" href=\"https://htxgroup.vn/author/admin/\">admin</a></span></span>"
  },
  {
    "slug": "thuc-trang-su-dung-vat-lieu-xanh-tai-viet-nam-hien-nay",
    "url": "https://htxgroup.vn/thuc-trang-su-dung-vat-lieu-xanh-tai-viet-nam-hien-nay/",
    "title": "Thực trạng sử dụng vật liệu xanh tại Việt Nam hiện nay",
    "date": "2025",
    "image": "https://htxgroup.vn/wp-content/uploads/2024/08/vlx1.jpg",
    "excerpt": "20 Th8 2024 by admin...",
    "content": "<div class=\"entry-meta ht-post-info\"> <span class=\"entry-date published updated\"><span class=\"ht-day\">20</span><span class=\"ht-month-year\">Th8 2024</span></span><span class=\"byline\"> by <span class=\"author vcard\"><a class=\"url fn n\" href=\"https://htxgroup.vn/author/admin/\">admin</a></span></span>"
  },
  {
    "slug": "quy-trinh-tai-che-chat-thai-ran-xay-dung-cua-toan-cau",
    "url": "https://htxgroup.vn/quy-trinh-tai-che-chat-thai-ran-xay-dung-cua-toan-cau/",
    "title": "Quy trình tái chế chất thải rắn xây dựng của HTX Group",
    "date": "2025",
    "image": "https://htxgroup.vn/wp-content/uploads/2024/05/a1.jpg",
    "excerpt": "22 Th5 2024 by admin...",
    "content": "<div class=\"entry-meta ht-post-info\"> <span class=\"entry-date published updated\"><span class=\"ht-day\">22</span><span class=\"ht-month-year\">Th5 2024</span></span><span class=\"byline\"> by <span class=\"author vcard\"><a class=\"url fn n\" href=\"https://htxgroup.vn/author/admin/\">admin</a></span></span>"
  }
]
