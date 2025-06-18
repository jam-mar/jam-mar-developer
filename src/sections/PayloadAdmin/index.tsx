import Image from 'next/image'
import React from 'react'
import { getTranslations } from 'next-intl/server'
import payloadConfig from '@/payload.config'
interface PayLoadAdminProps {
  locale: string
}

export default async function PayLoadAdmin({ locale }: PayLoadAdminProps) {
  const t = await getTranslations({ locale, namespace: 'PayLoadAdmin' })

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
        <h1>{t('heading')}</h1>
        <div className="links">
          <a
            className="admin"
            href={(await payloadConfig).routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
    </section>
  )
}
