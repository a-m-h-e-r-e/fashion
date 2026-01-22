export const locales = ["en", "ar", "am", "om", "so", "ti"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  am: "አማርኛ",
  om: "Oromoo",
  so: "Soomaali",
  ti: "ትግርኛ",
};

export const rtlLocales: Locale[] = ["ar"];

export function isRtlLocale(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}
