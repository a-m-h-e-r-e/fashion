
export const locales = [ 'en', 'ar', 'am', 'om', 'so', 'ti' ] as const
export type Locale = ( typeof locales )[number]
export const defaultLocale: Locale = 'en'
export const localeNames: Record<Locale, string> = {
  am : 'አማርኛ',
  ar : 'العربية',
  en : 'English',
  om : 'Oromoo',
  so : 'Soomaali',
  ti : 'ትግርኛ',
}
export const rtlLocales: Array<Locale> = [ 'ar' ]
export const isRtlLocale = ( locale: Locale ): boolean => rtlLocales.includes( locale )
