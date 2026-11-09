import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { HomePage } from '@/pages/home/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { ServicesPage } from '@/pages/ServicesPage'
import { ServiceDetailPage } from '@/pages/ServiceDetailPage'
import { MaterialsPage } from '@/pages/MaterialsPage'
import { MaterialDetailPage } from '@/pages/MaterialDetailPage'
import { FacilityDetailPage } from '@/pages/FacilityDetailPage'
import { EquipmentPage } from '@/pages/EquipmentPage'
import { TechnologyPage } from '@/pages/TechnologyPage'
import { QualityPage } from '@/pages/QualityPage'
import { CapabilityPage } from '@/pages/CapabilityPage'
import { PressPage } from '@/pages/PressPage'
import { MediaLibraryPage } from '@/pages/MediaLibraryPage'
import { FaqPage } from '@/pages/FaqPage'
import { PolicyPage } from '@/pages/PolicyPage'
import { QuoteRequestPage } from '@/pages/QuoteRequestPage'
import { ContactPage } from '@/pages/ContactPage'
import { NewsPage } from '@/pages/NewsPage'
import { NewsDetailPage } from '@/pages/NewsDetailPage'
import { VideoPage } from '@/pages/VideoPage'
import { AdminPage } from '@/pages/AdminPage'
import { DynamicContentPage } from '@/pages/DynamicContentPage'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="py-24 text-center bg-[#FFFCF6] min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-6xl font-black text-[#064D35]">404</h1>
      <p className="text-xl font-bold text-gray-800 mt-4">Không tìm thấy trang yêu cầu</p>
      <p className="text-sm text-gray-500 mt-2">Trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển sang địa chỉ mới.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-2.5 bg-[#064D35] hover:bg-[#043826] text-white text-xs font-bold uppercase rounded-xl tracking-wider transition"
      >
        Về trang chủ
      </Link>
    </div>
  )
}

// Backwards-compatible legacy content paths
const dynamicPaths = [
  'gioi-thieu/thong-tin-chung',
  'gioi-thieu/thu-ngo',
  'gioi-thieu/tam-nhin-su-menh',
  'gioi-thieu/cam-ket-cua-chung-toi',
  'gioi-thieu/qua-trinh-hinh-thanh-phat-trien',
  'linh-vuc-hoat-dong',
  'xu-ly-chat-thai-ran-xay-dung',
  'kinh-doanh-vat-lieu-xay-dung',
  'pha-do-cong-trinh-dan-dung-va-cong-nghiep',
  'thu-gom-taiche',
  'ho-so-nang-luc/nguon-nhan-luc',
  'ho-so-nang-luc/nang-luc-thiet-bi',
  'san-pham',
  'category/san-pham',
  'san-pham-cua-htx-group',
  'cat-san-lap',
  'be-tong-vun',
  'da-tu-nhien',
  'da-tu-nhien1',
  'nhua-duong-vun',
  'phe-lieu-thi-cong',
  'cac-du-an-tieu-bieu',
  'du-an-tieu-bieu',
  'du-an',
  'may-nghien-rm-70go',
  'pha-do-nha-b-tru-so-cong-an-thanh-pho-ha-noi',
  'hang-muc-tiep-nhan-cong-trinh-va-xu-ly-chat-thai-ran',
  'pha-do-bon-toa-nha-tai-dia-chi-so-138-pho-giang-vo-ha-noi',
  'pha-do-cong-trinh',
  'chat-luong-an-toan-cam-ket-trach-nhiem-tin-cay'
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // Về chúng tôi
      {
        path: 'gioi-thieu',
        element: <AboutPage />,
      },
      {
        path: 'ho-so-nang-luc',
        element: <CapabilityPage />,
      },
      {
        path: 'nang-luc',
        element: <CapabilityPage />,
      },
      {
        path: 'chat-luong',
        element: <QualityPage />,
      },
      // Dịch vụ
      {
        path: 'dich-vu',
        element: <ServicesPage />,
      },
      {
        path: 'dich-vu/:slug',
        element: <ServiceDetailPage />,
      },
      // Vật liệu & Báo giá
      {
        path: 'vat-lieu',
        element: <MaterialsPage />,
      },
      {
        path: 'vat-lieu/:slug',
        element: <MaterialDetailPage />,
      },
      {
        path: 'yeu-cau-bao-gia',
        element: <QuoteRequestPage />,
      },
      // Cơ sở & Thiết bị & Công nghệ
      {
        path: 'co-so',
        element: <FacilityDetailPage />,
      },
      {
        path: 'co-so/:slug',
        element: <FacilityDetailPage />,
      },
      {
        path: 'thiet-bi',
        element: <EquipmentPage />,
      },
      {
        path: 'thiet-bi/:slug',
        element: <EquipmentPage />,
      },
      {
        path: 'cong-nghe',
        element: <TechnologyPage />,
      },
      // Tin tức, báo chí, media, tài liệu, FAQ
      {
        path: 'tin-tuc',
        element: <NewsPage />,
      },
      {
        path: 'bao-chi',
        element: <PressPage />,
      },
      {
        path: 'thu-vien',
        element: <MediaLibraryPage />,
      },
      {
        path: 'tai-lieu',
        element: <CapabilityPage />,
      },
      {
        path: 'cau-hoi-thuong-gap',
        element: <FaqPage />,
      },
      {
        path: 'video',
        element: <VideoPage />,
      },
      // Liên hệ
      {
        path: 'lien-he',
        element: <ContactPage />,
      },
      // Chính sách
      {
        path: 'chinh-sach-bao-mat',
        element: <PolicyPage />,
      },
      {
        path: 'dieu-kien-giao-dich',
        element: <PolicyPage />,
      },
      // Admin CMS Demo
      {
        path: 'admin',
        element: <AdminPage />,
      },
      // Legacy paths
      ...dynamicPaths.map((p) => ({
        path: p,
        element: <DynamicContentPage />,
      })),
      {
        path: ':slug',
        element: <NewsDetailPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])
