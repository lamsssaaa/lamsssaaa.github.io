export const LANGS = ['fr', 'en'] as const
export type Lang = (typeof LANGS)[number]

export const DEFAULT_LANG: Lang = 'fr'

/** Forces both languages to be present at compile time. */
export type Localized<T> = Record<Lang, T>

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value)
}

export function otherLang(lang: Lang): Lang {
  return lang === 'fr' ? 'en' : 'fr'
}

/** UI strings used by shared chrome (nav, buttons). */
export const UI: Localized<{
  nav: { work: string; services: string; clients: string; distinctions: string; about: string; contact: string }
  toggleTheme: string
  toggleLang: string
  menu: string
  close: string
  backToTop: string
}> = {
  fr: {
    nav: { work: 'Travaux', services: 'Services', clients: 'Clients', distinctions: 'Distinctions', about: 'À propos', contact: 'Contact' },
    toggleTheme: 'Changer de thème',
    toggleLang: 'English',
    menu: 'Menu',
    close: 'Fermer',
    backToTop: 'Haut de page',
  },
  en: {
    nav: { work: 'Work', services: 'Services', clients: 'Clients', distinctions: 'Awards', about: 'About', contact: 'Contact' },
    toggleTheme: 'Toggle theme',
    toggleLang: 'Français',
    menu: 'Menu',
    close: 'Close',
    backToTop: 'Back to top',
  },
}
