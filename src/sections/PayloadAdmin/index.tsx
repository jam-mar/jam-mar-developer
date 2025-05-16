import Image from 'next/image'
import React from 'react'
import { getTranslations } from 'next-intl/server'
import payloadConfig from '@/payload.config'
// import { getPayload } from 'payload'
// import { headers as getHeaders } from 'next/headers.js'
// import config from '@/payload.config'
interface PayLoadAdminProps {
  locale: string
}

export default async function PayLoadAdmin({ locale }: PayLoadAdminProps) {
  // Get translations on the server
  // TODO: Create translations
  const t = await getTranslations({ locale, namespace: 'PayLoadAdmin' })

  // const headers = await getHeaders()
  // const payloadConfig = await config
  // const payload = await getPayload({ config: payloadConfig })
  // const { user } = await payload.auth({ headers })
  // const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`
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
