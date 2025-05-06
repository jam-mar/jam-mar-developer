import { headers as getHeaders } from 'next/headers.js'
import Hero from '@/sections/Hero'
import Image from 'next/image'
import PayLoadAdmin from '@/sections/PayloadAdmin'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import '@/styles/globals.css'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  // Await the params promise
  const { locale } = await params

  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <>
      <Hero locale={locale} />
      <PayLoadAdmin locale={locale} />
    </>
  )
}
