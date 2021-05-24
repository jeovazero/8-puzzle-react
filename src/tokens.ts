export const FONT_FAMILY = {
  primary: '\'Viga\', sans-serif',
  secondary: '\'Pattaya\', sans-serif'
} as const

export const THEME = {
  purple: {
    primary: '#560F80',
    primaryLight: '#781AAE'
  },
  red: {
    primary: 'darkred',
    primaryLight: 'red'
  },
  orange: {
    primary: 'darkorange',
    primaryLight: 'orange'
  },
  blue: {
    primary: 'darkblue',
    primaryLight: 'blue'
  }
} as const

const isThemeColor = (t: string): t is ThemeColor => t in THEME

export const THEME_COLORS = Object.keys(THEME).filter(isThemeColor)

export type ThemeColor = keyof typeof THEME
