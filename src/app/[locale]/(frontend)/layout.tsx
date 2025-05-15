import React from 'react'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { getMessages } from 'next-intl/server'
import Footer from '@/sections/Footer'
import BackgroundDecoration from '@/components/BackgroundDecoration'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const localeData = await params
  const { locale } = localeData

  const locales = ['en', 'nb']

  if (!hasLocale(locales, locale)) {
    notFound()
  }

  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="relative min-h-screen flex flex-col bg-black text-white">
        <BackgroundDecoration></BackgroundDecoration>
        <main className="flex-1 flex flex-col relative">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  )
}
