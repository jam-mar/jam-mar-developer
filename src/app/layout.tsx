import '@/styles/globals.css'
import React from 'react'

export const metadata = {
  description: 'James Marriott - Portfolio',
  keywords: 'James Marriott, Portfolio, Web Developer, Software Engineer',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  )
}
