'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Download } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '../ui/sheet'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import React from 'react'

// Sample featured projects - replace with your actual data
const featuredProjects = [
  {
    id: '1',
    title: 'Portfolio Website',
    href: '/projects/portfolio',
    description: 'Modern responsive portfolio with Next.js and Tailwind',
    difficulty: 'Intermediate',
  },
  {
    id: '2',
    title: 'E-commerce Store',
    href: '/projects/ecommerce',
    description: 'Full-featured online store with cart and checkout',
    difficulty: 'Advanced',
  },
  {
    id: '3',
    title: 'Blog Platform',
    href: '/projects/blog',
    description: 'Content management system with markdown support',
    difficulty: 'Intermediate',
  },
  {
    id: '4',
    title: 'Dashboard UI',
    href: '/projects/dashboard',
    description: 'Analytics dashboard with charts and data visualization',
    difficulty: 'Advanced',
  },
]

// Available languages
const languages = [
  { code: 'en', name: 'English' },
  { code: 'no', name: 'Norsk' },
]

export default function DeveloperNavBar({ scrollBehavior = false }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const previousScrollTop = useRef(0)
  const navBarRef = useRef(null)

  // Get the current locale from the pathname
  const locale = pathname?.split('/')[1] || 'en'

  // Function to prefix links with locale
  const localizedHref = (path) => `/${locale}${path}`

  // Handle scroll effects if scrollBehavior is enabled
  useEffect(() => {
    if (!scrollBehavior) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      if (currentScrollY > previousScrollTop.current) {
        setIsVisible(false) // Hide when scrolling down
      } else {
        setIsVisible(true) // Show when scrolling up
      }

      previousScrollTop.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollBehavior])

  // Determine current section for highlighting nav items
  const getCurrentSection = () => {
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
          'border-b z-10 bg-background/80 backdrop-blur-sm transition-transform duration-300',
          scrollBehavior && 'fixed top-0 left-0 right-0',
          scrollBehavior && !isVisible && '-translate-y-full',
        )}
      >
        <div className="flex h-16 items-center px-4 container mx-auto">
          <Link href={localizedHref('/')} className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block">Dev Portfolio</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                <NavigationMenuContent className="z-50">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {featuredProjects.map((project) => (
                      <ListItem
                        key={project.id}
                        title={project.title}
                        href={localizedHref(project.href)}
                        description={project.description}
                        difficulty={project.difficulty}
                      />
                    ))}
                    <ListItem
                      className="col-span-2 bg-muted/50"
                      href={localizedHref('/projects')}
                      title="View All Projects"
                      description="Explore my full portfolio of development projects"
                    />
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href={localizedHref('/expertise')} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Expertise
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href={localizedHref('/work')} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Work
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href={localizedHref('/contact')} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden ml-auto flex items-center">
            {/* Language Picker for Mobile (smaller version) */}
            <div className="mr-2">
              <LanguageSelector languages={languages} currentLocale={locale} />
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
                    Dev Portfolio
                  </Link>
                  <SheetClose className="p-2 rounded-sm opacity-70 focus:outline-none">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </SheetClose>
                </div>
                <div className="px-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="projects" className="border-b">
                      <AccordionTrigger className="py-3">Projects</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-2 pl-1">
                          {featuredProjects.map((project) => (
                            <Link
                              key={project.id}
                              href={localizedHref(project.href)}
                              className="py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              {project.title}
                              <span className="ml-2 inline-block px-2 py-0.5 text-xs rounded-full bg-muted">
                                {project.difficulty}
                              </span>
                            </Link>
                          ))}
                          <Link
                            href={localizedHref('/projects')}
                            className="py-2 text-sm font-medium text-foreground hover:underline"
                            onClick={() => setIsOpen(false)}
                          >
                            View All Projects →
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="expertise" className="border-b">
                      <AccordionTrigger className="py-3">Expertise</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-2 pl-1">
                          <Link
                            href={localizedHref('/expertise/frontend')}
                            className="py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            Frontend Development
                          </Link>
                          <Link
                            href={localizedHref('/expertise/backend')}
                            className="py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            Backend Development
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="mt-2 border-b py-3">
                    <Link
                      href={localizedHref('/work')}
                      className="block w-full text-left py-2 hover:text-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Work
                    </Link>
                  </div>

                  <div className="mt-2 border-b py-3">
                    <Link
                      href={localizedHref('/contact')}
                      className="block w-full text-left py-2 hover:text-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Contact
                    </Link>
                  </div>

                  {/* CV Download Button */}
                  <div className="mt-4 py-2">
                    <a
                      href="/assets/developer-cv.pdf"
                      target="_blank"
                      className="flex items-center space-x-2 py-2 px-3 bg-primary text-primary-foreground rounded-md text-sm"
                      download
                    >
                      <span>Download CV</span>
                      <Download className="h-4 w-4" />
                    </a>
                  </div>

                  {/* Language Selection in Mobile Menu */}
                  <div className="mt-6 pb-4">
                    <h3 className="text-sm font-medium mb-2">Language</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          className={cn(
                            'text-sm py-2 px-3 rounded-md text-left transition-colors',
                            locale === lang.code
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted hover:bg-muted/80',
                          )}
                          onClick={() => {
                            // Get the path without the locale
                            const pathWithoutLocale = pathname?.split('/').slice(2).join('/') || ''
                            // Navigate to the same page but with new locale
                            window.location.href = `/${lang.code}/${pathWithoutLocale}`
                            setIsOpen(false)
                          }}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Right Side - Language Picker and CV */}
          <div className="ml-auto hidden md:flex items-center space-x-4">
            <LanguageSelector languages={languages} currentLocale={locale} />
            <a
              href="/assets/developer-cv.pdf"
              target="_blank"
              className="flex items-center space-x-2 py-1.5 px-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-md text-sm transition-colors"
              download
            >
              <span>CV</span>
              <Download className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Optional Floating Navigation for Single Page Applications */}
      {scrollBehavior && (
        <div className="fixed top-4 inset-x-0 hidden md:flex justify-center z-50 pointer-events-none">
          <nav className="flex space-x-4 py-2 px-5 items-center bg-background/45 backdrop-blur-lg rounded-full border border-border/50 shadow-md pointer-events-auto">
            <a
              href="#top"
              className={cn(
                'size-3 rounded-full transition-colors ease-in-out',
                currentSection === 'home' ? 'bg-primary' : 'bg-muted hover:bg-muted/80',
              )}
              aria-label="Go to top"
            />
            <NavLink href="#projects" active={currentSection === 'projects'}>
              Projects
            </NavLink>
            <NavLink href="#expertise" active={currentSection === 'expertise'}>
              Expertise
            </NavLink>
            <NavLink href="#work" active={currentSection === 'work'}>
              Work
            </NavLink>
            <NavLink href="#contact" active={currentSection === 'contact'}>
              Contact
            </NavLink>
            <a
              href="/assets/developer-cv.pdf"
              target="_blank"
              className="text-sm border border-border hover:border-foreground rounded-md px-2 py-1 flex hover:bg-accent hover:text-accent-foreground transition-all duration-200 items-center space-x-1"
              download
            >
              <span>CV</span>
              <Download className="h-3.5 w-3.5" />
            </a>
          </nav>
        </div>
      )}

      {/* Optional Side Email for Portfolio Sites */}
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

// Language Selector Component
function LanguageSelector({ languages, currentLocale }) {
  const pathname = usePathname()

  return (
    <div className="relative inline-block">
      <select
        className="appearance-none bg-muted/60 border border-border rounded-md py-1 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        value={currentLocale}
        onChange={(e) => {
          // Get the path without the locale
          const pathWithoutLocale = pathname?.split('/').slice(2).join('/') || ''
          // Navigate to the same page but with new locale
          window.location.href = `/${e.target.value}/${pathWithoutLocale}`
        }}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  )
}

interface ListItemProps extends React.ComponentPropsWithoutRef<'a'> {
  title: string
  description?: string
  difficulty?: string
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, ListItemProps>(
  ({ className, title, description, difficulty, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <div className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
              {description}
              {difficulty && (
                <span className="block mt-1 text-xs font-medium uppercase">{difficulty}</span>
              )}
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = 'ListItem'
