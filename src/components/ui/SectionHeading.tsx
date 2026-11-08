import React from 'react'
import { cn } from '@/utils/cn'

interface SectionHeadingProps {
  badge?: string
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl mb-12',
        centered ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {badge && (
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
