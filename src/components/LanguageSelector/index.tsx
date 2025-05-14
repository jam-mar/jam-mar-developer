'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Globe } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

const LanguageSelector = () => {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const locales = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'nb', name: 'Norsk', flag: '🇳🇴' },
  ]

  const pathnameWithoutLocale = pathname.split('/').slice(2).join('/')

  const currentLocale = locales.find((l) => l.code === locale) || locales[0]

  const changeLanguage = (newLocale: string) => {
    const newPath = `/${newLocale}/${pathnameWithoutLocale}`
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn(navigationMenuTriggerStyle(), 'flex items-center justify-center')}>
          <Globe className="h-4 w-4 mr-2" />
          <span>{currentLocale.name}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`cursor-pointer ${locale === lang.code ? 'font-medium' : ''}`}
            onClick={() => changeLanguage(lang.code)}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageSelector
