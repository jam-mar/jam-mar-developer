'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { Globe } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'

const LanguageSelector = () => {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  // Define available locales and their display names
  const locales = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'nb', name: 'Norsk', flag: '🇳🇴' },
  ]

  // Extract the path without the locale prefix - more robust approach
  const pathnameWithoutLocale = pathname.split('/').slice(2).join('/')

  const currentLocale = locales.find((l) => l.code === locale) || locales[0]

  // Handle language change
  const changeLanguage = (newLocale: string) => {
    const newPath = `/${newLocale}/${pathnameWithoutLocale}`
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="bg-primary/10 border-primary/20">
          <Globe className="h-4 w-4 mr-2" />
          <span>{currentLocale.flag}</span>
          <span className="ml-2">{currentLocale.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`cursor-pointer ${locale === lang.code ? 'font-medium' : ''}`}
            onClick={() => changeLanguage(lang.code)}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageSelector
