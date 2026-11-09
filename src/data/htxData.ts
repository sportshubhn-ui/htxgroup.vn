/**
 * Data Module for CÔNG TY TNHH TM&DV GIẢI PHÁP HÀNH TINH XANH (GREEN PLANET)
 * Website: htxgroup.vn
 */

export interface NavItem {
  title: string
  href: string
  children?: { title: string; href: string }[]
}

export const companyInfo = {
  name: 'CÔNG TY TNHH TM&DV GIẢI PHÁP HÀNH TINH XANH',
  shortName: 'HÀNH TINH XANH',
  brandName: 'GIẢI PHÁP HÀNH TINH XANH',
  englishName: 'Green Planet Solutions Trading & Service Co., Ltd',
  abbreviation: 'GREEN PLANET (HTX)',
  slogan: 'Cho hành tinh nhẹ gánh hơn.',
  taxCode: '0109886688',
  licenseDate: 'Sở Kế Hoạch và Đầu tư TP Hà Nội cấp',
  hotline: '0707 155 666',
  phoneAlt: '0707 155 666',
  email: 'contact@htxgroup.vn',
  website: 'https://htxgroup.vn',
  officeAddress: 'Tầng 4, tòa nhà Grandeur Palace, 138 Giảng Võ, Phường Kim Mã, Quận Ba Đình, TP Hà Nội',
  yardAddress: 'Ngõ 46 Liên Mạc, Phường Thượng Cát, Quận Bắc Từ Liêm, TP Hà Nội',
  facebook: 'https://facebook.com/htxgroup.vn',
}

export const navigationItems: NavItem[] = [
  {
    title: 'Trang Chủ',
    href: '/',
  },
  {
    title: 'Giới thiệu',
    href: '/gioi-thieu',
    children: [
      { title: 'Thông tin chung', href: '/gioi-thieu/thong-tin-chung' },
      { title: 'Thư ngỏ', href: '/gioi-thieu/thu-ngo' },
      { title: 'Tầm nhìn sứ mệnh', href: '/gioi-thieu/tam-nhin-su-menh' },
      { title: 'Cam kết của chúng tôi', href: '/gioi-thieu/cam-ket-cua-chung-toi' },
      { title: 'Quá trình hình thành & phát triển', href: '/gioi-thieu/qua-trinh-hinh-thanh-phat-trien' },
    ],
  },
  {
    title: 'Sản phẩm',
    href: '/san-pham',
    children: [
      { title: 'Sản phẩm Hành Tinh Xanh', href: '/san-pham-cua-htx-group' },
      { title: 'Cát san lấp tái chế', href: '/cat-san-lap' },
      { title: 'Bê tông nghiền tái sinh', href: '/be-tong-vun' },
      { title: 'Đá cấp phối tự nhiên', href: '/da-tu-nhien1' },
      { title: 'Nhựa đường vụn tái sinh', href: '/nhua-duong-vun' },
      { title: 'Phế liệu xây dựng tuyển chọn', href: '/phe-lieu-thi-cong' },
    ],
  },
  {
    title: 'Lĩnh vực hoạt động',
    href: '/linh-vuc-hoat-dong',
    children: [
      { title: 'Phá dỡ công trình dân dụng & CN', href: '/pha-do-cong-trinh-dan-dung-va-cong-nghiep' },
      { title: 'Thu gom - Xử lý CTRXD', href: '/xu-ly-chat-thai-ran-xay-dung' },
      { title: 'Kinh doanh vật liệu xây dựng xanh', href: '/kinh-doanh-vat-lieu-xay-dung' },
      { title: 'Bãi tập kết Thượng Cát', href: '/thu-gom-taiche' },
    ],
  },
  {
    title: 'Dự án tiêu biểu',
    href: '/cac-du-an-tieu-bieu',
    children: [
      { title: 'Bãi xử lý CTRXD Thượng Cát', href: '/hang-muc-tiep-nhan-cong-trinh-va-xu-ly-chat-thai-ran' },
      { title: 'Dự án Grandeur Palace 138 Giảng Võ', href: '/pha-do-bon-toa-nha-tai-dia-chi-so-138-pho-giang-vo-ha-noi' },
      { title: 'Phá dỡ nhà B - CA Hà Nội', href: '/pha-do-nha-b-tru-so-cong-an-thanh-pho-ha-noi' },
      { title: 'Trạm nghiền công nghệ cao', href: '/may-nghien-rm-70go' },
    ],
  },
  {
    title: 'Hồ sơ năng lực',
    href: '/ho-so-nang-luc',
    children: [
      { title: 'Nguồn nhân lực', href: '/ho-so-nang-luc/nguon-nhan-luc' },
      { title: 'Năng lực thiết bị & Máy nghiền', href: '/ho-so-nang-luc/nang-luc-thiet-bi' },
    ],
  },
  {
    title: 'Tin tức',
    href: '/tin-tuc',
  },
  {
    title: 'Video',
    href: '/video',
  },
  {
    title: 'Liên hệ',
    href: '/lien-he',
  },
]

export const homeHeroSlides = [
  {
    id: 1,
    image: '/images/slider-1.jpg',
    title: 'Thu gom – Xử lý – Tái chế CTRXD tại Hà Nội. Hotline: 0707 155 666',
    desc: 'Công ty TNHH TM&DV Giải Pháp Hành Tinh Xanh tiên phong giải pháp công nghệ tuần hoàn chất thải rắn xây dựng. Cho hành tinh nhẹ gánh hơn.',
    ctaText: 'Khám phá dịch vụ',
    ctaLink: '/xu-ly-chat-thai-ran-xay-dung',
  },
  {
    id: 2,
    image: '/images/slider-2.jpg',
    title: 'Phá dỡ công trình chuyên nghiệp & Cung ứng vật liệu tái chế',
    desc: 'Thi công an toàn tuyệt đối, nhanh gọn, tối ưu chi phí. Trụ sở tại Tầng 4 tòa nhà Grandeur Palace 138 Giảng Võ, Ba Đình, Hà Nội.',
    ctaText: 'Tìm hiểu năng lực',
    ctaLink: '/pha-do-cong-trinh-dan-dung-va-cong-nghiep',
  },
  {
    id: 3,
    image: '/images/slider-3.jpg',
    title: 'Bãi tiếp nhận & xử lý CTRXD tại Ngõ 46 Liên Mạc, P. Thượng Cát',
    desc: 'Quy mô tiếp nhận công suất lớn tại Quận Bắc Từ Liêm, xử lý triệt để phế thải xây dựng, cung cấp cát san lấp và cốt liệu đạt chuẩn.',
    ctaText: 'Liên hệ tiếp nhận CTRXD',
    ctaLink: '/lien-he',
  },
]

export const homeProgressBars = [
  { label: 'Thu gom & Xử lý chất thải rắn xây dựng (CTRXD)', percent: 96 },
  { label: 'Tiên phong tái chế vật liệu xanh theo kinh tế tuần hoàn', percent: 98 },
  { label: 'Cung cấp nguyên liệu xây dựng sau tái chế', percent: 92 },
  { label: 'Đảm bảo vệ sinh môi trường & an toàn tuyệt đối', percent: 100 },
  { label: 'Công nghệ nghiền sàng lọc hiện đại bậc nhất', percent: 97 },
]

export const coreServices = [
  {
    id: 'pha-do-cong-trinh-dan-dung-va-cong-nghiep',
    title: 'Phá dỡ công trình dân dụng và công nghiệp',
    desc: 'Nhà dân, khách sạn, chung cư, bệnh viện, nhà máy cơ quan... luôn đi đầu về chất lượng: thi công nhanh, an toàn tuyệt đối, chi phí tiết kiệm nhất.',
    href: '/pha-do-cong-trinh-dan-dung-va-cong-nghiep',
    icon: 'Building',
  },
  {
    id: 'xu-ly-chat-thai-ran-xay-dung',
    title: 'THU GOM – XỬ LÝ CHẤT THẢI RẮN XÂY DỰNG (CTRXD)',
    desc: 'Tiếp nhận xử lý chất thải rắn xây dựng tại bãi Thượng Cát. Thu gom, vận chuyển phế thải từ chân công trình đến trạm xử lý.',
    href: '/xu-ly-chat-thai-ran-xay-dung',
    icon: 'Recycle',
  },
  {
    id: 'kinh-doanh-vat-lieu-xay-dung',
    title: 'Cung cấp nguyên liệu xây dựng sau tái chế',
    desc: 'Với quyết tâm “biến phế thải thành tài nguyên xanh”, Hành Tinh Xanh đầu tư dây chuyền máy móc hiện đại tạo ra cát san lấp, đá base đạt chuẩn.',
    href: '/kinh-doanh-vat-lieu-xay-dung',
    icon: 'PackageCheck',
  },
]

export const featuredProjects = [
  {
    id: 'bai-xu-ly-thuong-cat',
    title: 'Bãi tập kết & Xử lý CTRXD Thượng Cát',
    summary: 'Điểm tập kết quy chuẩn tại Ngõ 46 Liên Mạc, Phường Thượng Cát, Bắc Từ Liêm. Tiếp nhận và xử lý hàng trăm nghìn tấn phế thải xây dựng mỗi năm.',
    href: '/hang-muc-tiep-nhan-cong-trinh-va-xu-ly-chat-thai-ran',
    icon: 'Truck',
  },
  {
    id: 'du-an-grandeur-palace-giang-vo',
    title: 'Dự án tại 138 Giảng Võ - Grandeur Palace',
    summary: 'Công tác giải phóng mặt bằng, vận chuyển phế thải và bàn giao quỹ đất sạch an toàn tại khu vực trung tâm quận Ba Đình.',
    href: '/pha-do-bon-toa-nha-tai-dia-chi-so-138-pho-giang-vo-ha-noi',
    icon: 'CheckSquare',
  },
  {
    id: 'tram-nghien-rm-70go',
    title: 'Dây chuyền máy nghiền di động hiện đại',
    summary: 'Thiết bị nghiền tái chế tính lưu động tối đa, công suất 120 tấn/giờ, xử lý trực tiếp bê tông khối lớn thành cốt liệu phục vụ hạ tầng.',
    href: '/may-nghien-rm-70go',
    icon: 'Wrench',
  },
  {
    id: 'pha-do-tru-so-co-quan',
    title: 'Phá dỡ công trình trụ sở cơ quan nhà nước',
    summary: 'Thi công hạ giải các tòa nhà cũ kỹ thuật cao, bảo toàn các công trình liền kề, giảm thiểu tối đa bụi mịn và tiếng ồn đô thị.',
    href: '/pha-do-nha-b-tru-so-cong-an-thanh-pho-ha-noi',
    icon: 'ArrowRight',
  },
]

export const productList = [
  {
    id: 'san-pham-cua-htx-group',
    title: 'Vật liệu tái chế Hành Tinh Xanh',
    image: '/images/prod-htxgroup.jpg',
    desc: 'Hệ thống sản phẩm vật liệu xanh: Base, Subbase, Cát xây dựng, Bê tông tái chế, Cọc tiêu đường...',
    href: '/san-pham-cua-htx-group',
  },
  {
    id: 'cat-san-lap',
    title: 'Cát san lấp tái chế',
    image: '/images/prod-catsanlap.png',
    desc: 'Cát tái chế từ chất thải rắn xây dựng, dùng cho san lấp mặt bằng, làm mương máng, nền móng vững chắc, tiết kiệm chi phí.',
    href: '/cat-san-lap',
  },
  {
    id: 'be-tong-vun',
    title: 'Bê tông nghiền tái sinh',
    image: '/images/prod-htxgroup.jpg',
    desc: 'Bê tông nghiền đã qua sàng lọc tuyển chọn kỹ thuật, thay thế đá tự nhiên trong làm đường giao thông và lót móng.',
    href: '/be-tong-vun',
  },
  {
    id: 'da-tu-nhien1',
    title: 'Đá cấp phối & Cốt liệu tự nhiên',
    image: '/images/prod-datunhien.jpg',
    desc: 'Đá phân loại chất lượng cao phục vụ các công trình xây dựng hạ tầng kỹ thuật đô thị và công nghiệp.',
    href: '/da-tu-nhien1',
  },
  {
    id: 'nhua-duong-vun',
    title: 'Nhựa đường vụn tái sinh',
    image: '/images/prod-nhuaduong.jpg',
    desc: 'Gia công tái chế nhựa đường cào bóc thành hạt nhựa đường tái sinh làm nền đường chịu tải không nén.',
    href: '/nhua-duong-vun',
  },
  {
    id: 'phe-lieu-thi-cong',
    title: 'Phế liệu xây dựng phân loại',
    image: '/images/prod-catsanlap.png',
    desc: 'Phân loại triệt để gạch đá vụn, sắt thép phế liệu ngay tại công trình để tận thu tài nguyên tối đa.',
    href: '/phe-lieu-thi-cong',
  },
]

export const companyCounters = [
  { value: '300+', label: 'CÔNG TRÌNH HOÀN THÀNH' },
  { value: '2.000.000+', label: 'TẤN CTRXD ĐÃ XỬ LÝ' },
  { value: '60+', label: 'MÁY MÓC & XE CHUYÊN DỤNG' },
  { value: '100%', label: 'CHUẨN VỆ SINH MÔI TRƯỜNG' },
]

export const newsArticles = [
  {
    slug: 'cong-bo-bai-tap-ket-xu-ly-chat-thai-ran-xay-dung-tai-thuong-cat',
    url: 'https://htxgroup.vn/cong-bo-bai-tap-ket-xu-ly-chat-thai-ran-xay-dung-tai-thuong-cat',
    title: 'Công bố điểm tập kết và xử lý chất thải rắn xây dựng tại Ngõ 46 Liên Mạc, Thượng Cát',
    date: '08/11/2026',
    image: '/images/slider-3.jpg',
    excerpt: 'Công ty TNHH TM&DV Giải Pháp Hành Tinh Xanh chính thức công bố và vận hành điểm tập kết, trung chuyển và tái chế chất thải rắn xây dựng (CTRXD) quy chuẩn tại ngõ 46 Liên Mạc, phường Thượng Cát, quận Bắc Từ Liêm, Hà Nội...',
    content: `
      <p>Nhằm đáp ứng yêu cầu cấp thiết về xử lý chất thải rắn xây dựng (CTRXD) trên địa bàn thành phố Hà Nội và giảm thiểu tình trạng đổ trộm rác thải, <strong>Công ty TNHH TM&DV Giải Pháp Hành Tinh Xanh</strong> đã đầu tư xây dựng và đưa vào vận hành bãi tập kết, xử lý CTRXD tại <strong>Ngõ 46 Liên Mạc, Phường Thượng Cát, Quận Bắc Từ Liêm, Hà Nội</strong>.</p>
      <h2>Quy chuẩn vận hành xanh và hiện đại</h2>
      <p>Khu vực bãi tập kết được trang bị dây chuyền nghiền sàng hiện đại, hệ thống phun sương dập bụi tự động và trạm cân điện tử kiểm soát chặt chẽ khối lượng đầu vào và đầu ra. Tất cả các nguồn phế thải từ các công trình xây dựng, cải tạo nhà ở và dự án hạ tầng đều được phân loại kỹ lưỡng trước khi đưa vào dây chuyền tái chế.</p>
      <p>Với vị trí chiến lược ngay tại ngõ 46 Liên Mạc, trạm tiếp nhận tạo điều kiện vô cùng thuận tiện cho các phương tiện vận tải từ khu vực phía Tây và Tây Bắc Hà Nội ra vào giao nhận vật liệu.</p>
      <h2>Hotline liên hệ tiếp nhận: 0707 155 666</h2>
      <p>Quý khách hàng, nhà thầu và các đơn vị vận tải có nhu cầu trung chuyển hoặc xử lý phế thải xây dựng vui lòng liên hệ trực tiếp hotline <strong>0707 155 666</strong> hoặc văn phòng tại <strong>Tầng 4 tòa nhà Grandeur Palace 138 Giảng Võ, Ba Đình, Hà Nội</strong> để được hướng dẫn thủ tục tiếp nhận và cấp phiếu xác nhận bảo vệ môi trường.</p>
    `,
  },
  {
    slug: 'ha-noi-kiem-tra-xu-ly-dut-diem-tinh-trang-do-trom-rac-tren-vanh-dai-2-va-vanh-dai-3',
    url: 'https://htxgroup.vn/ha-noi-kiem-tra-xu-ly-dut-diem-tinh-trang-do-trom-rac-tren-vanh-dai-2-va-vanh-dai-3',
    title: 'Hà Nội: Kiểm tra, xử lý dứt điểm tình trạng đổ trộm rác trên Vành đai 2 và Vành đai 3',
    date: '5 Tháng 12, 2025',
    image: '/images/news-vanhdai2.jpg',
    excerpt: 'Chủ tịch UBND TP Hà Nội vừa chỉ đạo các sở ngành và quận huyện khẩn trương kiểm tra và xử lý triệt để tình trạng phế thải xây dựng bị đổ trộm, đồng thời khuyến khích đưa CTRXD về các bãi xử lý quy chuẩn...',
    content: `
      <p>UBND TP Hà Nội vừa phát đi chỉ đạo liên quan đến tình trạng rác và phế thải xây dựng bị đổ trộm dày đặc trên các tuyến đường huyết mạch, biến nhiều khu vực thành điểm ô nhiễm mất mỹ quan đô thị.</p>
      <p>UBND thành phố yêu cầu các chủ đầu tư, nhà thầu thi công xây dựng phải ký hợp đồng thu gom, vận chuyển và bàn giao chất thải rắn xây dựng cho các đơn vị có đủ năng lực xử lý, bãi tập kết được cấp phép như <strong>Hành Tinh Xanh</strong> tại ngõ 46 Liên Mạc, Thượng Cát, Bắc Từ Liêm.</p>
    `,
  },
  {
    slug: 'tao-dot-pha-trong-quan-ly-chat-thai-ran-xay-dung-o-ha-noi',
    url: 'https://htxgroup.vn/tao-dot-pha-trong-quan-ly-chat-thai-ran-xay-dung-o-ha-noi',
    title: 'Tạo đột phá trong quản lý chất thải rắn xây dựng: Giải pháp tái chế kinh tế tuần hoàn',
    date: '27 Tháng 6, 2025',
    image: '/images/news-nguyenxuandai.jpg',
    excerpt: 'Áp dụng công nghệ nghiền di động biến phế thải bê tông, gạch đá vỡ thành nguồn cát san lấp và cốt liệu mới, mở ra hướng đi bền vững cho đô thị thông minh...',
    content: `
      <p>Mỗi ngày Hà Nội phát sinh hàng nghìn tấn phế thải xây dựng. Nếu chỉ chôn lấp đơn thuần sẽ gây quá tải quỹ đất và ô nhiễm môi trường. Việc ứng dụng công nghệ tái chế của <strong>Công ty TNHH TM&DV Giải Pháp Hành Tinh Xanh</strong> giúp tái sinh hơn 85% lượng phế thải xây dựng thành sản phẩm có ích.</p>
    `,
  },
]
