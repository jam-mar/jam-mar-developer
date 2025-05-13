'use client'
import { FullPageProvider } from '@/context/index'
import NavBar from '@/components/NavBar'
import FullPageSections from '@/components/FullPageSections'
import Hero from '@/sections/Hero'
import AboutMe from '@/sections/AboutMe'
import { useLocale } from 'next-intl'
import './styles.css'
import '@/styles/globals.css'

const HOME_PAGE_SECTION_IDS = ['hero', 'about', 'projects', 'work', 'contact', 'footer']

export default function HomePage() {
  const locale = useLocale()

  return (
    <FullPageProvider sectionIds={HOME_PAGE_SECTION_IDS}>
      <NavBar scrollBehavior={true} />
      <main>
        <FullPageSections sectionIdsProp={HOME_PAGE_SECTION_IDS} locale={locale}>
          <Hero />
          <AboutMe />
        </FullPageSections>
      </main>
    </FullPageProvider>
  )
}
