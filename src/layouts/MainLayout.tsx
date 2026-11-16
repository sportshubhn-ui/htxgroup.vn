import { Outlet } from 'react-router-dom'
import { Header } from '@/components/common/Header'
import { Footer } from '@/components/common/Footer'
import { ScrollToTop } from '@/components/common/ScrollToTop'

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 antialiased selection:bg-emerald-100 selection:text-emerald-900 w-full max-w-full overflow-x-hidden">
      <ScrollToTop />
      <Header />
      <main className="flex-grow w-full max-w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
