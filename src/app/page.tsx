import { redirect } from 'next/navigation'
import { routing } from '@/i18n/routing'

export default async function LocaleRootPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || routing.defaultLocale

  if (!routing.locales.includes(locale)) {
    redirect(`/${routing.defaultLocale}`)
  } else {
    redirect(`/${locale}`)
  }
}
