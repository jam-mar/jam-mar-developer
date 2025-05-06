import '@/styles/globals.css'
import Navbar from '@/components/NavBar'
import React from 'react'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// export default async function RootLayout(props: { children: React.ReactNode }) {
//   const { children } = props

//   return (
//     <html lang="en">
//       <body>
//         <NextIntlClientProvider>
//           <Navbar />
//           <main>{children}</main>
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   )
// }

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  // Validate that the locale exists
  if (!routing.locales.includes(locale)) notFound()

  // Load messages
  let messages
  try {
    messages = (await import(`@/i18n/messages/${locale}.json`)).default
  } catch (error) {
    messages = {}
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
