import { ThemesEnum, THEME_DEFAULT } from './constants'
import { getThemeColors } from './themeVars'

const LS_KEY_THEME = `mando_THEME`

export function setLSTheme(theme: ThemesEnum) {
  return localStorage.setItem(LS_KEY_THEME, theme)
}

export function getLSTheme() {
  let theme: string | null = localStorage.getItem(LS_KEY_THEME)

  if (!theme || !ThemesEnum.hasOwnProperty(theme)) {
    theme = THEME_DEFAULT
    setLSTheme(theme as ThemesEnum)
  }

  return theme as ThemesEnum
}

function addRootClass(theme: ThemesEnum) {
  document.documentElement.classList.add(`theme-${theme.toLowerCase()}`)
}

function removeRootClass() {
  const root = document.documentElement
  const themeClass = new RegExp(/theme-[^\s]+/)

  root.className = root.className.replace(themeClass, '')
}

export function loadThemeColors(theme: ThemesEnum) {
  const themeToSet = ThemesEnum.hasOwnProperty(theme) ? theme : THEME_DEFAULT

  Object.entries(getThemeColors(themeToSet)).forEach(
    ([key, color]: [string, string]) => {
      document.documentElement.style.setProperty(`--${key}`, color)
    },
  )

  removeRootClass()
  addRootClass(themeToSet)
}
