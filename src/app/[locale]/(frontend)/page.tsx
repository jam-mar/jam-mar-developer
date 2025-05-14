'use client'
import { FullPageProvider } from '@/context/index'
import NavBar from '@/components/NavBar'
import FullPageSections from '@/components/FullPageSections'
import Hero from '@/sections/Hero'
import AboutMe from '@/sections/AboutMe'
import Tech from '@/sections/Tech'
import Work from '@/sections/Work'
import Projects from '@/sections/Projects'
import Contact from '@/sections/Contact'
import { useLocale } from 'next-intl'
import './styles.css'
import '@/styles/globals.css'
import { DEFAULT_SECTION_IDS } from '@/constants/index'

export default function HomePage() {
  const locale = useLocale()

  return (
    <FullPageProvider sectionIds={DEFAULT_SECTION_IDS}>
      <NavBar scrollBehavior={true} />
      <main>
        <FullPageSections sectionIdsProp={DEFAULT_SECTION_IDS} locale={locale}>
          <Hero />
          <AboutMe />
          <Tech />
          <Work />
          <Projects />
          <Contact />
        </FullPageSections>
      </main>
    </FullPageProvider>
  )
}
