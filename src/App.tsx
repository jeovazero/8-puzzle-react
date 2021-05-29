import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import Grid from '@components/Grid'
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

const AppWrapper = styled.div`
  height: 100vh;
  background-color: var(--primaryLight);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  transition: background-color 1.25s ease;

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
    font-size: 1.3125rem;
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
      margin-top: 0px;
    }
  }
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
          <Keys up='W' left='A' right='D' down='S' />
          <Keys up='▲' left='◄' right='►' down='▼' />
        </Stack>
      </AppWrapper>
    </Theme>
  )
}
