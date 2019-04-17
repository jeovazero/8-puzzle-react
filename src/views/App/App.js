import React, { useEffect } from 'react'
import movesAction from '../../actions/moves'
import styled from 'styled-components'
import { connect } from 'react-redux'

// Components ==================
import GridSquares from '@/components/Squares/GridSquares'
import Button from '@/components/Button/Button'
import ButtonSet from '@/components/Button/ButtonSet'
import StyledTitle from '@/components/Title/Title'
import Hint from '@/components/Hint/Hint'
import Footer from '@/components/Footer/Footer'

// Assets ======================
import playIcon from '@/assets/icons/play.svg'
import resetIcon from '@/assets/icons/reset.svg'
import titleImg from '@/assets/imgs/title.svg'
import hintImg from '@/assets/imgs/hint.svg'
import nameImg from '@/assets/imgs/name.svg'

import CODE_KEY from '@/constants/keys'

const _keyHandler = (event, state, callback) => {
  const code = event.keyCode !== 0 ? event.keyCode : event.charCode
  console.log(event, event.keyCode, event.charCode, code)
  // notSolving
  if (!state.isSolving) {
    // this.resolveCode(code)
    callback(code)
  } else {
    console.log('STOP!')
  }
}

const _resolveCode = (code, actions) => {
  // console.log(this.props.grid)
  switch (code) {
    case CODE_KEY.LEFT:
    case CODE_KEY.A:
      actions.goLeft()
      break
    case CODE_KEY.W:
    case CODE_KEY.UP:
      actions.goUp()
      break
    case CODE_KEY.D:
    case CODE_KEY.RIGHT:
      actions.goRight()
      break
    case CODE_KEY.S:
    case CODE_KEY.DOWN:
      actions.goDown()
      break
    case CODE_KEY.ENTER:
      actions.start()
      break
    default:
      console.log(code)
  }
}

const App = ({ className, start, reset, goDown, goLeft, goRight, goUp, grid, isSolving }) => {
  const actions = {
    start, reset, goLeft, goRight, goUp, goDown
  }

  const resolveCode = (code) => _resolveCode(code, actions)

  useEffect(() => {
    const keyHandler = (e) => _keyHandler(e, { isSolving }, resolveCode)
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  }, [])

  return (
    <div className={className}>
      <div className='mid'>
        <StyledTitle img={titleImg} text='Solved with A* Algorithm' />
        <GridSquares grid={grid} squareShift={90}/>
        <ButtonSet>
          <Button icon={playIcon} onClick={start} />
          <Button icon={resetIcon} onClick={reset} />
        </ButtonSet>
      </div>
      <Hint text='Moves' img={hintImg} className='hint' />
      <Footer img={nameImg} className='name' />
    </div>
  )
}

// Redux ===================================
const mapStateToProps = state => ({
  grid: state.moves.grid,
  isSolving: state.moves.isSolving
})

const mapDispatchToProps = dispatch => ({
  goLeft: () => dispatch(movesAction.goleft()),
  goRight: () => dispatch(movesAction.goright()),
  goDown: () => dispatch(movesAction.godown()),
  goUp: () => dispatch(movesAction.goup()),
  reset: () => dispatch(movesAction.goreset()),
  start: () => dispatch(movesAction.start())
})

const _App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

// Styles ==================================
const AppStyled = styled(_App)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .mid {
    width: 400px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-left: 100px;
  }
  .hint {
    margin-top: 140px;
  }
  @media (max-width: 640px) {
    .mid {
      margin-left: 0px;
    }
    .hint {
      padding: 0 100px;
      clear: both;
      width: 100px;
      margin-top: 20px;
    }
  }
  .name {
    text-align: center;
    width: 100%;
  }
  @media (max-width: 480px) {
    .mid {
      width: 300px;
    }
  }
`

export default AppStyled
