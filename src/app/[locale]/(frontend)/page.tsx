import Hero from '@/sections/Hero'
import AboutMe from '@/sections/AboutMe'
// import PayLoadAdmin from '@/sections/PayloadAdmin'
import React from 'react'

import './styles.css'
import '@/styles/globals.css'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  // Await the params promise
  const { locale } = await params

  return (
    <>
      <Hero locale={locale} />
      <AboutMe locale={locale} />
      {/* <PayLoadAdmin locale={locale} /> */}
    </>
  )
}
