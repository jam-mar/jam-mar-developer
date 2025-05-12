'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { Menu, X, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import LanguageSelector from '@/components/LanguageSelector'
import { useFullPage } from '@/context/index'

function SpaSectionNavLinkCtx({
  targetSectionId,
  children,
  onClick,
}: {
  targetSectionId: string
  children: React.ReactNode
  onClick?: () => void
}) {
  const { activeSectionId, navigateToSection, getSectionIds } = useFullPage()
  const sectionIds = getSectionIds()
  const isActive =
    activeSectionId === targetSectionId ||
    (targetSectionId === sectionIds[0] &&
      (activeSectionId === '' || activeSectionId === sectionIds[0]))

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    navigateToSection(targetSectionId)
    if (onClick) onClick()
  }

  return (
    <a
      href={`#${targetSectionId === sectionIds[0] ? '' : targetSectionId}`}
      onClick={handleClick}
      className={cn(
        'text-sm hover:text-foreground hover:underline underline-offset-4 transition-colors ease-in-out px-3 py-2 rounded-md',
        isActive ? 'text-foreground font-medium underline' : 'text-muted-foreground',
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </a>
  )
}

export default function NavBar({ scrollBehavior = false }) {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations()
  const { isFullPageActive, getSectionIds } = useFullPage()

  const SECTION_IDS = getSectionIds()

  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const previousScrollTop = useRef(0)
  const navBarRef = useRef<HTMLDivElement | null>(null)

  const effectiveScrollBehavior = isFullPageActive ? false : scrollBehavior

  const localizedHref = (path: string): string => {
    if (path.startsWith('/#')) return `/${locale}${path}`
    if (path === '/') return `/${locale}`
    return `/${locale}${path}`
  }

  useEffect(() => {
    if (!effectiveScrollBehavior) {
      setIsVisible(true)
      if (navBarRef.current) navBarRef.current.style.transform = ''
      return
    }
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const navHeight = navBarRef.current ? navBarRef.current.offsetHeight : 70
      if (currentScrollY > previousScrollTop.current && currentScrollY > navHeight * 1.2)
        setIsVisible(false)
      else if (currentScrollY < previousScrollTop.current) setIsVisible(true)
      previousScrollTop.current = currentScrollY < 0 ? 0 : currentScrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [effectiveScrollBehavior])

  const navItems = [
    { id: SECTION_IDS[0], labelKey: 'navigation.home', isRootPageLink: true },
    { id: SECTION_IDS[1], labelKey: 'navigation.about_me' },
    { id: SECTION_IDS[2], labelKey: 'navigation.projects' },
    { id: SECTION_IDS[3], labelKey: 'navigation.contact' },
    { id: SECTION_IDS[4], labelKey: 'navigation.work' },
    { id: SECTION_IDS[5], labelKey: 'navigation.footer' },
  ].slice(0, SECTION_IDS.length)

  return (
    <>
      <div
        ref={navBarRef}
        className={cn(
          'border-b z-50 bg-background/80 backdrop-blur-sm transition-transform duration-300 w-full',
          (effectiveScrollBehavior || isFullPageActive) && 'fixed top-0 left-0 right-0',
          effectiveScrollBehavior && !isVisible && '-translate-y-full',
        )}
      >
        <div className="flex h-16 items-center px-4 container mx-auto">
          <Link href={`/${locale}`} className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block">{t('navigation.brand')}</span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.id}>
                  {isFullPageActive ? (
                    <SpaSectionNavLinkCtx targetSectionId={item.id}>
                      {t(item.labelKey)}
                    </SpaSectionNavLinkCtx>
                  ) : (
                    <Link
                      href={
                        item.isRootPageLink ? localizedHref('/') : localizedHref(`/#${item.id}`)
                      }
                      passHref
                      legacyBehavior
                    >
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          (item.isRootPageLink &&
                            (pathname === `/${locale}` || pathname === '/')) ||
                            (typeof window !== 'undefined' &&
                              window.location.hash === `#${item.id}`)
                            ? 'font-medium text-foreground underline'
                            : 'text-muted-foreground',
                        )}
                      >
                        {t(item.labelKey)}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Navigation */}
          <div className="md:hidden ml-auto flex items-center">
            <div className="mr-2">
              <LanguageSelector />
            </div>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-foreground focus:outline-none" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[270px] sm:w-[300px] px-0 z-[60]">
                <div className="px-6 py-4 flex items-center justify-between">
                  <Link href={`/${locale}`} className="font-bold" onClick={() => setIsOpen(false)}>
                    {t('hero.name')}
                  </Link>
                  <SheetClose asChild>
                    <button className="p-2 rounded-sm opacity-70 focus:outline-none">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </button>
                  </SheetClose>
                </div>
                <div className="px-6">
                  <nav className="flex flex-col">
                    {navItems.map((item) => (
                      <div key={item.id} className="py-3 border-b">
                        {isFullPageActive ? (
                          <SpaSectionNavLinkCtx
                            targetSectionId={item.id}
                            onClick={() => setIsOpen(false)}
                          >
                            {t(item.labelKey)}
                          </SpaSectionNavLinkCtx>
                        ) : (
                          <Link
                            href={
                              item.isRootPageLink
                                ? localizedHref('/')
                                : localizedHref(`/#${item.id}`)
                            }
                            className={cn(
                              'block w-full text-left py-2 hover:text-foreground transition-colors',
                              (item.isRootPageLink &&
                                (pathname === `/${locale}` || pathname === '/')) ||
                                (typeof window !== 'undefined' &&
                                  window.location.hash === `#${item.id}`)
                                ? 'text-foreground font-medium'
                                : '',
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {t(item.labelKey)}
                          </Link>
                        )}
                      </div>
                    ))}
                    <div className="mt-4 py-2">
                      <a
                        href="/assets/developer-cv.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 py-2 px-3 bg-primary/10 border border-primary/20 text-primary rounded-md text-sm" // Adjusted colors for primary accent
                      >
                        <span>{t('navigation.cv')}</span>
                        <Download className="h-4 w-4" />
                      </a>
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="ml-auto hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <a
              href="/assets/developer-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 py-1.5 px-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-md text-sm transition-colors"
            >
              <span>{t('navigation.cv')}</span>
              <Download className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="fixed top-0 right-0 h-screen hidden lg:flex flex-col justify-end z-40 pointer-events-none">
        <div className="flex flex-col space-y-6 px-5 items-center pb-8 pointer-events-auto">
          <a
            className="text-muted-foreground hover:text-foreground transition-colors"
            style={{ writingMode: 'vertical-rl' }}
            href={`mailto:${t('hero.email')}`}
          >
            {t('hero.email')}
          </a>
          <div className="mx-3 h-24 sm:h-40 w-px bg-border"></div>
        </div>
      </div>
    </>
  )
}
