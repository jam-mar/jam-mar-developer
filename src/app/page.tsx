import { redirect } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getLocale } from 'next-intl/server'

export default async function LocaleRootPage() {
  const locale = await getLocale()

  if (!locale.includes(locale)) {
    redirect(`/${routing.defaultLocale}`)
  } else {
    redirect(`/${locale}`)
  }
}
