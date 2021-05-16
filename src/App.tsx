import playIcon from '@assets/icons/play.svg'
import resetIcon from '@assets/icons/reset.svg'
import Button from '@components/Button'
import Grid from '@components/Grid'
import { Step } from '@lib/search'
import { useEffect } from 'react'
import styled from 'styled-components'
import { usePuzzle } from './puzzle'
import { Theme } from './Theme'

const AppWrapper = styled.div`
  with: 100%;
  height: 100vh;
  background-color: var(--primaryLight);
  display: flex;
  align-items: center;
  flex-direction: column;
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

  console.log({ g: state.gridData })
  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      console.log(event.key)
      const code = event.code
      switch (code) {
        case 'Down':
        case 'ArrowDown':
          dispatch({ type: 'MOVE', payload: Step.Down })
          break
        case 'Up':
        case 'ArrowUp':
          dispatch({ type: 'MOVE', payload: Step.Up })
          break
        case 'Left':
        case 'ArrowLeft':
          dispatch({ type: 'MOVE', payload: Step.Left })
          break
        case 'Right':
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
  }

  const reset = () => {}

  return (
    <Theme>
      <AppWrapper>
        <Grid data={state.gridData} squareShift={90} />
        <ButtonContainer>
          <Button icon={playIcon} onClick={start} />
          <Button icon={resetIcon} onClick={reset} />
        </ButtonContainer>
      </AppWrapper>
    </Theme>
  )
}
