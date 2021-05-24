import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import hintImg from '@assets/imgs/hint.svg'

import Grid from '@components/Grid'
import Hint from '@components/Hint'
import IconButton from '@components/IconButton'
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

  ${Hint} {
    margin-top: 140px;
  }

  p {
    margin: 12px 0;
    font-family: var(--fontFamily);
    color: white;
    font-size: 1rem;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    ${Content} {
      margin-left: 0px;
      width: 100%;
    }

    ${Hint} {
      padding: 0 100px;
      clear: both;
      width: 100px;
      margin-top: 20px;
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
  padding: 2px;
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

  return (
    <Theme data-theme={theme}>
      <AppWrapper>
        <Content>
          <Ribbon>8-Puzzle</Ribbon>
          <p>Solved with the A* Algorithm</p>
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
          <Grid data={state.gridData} squareShift={90} />
          <ButtonContainer>
            <IconButton type='play' onClick={start} />
            <IconButton type='reset' onClick={reset} />
          </ButtonContainer>
        </Content>
        <Hint img={hintImg}>
          Moves
        </Hint>
      </AppWrapper>
    </Theme>
  )
}
