import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { HomePage } from '@/pages/home/HomePage'
import { NewsPage } from '@/pages/NewsPage'
import { NewsDetailPage } from '@/pages/NewsDetailPage'
import { VideoPage } from '@/pages/VideoPage'
import { ContactPage } from '@/pages/ContactPage'
import { DynamicContentPage } from '@/pages/DynamicContentPage'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="py-24 text-center bg-gray-50 min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-6xl font-black text-emerald-700">404</h1>
      <p className="text-xl font-bold text-gray-800 mt-4">Không tìm thấy trang yêu cầu</p>
      <p className="text-sm text-gray-500 mt-2">Trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển sang địa chỉ mới.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-2.5 bg-emerald-700 text-white text-xs font-bold uppercase rounded-lg tracking-wider hover:bg-emerald-800 transition"
      >
        Về trang chủ
      </Link>
    </div>
  )
}

// All known path routes for Hành Tinh Xanh
const staticPaths = [
  'gioi-thieu',
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
  'ho-so-nang-luc',
  'ho-so-nang-luc/nguon-nhan-luc',
  'ho-so-nang-luc/nang-luc-thiet-bi',
  'san-pham',
  'category/san-pham',
  'san-pham-cua-toan-cau',
  'san-pham-cua-htx-group',
  'cat-san-lap',
  'be-tong-vun',
  'da-tu-nhien',
  'da-tu-nhien1',
  'nhua-duong-vun',
  'phe-lieu-thi-cong',
  'cac-du-an-tieu-bieu',
  'du-an-tieu-bieu',
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
      {
        path: 'tin-tuc',
        element: <NewsPage />,
      },
      {
        path: 'video',
        element: <VideoPage />,
      },
      {
        path: 'lien-he',
        element: <ContactPage />,
      },
      ...staticPaths.map((p) => ({
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
