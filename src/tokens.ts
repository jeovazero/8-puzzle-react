export const FONT_FAMILY = {
  primary: '\'Viga\', sans-serif',
  secondary: '\'Pattaya\', sans-serif'
} as const

const lightColorFromHue = (hue: number) => `hsl(${hue}, 74%, 39%)`
const colorFromHue = (hue: number) => `hsl(${hue}, 79%, 28%)`

const colorTokens = (hue: number) =>
  ({
    primary: colorFromHue(hue),
    primaryLight: lightColorFromHue(hue)
  }) as const

export const THEME = {
  green: colorTokens(164),
  blue: colorTokens(194),
  purple: colorTokens(278),
  pink: colorTokens(308),
  red: colorTokens(338)
} as const

const isThemeColor = (t: string): t is ThemeColor => t in THEME

export const THEME_COLORS = Object.keys(THEME).filter(isThemeColor)

export type ThemeColor = keyof typeof THEME
