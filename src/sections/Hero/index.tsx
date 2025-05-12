'use client'

import Image from 'next/image'
import React from 'react'
import { useTranslations } from 'next-intl'

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="home">
      <div className="content">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        <p>{t('preTitle')}</p>
        <h1>{t('name')}</h1>
        <h2>{t('heading')}</h2>
        <h3>{t('subheading')}</h3>
        <div className="links"></div>
      </div>
    </section>
  )
}
