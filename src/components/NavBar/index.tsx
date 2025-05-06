'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { Menu, X, Download } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import LanguageSelector from '@/components/LanguageSelector'

export default function NavBar() {
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations()

  const [isOpen, setIsOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [showFloatingNav, setShowFloatingNav] = useState(false)
  const previousScrollTop = useRef(0)
  const navBarRef = useRef(null)

  // Function to prefix links with locale
  const localizedHref = (path) => `/${locale}${path}`

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      // Show floating nav when we scroll down past 200px
      setShowFloatingNav(currentScrollY > 200)

      // Hide main nav when scrolling down and past threshold
      if (currentScrollY > previousScrollTop.current && currentScrollY > 50) {
        setIsVisible(false) // Hide when scrolling down
      } else {
        setIsVisible(true) // Show when scrolling up or at top
      }

      previousScrollTop.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Get the current section based on hash or path
  const getCurrentSection = () => {
    // If there's a hash in the URL, use that as the current section
    if (typeof window !== 'undefined' && window.location.hash) {
      return window.location.hash.substring(1) // Remove the # character
    }

    // Otherwise use the path
    const path = pathname?.split('/').pop() || ''
    return path === '' ? 'home' : path
  }

  const currentSection = getCurrentSection()

  return (
    <>
      {/* Main Navigation Bar */}
      <div
        ref={navBarRef}
        className={cn(
          'w-full bg-background/95 backdrop-blur-sm transition-all duration-300 z-50',
          scrollY > 0 ? 'border-b shadow-sm' : 'border-transparent',
          showFloatingNav ? 'absolute -top-24' : 'fixed top-0 left-0 right-0',
        )}
      >
        <div className="flex h-16 items-center px-4 container mx-auto">
          <Link href={localizedHref('/')} className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block">
              {t('navigation.brand', { fallback: 'James Marriott' })}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href={localizedHref('/')} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {t('navigation.home')}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href={localizedHref('/#about')} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {t('navigation.about_me')}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href={localizedHref('/#projects')} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {t('navigation.projects')}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href={localizedHref('/#contact')} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {t('navigation.contact')}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden ml-auto flex items-center">
            {/* Language Picker for Mobile */}
            <div className="mr-2">
              <LanguageSelector />
            </div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-foreground focus:outline-none" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[270px] sm:w-[300px] px-0 z-50">
                <div className="px-6 py-4 flex items-center justify-between">
                  <Link
                    href={localizedHref('/')}
                    className="font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('hero.name', { fallback: 'James Marriott' })}
                  </Link>
                  <SheetClose className="p-2 rounded-sm opacity-70 focus:outline-none">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </SheetClose>
                </div>
                <div className="px-6">
                  <nav className="flex flex-col">
                    <div className="py-3 border-b">
                      <Link
                        href={localizedHref('/')}
                        className="block w-full text-left py-2 hover:text-foreground transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {t('navigation.home')}
                      </Link>
                    </div>

                    <div className="py-3 border-b">
                      <Link
                        href={localizedHref('/#about')}
                        className="block w-full text-left py-2 hover:text-foreground transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {t('navigation.about_me')}
                      </Link>
                    </div>

                    <div className="py-3 border-b">
                      <Link
                        href={localizedHref('/#projects')}
                        className="block w-full text-left py-2 hover:text-foreground transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {t('navigation.projects')}
                      </Link>
                    </div>

                    <div className="py-3 border-b">
                      <Link
                        href={localizedHref('/#contact')}
                        className="block w-full text-left py-2 hover:text-foreground transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {t('navigation.contact')}
                      </Link>
                    </div>

                    {/* CV Download Button */}
                    <div className="mt-4 py-2">
                      <Link
                        href="/assets/developer-cv.pdf"
                        target="_blank"
                        className="flex items-center space-x-2 py-2 px-3 bg-primary/10 border border-primary/20 text-primary-foreground rounded-md text-sm"
                        download
                      >
                        <span>Download CV</span>
                        <Download className="h-4 w-4" />
                      </Link>
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Right Side - Language Picker and CV */}
          <div className="ml-auto hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <Link
              href="/assets/developer-cv.pdf"
              target="_blank"
              className="flex items-center space-x-2 py-1.5 px-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-md text-sm transition-colors"
              download
            >
              <span>{t('navigation.cv', { fallback: 'CV' })}</span>
              <Download className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Navigation */}
      <div
        className={cn(
          'fixed top-4 inset-x-0 hidden md:flex justify-center z-50 pointer-events-none transition-transform duration-300',
          showFloatingNav ? 'translate-y-0 opacity-100' : '-translate-y-16 opacity-0',
        )}
      >
        <nav className="flex space-x-4 py-2 px-5 items-center bg-background/90 backdrop-blur-lg rounded-full border border-border/50 shadow-md pointer-events-auto">
          <a
            href="#top"
            className={cn(
              'size-3 rounded-full transition-colors ease-in-out',
              currentSection === 'home' ? 'bg-primary' : 'bg-muted hover:bg-muted/80',
            )}
            aria-label="Go to top"
          />
          <NavLink href="#about" active={currentSection === 'about'}>
            {t('navigation.about_me')}
          </NavLink>
          <NavLink href="#projects" active={currentSection === 'projects'}>
            {t('navigation.projects')}
          </NavLink>
          <NavLink href="#contact" active={currentSection === 'contact'}>
            {t('navigation.contact')}
          </NavLink>
          <Link
            href="/assets/developer-cv.pdf"
            target="_blank"
            className="text-sm border bg-primary/10 border-primary/20 hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-1 flex transition-all duration-200 items-center space-x-1"
            download
          >
            <span>CV</span>
            <Download className="h-3.5 w-3.5" />
          </Link>
        </nav>
      </div>

      <div className="fixed top-0 right-0 h-screen hidden lg:flex flex-col justify-end z-40 pointer-events-none">
        <div className="flex flex-col space-y-6 px-5 items-center pb-8 pointer-events-auto">
          <a
            className="text-muted-foreground hover:text-foreground transition-colors"
            style={{ writingMode: 'vertical-rl' }}
            href="mailto:jamesrmarriott@gmail.com"
          >
            jamesrmarriott@gmail.com
          </a>
          <div className="mx-3 h-40 w-px bg-border"></div>
        </div>
      </div>
    </>
  )
}

// Helper component for navigation links
function NavLink({ href, active, children }) {
  return (
    <a
      href={href}
      className={cn(
        'text-sm hover:text-foreground hover:underline underline-offset-4 transition-colors ease-in-out',
        active ? 'text-foreground underline' : 'text-muted-foreground',
      )}
    >
      {children}
    </a>
  )
}
