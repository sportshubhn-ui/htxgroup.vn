/**
 * Data Module for CÔNG TY TNHH TM&DV GIẢI PHÁP HÀNH TINH XANH (GREEN PLANET)
 * Website: htxgroup.vn
 * Slogan: "Cho hành tinh nhẹ gánh hơn."
 */

export interface NavItem {
  title: string
  href: string
  children?: { title: string; href: string }[]
}

export const companyInfo = {
  name: 'CÔNG TY TNHH TM&DV GIẢI PHÁP HÀNH TINH XANH',
  brandName: 'HÀNH TINH XANH',
  englishBrand: 'GREEN PLANET',
  shortName: 'HÀNH TINH XANH',
  abbreviation: 'GREEN PLANET (HTX)',
  slogan: 'Cho hành tinh nhẹ gánh hơn.',
  hotline: '0707 155 666',
  phoneAlt: '0707 155 666',
  email: 'info@htxgroup.vn',
  website: 'https://htxgroup.vn',
  domain: 'htxgroup.vn',
  officeAddress: 'Tầng 4, Tòa nhà Grandeur Palace, 138 Giảng Võ, Phường Kim Mã, Quận Ba Đình, TP. Hà Nội',
  yardAddress: 'Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội',
  yardNote: 'Bãi tập kết & Xử lý chất thải rắn xây dựng (Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội)',
  // Exact Google Maps Embed coordinates for Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14891.802319202157!2d105.740889!3d21.096317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134552b9b71e16b%3A0x6bbfec5eb1081518!2zTmfDtSA0NiBMacOqbiBN4bqhYywgVGjGsOG7o25nIEPDoXQsIFTDonkgSOG7kywgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1709971200000!5m2!1svi!2s',
  googleMapsDirectUrl: 'https://maps.google.com/?q=Ngõ+46+Liên+Mạc,+Thượng+Cát,+Hà+Nội',
  facebook: 'https://facebook.com/htxgroup.vn',
  zalo: 'https://zalo.me/0707155666',
}

export const navigationItems: NavItem[] = [
  {
    title: 'Trang Chủ',
    href: '/',
  },
  {
    title: 'Về chúng tôi',
    href: '/gioi-thieu',
    children: [
      { title: 'Tổng quan doanh nghiệp', href: '/gioi-thieu' },
      { title: 'Hồ sơ năng lực', href: '/ho-so-nang-luc' },
      { title: 'Kiểm soát chất lượng', href: '/chat-luong' },
      { title: 'Chính sách bảo mật', href: '/chinh-sach-bao-mat' },
      { title: 'Điều kiện giao dịch', href: '/dieu-kien-giao-dich' },
    ],
  },
  {
    title: 'Dịch vụ',
    href: '/dich-vu',
    children: [
      { title: 'Tất cả dịch vụ', href: '/dich-vu' },
      { title: 'Thu gom tại công trình', href: '/dich-vu/thu-gom' },
      { title: 'Vận chuyển chất thải', href: '/dich-vu/van-chuyen' },
      { title: 'Tiếp nhận & Tập kết tại bãi', href: '/dich-vu/tiep-nhan-tap-ket' },
      { title: 'Phân loại, xử lý & tái chế', href: '/dich-vu/phan-loai-tai-che' },
    ],
  },
  {
    title: 'Vật liệu',
    href: '/vat-lieu',
    children: [
      { title: 'Danh mục vật liệu', href: '/vat-lieu' },
      { title: 'Đá 1×2 xây dựng', href: '/vat-lieu/da-1x2' },
      { title: 'Cấp phối đá dăm', href: '/vat-lieu/cap-phoi-da-dam' },
      { title: 'Cát bê tông rửa sạch', href: '/vat-lieu/cat-be-tong' },
      { title: 'Cát xây tô', href: '/vat-lieu/cat-xay-to' },
      { title: 'Cát san lấp', href: '/vat-lieu/cat-san-lap' },
      { title: 'Cốt liệu tái chế (RCA)', href: '/vat-lieu/cot-lieu-tai-che' },
    ],
  },
  {
    title: 'Năng lực',
    href: '/nang-luc',
    children: [
      { title: 'Tổng quan năng lực', href: '/nang-luc' },
      { title: 'Bãi tập kết Ngõ 46 Liên Mạc', href: '/co-so/bai-tap-ket-lien-mac' },
      { title: 'Thiết bị & Đội xe', href: '/thiet-bi' },
      { title: 'Công nghệ tái chế', href: '/cong-nghe' },
    ],
  },
  {
    title: 'Tin tức & Báo chí',
    href: '/tin-tuc',
    children: [
      { title: 'Tin tức ngành & công ty', href: '/tin-tuc' },
      { title: 'Báo chí nói về chúng tôi', href: '/bao-chi' },
      { title: 'Thư viện hình ảnh', href: '/thu-vien' },
      { title: 'Tài liệu kỹ thuật', href: '/tai-lieu' },
      { title: 'Hỏi đáp (FAQ)', href: '/cau-hoi-thuong-gap' },
    ],
  },
  {
    title: 'Liên hệ',
    href: '/lien-he',
  },
]

export const homeHeroSlides = [
  {
    id: 1,
    image: '/images/banner-htx-engineers-crusher.jpg',
    badge: 'Kỹ sư Việt Nam & Chuyên gia quốc tế',
    title: 'Giải pháp thu gom & tái chế chất thải rắn xây dựng',
    desc: 'Công ty TNHH TM&DV Giải Pháp Hành Tinh Xanh với đội ngũ kỹ sư Việt Nam cùng chuyên gia quốc tế tiên phong mô hình xử lý trạc thải tuần hoàn khép kín, kết nối nguồn vật liệu xanh cho công trình Thủ đô.',
    primaryCtaText: 'Yêu cầu thu gom',
    primaryCtaLink: '/yeu-cau-bao-gia?type=thu-gom',
    secondaryCtaText: 'Tìm vật liệu',
    secondaryCtaLink: '/vat-lieu',
  },
  {
    id: 2,
    image: '/images/banner-htx-international-team.jpg',
    badge: 'Đội ngũ chuyên nghiệp',
    title: 'Hợp tác kỹ thuật & Đội xe vận chuyển đạt chuẩn',
    desc: 'Hệ thống xe ben phủ bạt cơ học kín 100%, đăng kiểm tiêu chuẩn, giám sát hiện trường chặt chẽ bởi đội ngũ kỹ sư chuyên ngành, đáp ứng mọi tiến độ thi công hạ tầng đô thị.',
    primaryCtaText: 'Báo giá vận chuyển',
    primaryCtaLink: '/yeu-cau-bao-gia?type=thu-gom',
    secondaryCtaText: 'Xem dịch vụ',
    secondaryCtaLink: '/dich-vu/van-chuyen',
  },
  {
    id: 3,
    image: '/images/banner-htx-facility-eco.jpg',
    badge: 'Cơ sở tiếp nhận hiện đại',
    title: 'Bãi tập kết & Xử lý tại Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội',
    desc: 'Quy mô tiếp nhận liên tục 24/7 với trạm cân điện tử tự động 80 tấn, đường ven đê rộng rãi cho các đoàn xe ben 2.5T đến 30T và xe đầu kéo tiếp cận thuận lợi.',
    primaryCtaText: 'Đăng ký vào bãi',
    primaryCtaLink: '/yeu-cau-bao-gia?type=dua-vao-bai',
    secondaryCtaText: 'Xem vị trí & bản đồ',
    secondaryCtaLink: '/co-so/bai-tap-ket-lien-mac',
  },
]

export const servicesData = [
  {
    slug: 'thu-gom',
    name: 'Thu gom chất thải xây dựng tại công trình',
    shortDesc: 'Khảo sát hiện trường, lập biện pháp thi công, đưa nhân công và máy móc xúc dọn trạc thải, bê tông phế liệu tận chân công trình.',
    iconName: 'Truck',
    image: '/images/service-thugom.jpg',
    targetCustomers: 'Chủ đầu tư, tổng thầu xây dựng, đơn vị cải tạo sửa chữa công trình dân dụng & công nghiệp.',
    scope: 'Toàn địa bàn Hà Nội và các khu đô thị lân cận.',
    acceptedWaste: ['Gạch ngói vỡ', 'Bê tông khối móng tháo dỡ', 'Vữa xi măng thừa', 'Xà bần cải tạo'],
    process: [
      'Tiếp nhận yêu cầu và tọa độ công trình qua hotline 0707 155 666',
      'Cán bộ kỹ thuật khảo sát hiện trường, khối lượng và điều kiện đường tiếp cận',
      'Lập phương án thu gom, điều phối máy xúc gầu kẹp và xe ben tương thích',
      'Thi công xúc dọn, vệ sinh mặt bằng, đảm bảo an toàn lao động và không rơi vãi',
      'Ký biên bản giao nhận khối lượng và bàn giao mặt bằng hoàn thiện'
    ]
  },
  {
    slug: 'van-chuyen',
    name: 'Vận chuyển chất thải xây dựng chuyên dụng',
    shortDesc: 'Đội ngũ xe ben đa tải trọng từ 2.5T đến 30T, thùng xe kín có bạt phủ cơ học, tuân thủ nghiêm ngặt quy định môi trường đô thị.',
    iconName: 'Navigation',
    image: '/images/service-vanchuyen.jpg',
    targetCustomers: 'Các dự án phá dỡ, công trình thi công tầng hầm, giải phóng mặt bằng hạ tầng giao thông.',
    scope: 'Các tuyến đường được cấp phép lưu hành xe tải tại Hà Nội.',
    acceptedWaste: ['Đất đào móng', 'Chất thải rắn tháo dỡ công trình', 'Bê tông vụn', 'Đá dăm phế thải'],
    process: [
      'Tiếp nhận lộ trình di chuyển và khung giờ xe chạy phù hợp',
      'Kiểm tra tình trạng thùng bạt và vệ sinh lốp xe trước khi rời công trường',
      'Giám sát lộ trình GPS đảm bảo vận chuyển đúng điểm tập kết hợp pháp',
      'Đổ thải đúng vị trí quy định tại Bãi Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội',
      'Xuất phiếu cân đối soát và xác nhận khối lượng vận chuyển'
    ]
  },
  {
    slug: 'tiep-nhan-tap-ket',
    name: 'Tiếp nhận & Tập kết chất thải rắn tại bãi Liên Mạc',
    shortDesc: 'Cơ sở bãi tập kết hợp pháp tại Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội. Trang bị trạm cân 80 tấn, tiếp nhận phương tiện 24/7.',
    iconName: 'Warehouse',
    image: '/images/service-tiepnhan.jpg',
    targetCustomers: 'Các đơn vị vận tải, đội xe tư nhân, nhà thầu xây dựng có nhu cầu đổ thải hợp pháp.',
    scope: 'Bãi tập kết Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội.',
    acceptedWaste: ['Bê tông tháo dỡ', 'Trạc thải gạch đá', 'Vữa xi măng', 'Đất đào sạch'],
    process: [
      'Phương tiện đến cổng bãi tại Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội',
      'Xe lên bàn cân điện tử tự động 80T kiểm tra tải trọng và phân loại sơ bộ',
      'Hướng dẫn xe vào phân khu đổ quy định theo từng loại chất thải',
      'Xe quay lại cân xuất tải để tính chính xác khối lượng ròng đã tiếp nhận',
      'Phát hành phiếu xuất nhập bãi có xác nhận'
    ]
  },
  {
    slug: 'phan-loai-tai-che',
    name: 'Phân loại, xử lý & nghiền sàng tái chế',
    shortDesc: 'Ứng dụng dây chuyền nghiền kẹp hàm và sàng phân tầng, tách lọc cốt thép và rác tạp, tạo ra cốt liệu tái chế chất lượng cao thay thế cát đá tự nhiên.',
    iconName: 'RefreshCw',
    image: '/images/service-taiche.jpg',
    targetCustomers: 'Dự án giao thông, công trình san nền, nhà máy sản xuất gạch không nung, công trình xanh ESG.',
    scope: 'Nhà máy xử lý & nghiền sàng tại bãi Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội.',
    acceptedWaste: ['Bê tông cốt thép phế thải', 'Đá tảng', 'Gạch vụn công trình'],
    process: [
      'Máy xúc lắp búa phá đá đập sơ cấp các khối bê tông quá khổ',
      'Máy kẹp hàm gắp phân tách cốt thép ra khỏi bê tông phế liệu',
      'Đưa phế liệu vào phễu cấp liệu máy nghiền đập thứ cấp',
      'Băng tải từ tính tự động hút sạch mạt sắt kim loại còn sót lại',
      'Sàng rung phân tách thành các cỡ hạt tiêu chuẩn: Cốt liệu 0-5mm, 10-25mm, cấp phối'
    ]
  }
]

export const productsData = [
  {
    slug: 'da-1x2',
    name: 'Đá 1×2 (Đá xây dựng bê tông)',
    category: 'Đá xây dựng',
    status: 'draft',
    verified: false,
    price: 'Liên hệ báo giá',
    unit: 'm³ / Tấn',
    specification: 'Cỡ hạt 10×25mm đến 10×28mm, đá dăm xanh xám sàng sạch bụi sét, hàm lượng hạt thoi dẹt thấp',
    applications: 'Đổ bê tông dầm, sàn, móng nhà cao tầng, cọc khoan nhồi, đường băng sân bay',
    image: '/images/materials-da-1x2.jpg',
    isRecycled: false
  },
  {
    slug: 'cap-phoi-da-dam',
    name: 'Cấp phối đá dăm (Loại 1 & Loại 2)',
    category: 'Đá xây dựng',
    status: 'draft',
    verified: false,
    price: 'Liên hệ báo giá',
    unit: 'm³ / Tấn',
    specification: 'Cỡ hạt từ 0 đến 37.5mm, cấp phối hạt liên tục đạt chuẩn đầm nén TCVN 8859:2011',
    applications: 'Làm lớp móng trên (Base) và móng dưới (Subbase) cho kết cấu đường giao thông, bến bãi',
    image: '/images/materials-capphoida.jpg',
    isRecycled: false
  },
  {
    slug: 'cat-be-tong',
    name: 'Cát bê tông (Cát vàng rửa sạch)',
    category: 'Cát xây dựng',
    status: 'draft',
    verified: false,
    price: 'Liên hệ báo giá',
    unit: 'm³ / Tấn',
    specification: 'Mô-đun độ lớn 2.0 - 3.3, cát vàng hạt to khai thác tự nhiên, rửa sạch bùn bụi < 1.5%',
    applications: 'Trộn bê tông thương phẩm mác cao, bê tông đúc sẵn, kết cấu chịu lực',
    image: '/images/materials-catbetong.jpg',
    isRecycled: false
  },
  {
    slug: 'cat-xay-to',
    name: 'Cát xây tô (Cát xây trát tường)',
    category: 'Cát xây dựng',
    status: 'draft',
    verified: false,
    price: 'Liên hệ báo giá',
    unit: 'm³ / Tấn',
    specification: 'Mô-đun độ lớn 1.0 - 1.5, sàng lọc sạch hoàn toàn sỏi cuội, độ mịn đồng đều',
    applications: 'Trộn vữa xây gạch, trát tường nội ngoại thất phẳng mịn chống nứt rạn chân chim',
    image: '/images/materials-catxayto.jpg',
    isRecycled: false
  },
  {
    slug: 'cat-san-lap',
    name: 'Cát san lấp mặt bằng',
    category: 'Cát xây dựng',
    status: 'draft',
    verified: false,
    price: 'Liên hệ báo giá',
    unit: 'm³ / Tấn',
    specification: 'Cát đen san nền, độ đầm chặt K90 - K95, hệ số thấm và thoát nước ổn định',
    applications: 'San lấp mặt bằng khu công nghiệp, móng công trình nhà xưởng, gia cố nền đất yếu',
    image: '/images/materials-catsanlap.jpg',
    isRecycled: false
  },
  {
    slug: 'cot-lieu-tai-che',
    name: 'Cốt liệu bê tông tái chế (RCA)',
    category: 'Vật liệu tái chế',
    status: 'draft',
    verified: false,
    price: 'Liên hệ báo giá ưu đãi',
    unit: 'm³ / Tấn',
    specification: 'Sản xuất 100% từ bê tông phế thải nghiền sàng, phân loại hạt 0-40mm, sạch sắt thép',
    applications: 'Tôn nền công trình xanh, đắp nền đường nội bộ, gia cố móng, giải pháp giảm phát thải CO2',
    image: '/images/materials-cotlieutaiche.jpg',
    isRecycled: true
  }
]

export const facilitiesData = [
  {
    id: 'bai-lien-mac',
    slug: 'bai-tap-ket-lien-mac',
    name: 'Bãi tập kết & Xử lý chất thải rắn xây dựng Hành Tinh Xanh',
    address: 'Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội',
    note: 'Bãi tập kết & Xử lý chất thải rắn xây dựng (Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội)',
    image: '/images/facility-lienmac.jpg',
    coordinates: '21.0963° N, 105.7485° E',
    openingHours: 'Hoạt động tiếp nhận 24/7 (Cả ngày Lễ & Chủ Nhật)',
    roadAccess: 'Đường ven đê Liên Mạc mở rộng, xe ben 3 chân, 4 chân, xe đầu kéo tiếp cận thuận lợi',
    weighbridge: 'Trạm cân điện tử tự động 80 tấn cảm biến kỹ thuật số chính xác',
    acceptedMaterials: [
      'Bê tông khối, dầm cột tháo dỡ công trình',
      'Gạch vỡ, vữa vụn, trạc xà bần xây dựng',
      'Đất đào móng công trình sạch'
    ],
    equipment: [
      'Dây chuyền máy nghiền kẹp hàm di động',
      'Máy sàng rung 3 tầng phân cấp cốt liệu',
      'Máy xúc bánh xích gầu kẹp chuyên dụng',
      'Hệ thống phun sương dập bụi áp lực cao'
    ]
  }
]

export const equipmentData = [
  {
    slug: 'may-nghien-kep-ham',
    name: 'Dây chuyền máy nghiền kẹp hàm cơ động',
    role: 'Nghiền đập thô bê tông khối lớn thành cốt liệu cỡ hạt theo yêu cầu',
    status: 'Đang vận hành tại bãi Liên Mạc',
    image: '/images/equip-crusher.jpg',
    features: ['Công suất nghiền 120-180 tấn/giờ', 'Cửa nạp rộng nhận khối bê tông kích thước lớn', 'Tích hợp băng tải từ tính tách kim loại']
  },
  {
    slug: 'may-sang-rung',
    name: 'Trạm máy sàng rung phân cấp cốt liệu',
    role: 'Phân loại hỗn hợp nghiền thành đá 1x2, mạt đá, và cấp phối dăm',
    status: 'Đang vận hành',
    image: '/images/equip-screen.jpg',
    features: ['3 tầng lưới sàng kích thước linh hoạt', 'Độ phân tách hạt chuẩn xác', 'Chống bít tắc hiệu quả']
  },
  {
    slug: 'doi-xe-ben',
    name: 'Đội xe tải ben 3 chân & 4 chân vận chuyển',
    role: 'Vận chuyển thu gom phế thải công trình và giao hàng vật liệu',
    status: 'Sẵn sàng điều động 24/7',
    image: '/images/fleet-trucks.jpg',
    features: ['Thùng xe phủ bạt kéo cơ học chống bụi', 'Đầy đủ đăng kiểm và giấy phép lưu hành đô thị', 'Giám sát lộ trình GPS thời gian thực']
  },
  {
    slug: 'may-xuc-gau-kep',
    name: 'Máy xúc bánh xích gầu kẹp thủy lực',
    role: 'Bốc dỡ, nạp phễu và phân tách sắt thép cốt bê tông tại bãi',
    status: 'Đang vận hành',
    image: '/images/equip-excavator.jpg',
    features: ['Gầu kẹp xoay linh hoạt 360 độ', 'Lực bóp mạnh mẽ bẻ gãy kết cấu bê tông', 'Hiệu suất nạp liệu liên tục']
  }
]

export const faqList = [
  {
    question: 'Bãi tập kết Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội tiếp nhận những loại chất thải nào?',
    category: 'Tiếp nhận',
    answer: 'Chúng tôi tiếp nhận chất thải rắn xây dựng không nguy hại gồm: bê tông tháo dỡ, gạch đá vỡ, trạc xà bần cải tạo, vữa xi măng thừa và đất đào móng sạch. Bãi không tiếp nhận rác thải sinh hoạt, hóa chất độc hại hoặc amiăng.'
  },
  {
    question: 'Quy trình đưa xe chở trạc thải vào đổ tại bãi Liên Mạc như thế nào?',
    category: 'Vận hành',
    answer: 'Lái xe đưa phương tiện đến cổng bãi tại Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội. Xe sẽ lên bàn cân điện tử 80T cân tổng trọng lượng, sau đó đổ thải theo vị trí hướng dẫn của điều phối viên, và quay lại cân xuất tải để lấy phiếu cân xác nhận khối lượng tịnh.'
  },
  {
    question: 'Hành Tinh Xanh có cung cấp dịch vụ thu gom trọn gói tại chân công trình không?',
    category: 'Dịch vụ',
    answer: 'Có. Chúng tôi nhận khảo sát và cung cấp giải pháp trọn gói: bố trí nhân công, máy xúc gầu kẹp dọn trạc thải, bốc lên xe ben và vận chuyển về bãi xử lý đúng quy định.'
  },
  {
    question: 'Cốt liệu bê tông tái chế (RCA) có đảm bảo chất lượng cho công trình không?',
    category: 'Vật liệu',
    answer: 'Cốt liệu tái chế của chúng tôi được sản xuất qua quy trình nghiền đập và sàng lọc kỹ lưỡng, tách sạch cốt thép và tạp chất. Sản phẩm đặc biệt thích hợp làm lớp móng đường nội bộ, tôn nền bãi xe, san lấp móng công trình xanh giúp giảm chi phí và bảo vệ tài nguyên.'
  },
  {
    question: 'Cách thức liên hệ khảo sát và nhận báo giá nhanh nhất?',
    category: 'Báo giá',
    answer: 'Quý khách vui lòng gọi Hotline 24/7: 0707 155 666 hoặc gửi thông tin qua form "Yêu cầu báo giá" trên website htxgroup.vn để được phản hồi trong vòng 30 phút.'
  }
]

export const newsArticles = [
  {
    slug: 'giai-phap-tai-che-chat-thai-ran-xay-dung-ha-noi',
    title: 'Giải pháp thu gom và tái chế chất thải rắn xây dựng theo mô hình kinh tế tuần hoàn',
    date: '08/11/2026',
    image: '/images/banner-htx-engineers-crusher.jpg',
    excerpt: 'Hà Nội đẩy mạnh áp dụng công nghệ nghiền sàng tái chế trạc thải xây dựng thành cốt liệu đạt chuẩn, giảm thiểu áp lực lên các bãi chôn lấp.',
    content: 'Thực trạng tốc độ đô thị hóa nhanh chóng tại Thủ đô dẫn đến hàng triệu tấn chất thải rắn xây dựng phát sinh mỗi năm từ các công trình cải tạo và phá dỡ. Giải pháp ứng dụng trạm nghiền kẹp hàm và sàng phân loại di động của Hành Tinh Xanh cho phép tái sinh tới 85% lượng phế thải bê tông thành cốt liệu cát đá chất lượng cao phục vụ san nền và đắp đường giao thông.'
  },
  {
    slug: 'cong-bo-diem-tap-ket-ctrxd-lien-mac-tay-ho',
    title: 'Công bố điểm tiếp nhận và tập kết chất thải rắn xây dựng tại Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội',
    date: '05/11/2026',
    image: '/images/banner-htx-facility-eco.jpg',
    excerpt: 'Cơ sở bãi tập kết với trạm cân điện tử tự động 80 tấn phục vụ tiếp nhận phế thải công trình 24/7 trên địa bàn Hà Nội.',
    content: 'Nhằm hỗ trợ các chủ đầu tư và nhà thầu có điểm đổ thải hợp pháp, Công ty TNHH TM&DV Giải Pháp Hành Tinh Xanh chính thức vận hành cơ sở bãi tập kết tại Ngõ 46 Liên Mạc - Thượng Cát - Hà Nội. Bãi được trang bị trạm cân 80T kiểm soát tải trọng, hệ thống phun sương dập bụi và máy móc cơ giới phân loại phế thải chuyên nghiệp.'
  },
  {
    slug: 'ung-dung-cot-lieu-be-tong-tai-che-rca',
    title: 'Ứng dụng cốt liệu bê tông tái chế (RCA) trong kết cấu áo đường và hạ tầng giao thông',
    date: '01/11/2026',
    image: '/images/materials-cotlieutaiche.jpg',
    excerpt: 'Cốt liệu RCA mang lại hiệu quả kinh tế vượt trội, tiết kiệm 25-30% chi phí vật tư và giảm lượng phát thải carbon cho các dự án.',
    content: 'Cốt liệu bê tông tái chế (Recycled Concrete Aggregate - RCA) sau khi được loại bỏ tạp chất và phân loại hạt theo TCVN 8859 có độ bền kháng nén và khả năng chịu tải tương đương cấp phối đá dăm tự nhiên, là vật liệu lý tưởng cho các lớp móng Subbase và nền đường nội bộ.'
  }
]
