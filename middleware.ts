import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'nb'],
  defaultLocale: 'en',
})

// Specify which routes should use the middleware
export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files
  // - etc.
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
