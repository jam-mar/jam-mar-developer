import React from 'react'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import './globals.css'
import Navbar from '@/components/NavBar'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <NextIntlClientProvider>
          <Navbar />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
