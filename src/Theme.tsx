import styled from 'styled-components'
import { FONT_FAMILY, THEME } from './tokens'

const themeCss = Object
  .entries(THEME)
  .map(([key, values]) => `
    &[data-theme="${key}"] {
      --primary: ${values.primary};
      --primaryLight: ${values.primaryLight};
    }`)

const themeOptionCss = Object
  .entries(THEME)
  .map(([key, values]) => `
    &[data-color="${key}"] {
      background-color: ${values.primary};
      :after {
        background-color: ${values.primaryLight};
      }
    }`)

export const ThemeOption = styled.div`
  width: 24px;
  height: 24px;
  margin: 4px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transform: rotate(-15deg);
  transition: transform 0.25s ease;
  transform-origin: 50% 50%;
  border: 3px solid white;
  ${themeOptionCss};
  :hover {
    transform: scale(1.25) translateY(-6px);
  }
  :after {
    position: absolute;
    content: '';
    display: block;
    width: 24px;
    height: 12px;
    bottom: 0;
  }
  &[data-selected] {
    box-shadow: -1px 3px 3px 0px #aaa;
  }
`

export const Theme = styled.main`
  --primary: #560F80;
  --primaryLight: #781AAE;
  --fontFamilyPrimary: ${FONT_FAMILY.primary};
  --fontFamilySecondary: ${FONT_FAMILY.secondary};
  ${themeCss}
`
