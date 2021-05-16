import styled from 'styled-components'
import { Theme } from './Theme'
import { gridFromList } from './puzzle'
import Grid from '@components/Grid'

const AppWrapper = styled.div`
  with: 100%;
  height: 100vh;
  background-color: var(--primaryLight);
`

const INITIAL_STATE = gridFromList([8, 3, 2, 7, 4, 5, 1, 6, 0])

export default () => {
  const data = INITIAL_STATE 

  return (
    <Theme>
      <AppWrapper>
        <Grid data={data} />
      </AppWrapper>
    </Theme>
  )
}
