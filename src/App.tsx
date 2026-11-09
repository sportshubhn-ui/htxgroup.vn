import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes'
import { QuoteCartProvider } from '@/context/QuoteCartContext'

export default function App() {
  return (
    <QuoteCartProvider>
      <RouterProvider router={router} />
    </QuoteCartProvider>
  )
}
