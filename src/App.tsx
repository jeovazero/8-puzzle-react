import styled from 'styled-components'
import { Theme } from './Theme'
import { makeStateFromList } from './puzzle'
import Grid from '@components/Grid'
import Button from '@components/Button'
import playIcon from '@assets/icons/play.svg'
import resetIcon from '@assets/icons/reset.svg'

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

const INITIAL_STATE = makeStateFromList([8, 3, 2, 7, 4, 5, 1, 6, 0])

export default () => {
  const data = INITIAL_STATE

  const start = () => {}
  const reset = () => {}

  return (
    <Theme>
      <AppWrapper>
        <Grid data={data} squareShift={90} />
        <ButtonContainer>
          <Button icon={playIcon} onClick={start} />
          <Button icon={resetIcon} onClick={reset} />
        </ButtonContainer>
      </AppWrapper>
    </Theme>
  )
}
