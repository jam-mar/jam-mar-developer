// Define our supported locales
export const routing = {
  locales: ["en", "nb"],
  defaultLocale: "en",
};

// Create a function to get the locale from a pathname
export function extractLocaleFromPathname(pathname: string) {
  const firstSegment = pathname.split("/")[1];
  return routing.locales.includes(firstSegment)
    ? firstSegment
    : routing.defaultLocale;
}

// Create a function to remove the locale from a pathname
export function removeLocaleFromPathname(pathname: string, locale: string) {
  if (!pathname || !locale) return pathname;
  return pathname.replace(new RegExp(`^/${locale}`), "") || "/";
}

// Create a function to add a locale to a pathname
export function addLocaleToPathname(pathname: string, locale: string) {
  if (!locale) return pathname;
  if (pathname === "/") return `/${locale}`;
  return `/${locale}${pathname}`;
}
