import 'vite-plugin-svg-icons/register'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import App from './App'

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    padding: 0;
  }
`

ReactDOM.render(
  <StrictMode>
    <App />
    <GlobalStyle />
  </StrictMode>,
  document.getElementById('root')
)
