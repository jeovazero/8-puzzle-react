import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import Grid from '@components/Grid'
import { Icon } from '@components/Icon'
import IconButton from '@components/IconButton'
import Keys from '@components/Keys'
import Ribbon from '@components/Ribbon'

import { Step } from '@lib/search'

import { usePuzzle } from './puzzle'
import { Theme, ThemeOption } from './Theme'
import type { ThemeColor } from './tokens'
import { THEME_COLORS } from './tokens'

const Content = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  align-items: center;
`

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  & > * + * {
    margin-top: 12px;
  }
`

const Head = styled.h2`
  text-align: center;
  color: white;
  font-family: var(--fontFamilyPrimary);
  margin: 0;
  font-weight: normal;
  font-size: 1.25rem;
`

const Footer = styled.footer`
  margin: auto;
  padding: 64px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  & > * {
    margin: 8px auto;
  }
  span {
    color: white;
  }
  p {
    color: hsl(359, 0%, 90%);
  }
  a {
    text-decoration: none;
    color: hsl(359, 0%, 90%);

    span {
      display: inline-block;
    }

    & > span:after {
      content: '';
      display: block;
      width: 90%;
      margin: auto;
      height: 0px;
      border: 1px dashed white;
    }

    :hover > span:after {
      border: 1px solid white;
    }
  }
  div > a {
    display: flex;
    align-items: center;
        > * + * {
      margin-left: 8px;
    }
  }
  ${Icon} {
    fill: white;
  }
`

const KeysContainer = styled.div`
  & > * + * {
    margin: 12px auto;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  ${Ribbon} {
    margin: 24px 0 0 0;
  }

  ${Stack} {
    margin-top: 140px;
  }

  p {
    margin: 12px 0;
    font-family: var(--fontFamilyPrimary);
    color: white;
    font-size: 1rem;
  }

  h3 {
    padding: 0;
    font-family: var(--fontFamilySecondary);
    font-weight: normal;
    color: white;
    transition: opacity 0.5s ease, max-height 0.5s ease, margin 0.25s ease;
    max-height: 0px;
    overflow: hidden;
    margin: 0px;
    opacity: 0;
    &[data-show] {
       opacity: 1;
       max-height: 35px;
       margin: 16px;
    }
  }

  @media (max-width: 640px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    ${Content} {
      margin-left: 0px;
      width: 100%;
    }

    ${Stack} {
      margin-top: 32px;
    }

    ${KeysContainer} {
      display: flex;

      & > * {
        margin: auto 8px;
      }
    }
  }
`

const AppWrapper = styled.div`
  min-height: 100vh;
  background-color: var(--primaryLight);
  transition: background-color 1.25s ease;
  color: white;
  font-family: var(--fontFamilyPrimary);
`

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  margin: 10px;
  div {
    margin: 0 10px;
  }
`

const Colors = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 4px;
  box-shadow: 0px 2px 1px 1px #aaa;
`

function useHandler<T>(value: T) {
  const [state, setState] = useState<T>(value)

  const handler = useCallback((value: T) =>
    () => {
      setState(value)
    }, [])

  return [state, handler] as const
}

export default () => {
  const [state, dispatch] = usePuzzle()
  const [theme, handleTheme] = useHandler<ThemeColor>('purple')

  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'Down':
        case 'KeyS':
        case 'ArrowDown':
          dispatch({ type: 'MOVE', payload: Step.Down })
          break
        case 'Up':
        case 'KeyW':
        case 'ArrowUp':
          dispatch({ type: 'MOVE', payload: Step.Up })
          break
        case 'Left':
        case 'KeyA':
        case 'ArrowLeft':
          dispatch({ type: 'MOVE', payload: Step.Left })
          break
        case 'Right':
        case 'KeyD':
        case 'ArrowRight':
          dispatch({ type: 'MOVE', payload: Step.Right })
          break
        default:
          break
      }
    }

    document.addEventListener('keydown', keyListener)

    return () => {
      document.removeEventListener('keydown', keyListener)
    }
  }, [dispatch])

  const start = () => {
    dispatch({ type: 'START' })
  }

  const reset = () => {
    dispatch({ type: 'RESET' })
  }

  const random = () => {
    dispatch({ type: 'RANDOM' })
  }

  return (
    <Theme data-theme={theme}>
      <AppWrapper>
        <ContentWrapper>
          <Content>
            <Ribbon>8-Puzzle</Ribbon>
            <p>Solved with the A* Algorithm</p>
            <Grid data={state.gridData} squareShift={90} />
            {<h3 data-show={state.isFinalState ? '' : undefined}>Complete!</h3>}
            <Colors>
              {THEME_COLORS.map(color =>
                <ThemeOption
                  key={color}
                  data-color={color}
                  data-selected={theme === color ? '' : undefined}
                  onClick={handleTheme(color)}
                />
              )}
            </Colors>
            <ButtonContainer>
              <IconButton type='play' onClick={start} />
              <IconButton type='reset' onClick={reset} />
              <IconButton type='random' onClick={random} />
            </ButtonContainer>
          </Content>
          <Stack>
            <Head>Controls</Head>
            <KeysContainer>
              <Keys up='W' left='A' right='D' down='S' />
              <Keys up='▲' left='◄' right='►' down='▼' />
            </KeysContainer>
          </Stack>
        </ContentWrapper>
        <Footer>
          <div>
            <a
              target='_blank'
              href='https://github.com/jeovazero/8-puzzle-react'
            >
              <Icon type='github-mark' />
              <span>Source Code</span>
            </a>
          </div>
          <p>
            A side project by{" "}
            <a target='_blank' href='https://github.com/jeovazero'>
              <span>jeovazero</span>
            </a>
          </p>
        </Footer>
      </AppWrapper>
    </Theme>
  )
}
