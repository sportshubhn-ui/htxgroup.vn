import { HeroSection } from './components/HeroSection'
import { StatsSection } from './components/StatsSection'
import { ServicesSection } from './components/ServicesSection'
import { AboutPreview } from './components/AboutPreview'
import { CtaSection } from './components/CtaSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <AboutPreview />
      <CtaSection />
    </>
  )
}
