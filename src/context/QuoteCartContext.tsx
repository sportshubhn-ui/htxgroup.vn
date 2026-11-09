import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CartItem {
  slug: string
  name: string
  category: string
  unit: string
  quantity: number
  isRecycled?: boolean
  image?: string
}

interface QuoteCartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (slug: string) => void
  updateQuantity: (slug: string, quantity: number) => void
  clearCart: () => void
  totalCount: number
}

const QuoteCartContext = createContext<QuoteCartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'htx_quote_cart_v1'

export const QuoteCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
      console.error('Failed to save cart to localStorage', e)
    }
  }, [items])

  const addItem = (item: Omit<CartItem, 'quantity'>, quantity = 10) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === item.slug)
      if (existing) {
        return prev.map((i) =>
          i.slug === item.slug ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [...prev, { ...item, quantity }]
    })
  }

  const removeItem = (slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug))
  }

  const updateQuantity = (slug: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(slug)
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.slug === slug ? { ...i, quantity } : i))
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalCount = items.reduce((acc, i) => acc + i.quantity, 0)

  return (
    <QuoteCartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalCount }}
    >
      {children}
    </QuoteCartContext.Provider>
  )
}

export const useQuoteCart = () => {
  const context = useContext(QuoteCartContext)
  if (!context) {
    throw new Error('useQuoteCart must be used within a QuoteCartProvider')
  }
  return context
}
