import { useEffect } from 'react'
import styled from 'styled-components'

import playIcon from '@assets/icons/play.svg'
import resetIcon from '@assets/icons/reset.svg'
import hintImg from '@assets/imgs/hint.svg'
import titleImg from '@assets/imgs/title.svg'

import Button from '@components/Button'
import Grid from '@components/Grid'
import Title from '@components/Title'
import Hint from '@components/Hint'

import { Step } from '@lib/search'

import { usePuzzle } from './puzzle'
import { Theme } from './Theme'

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

  ${Hint} {
    margin-top: 140px;
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

export default () => {
  const [state, dispatch] = usePuzzle()

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
  }, [])

  const start = () => {
    dispatch({ type: 'START' })
  }

  const reset = () => {
    dispatch({ type: 'RESET' })
  }

  return (
    <Theme>
      <AppWrapper>
        <Content>
          <Title img={titleImg}>
            Solved with A* Algorithm
          </Title>
          <Grid data={state.gridData} squareShift={90} />
          <ButtonContainer>
            <Button icon={playIcon} onClick={start} />
            <Button icon={resetIcon} onClick={reset} />
          </ButtonContainer>
        </Content>
        <Hint img={hintImg}>
          Moves
        </Hint>
      </AppWrapper>
    </Theme>
  )
}
