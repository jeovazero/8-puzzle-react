import { SET_MOVE, VERIFY_MOVE, RESET, SOLVING } from '../constants/actionTypes'
import CODE_KEY from '../constants/keys'
import helpers from './_helpersMove'

const SHIFT = {
  LEFT: { x: 1, y: 0 },
  RIGHT: { x: -1, y: 0 },
  UP: { x: 0, y: 1 },
  DOWN: { x: 0, y: -1 }
}

function verifyMove (shift) {
  return { type: VERIFY_MOVE, shift }
}

function setMove () {
  return { type: SET_MOVE }
}

function solving (bool) {
  return { type: SOLVING, bool }
}

function reset () {
  return { type: RESET }
}

function goreset () {
  return (dispatch, getState) => {
    const {
      moves: { isSolving }
    } = getState()
    console.log(isSolving)
    if (!isSolving) {
      dispatch(reset())
    } else {
      console.log("Is Solving! You can't reset now!")
    }
  }
}

function start () {
  return (dispatch, getState) => {
    const {
      moves: { gridData, isSolving }
    } = getState()
    console.log(gridData, isSolving)
    // notSolving
    if (!isSolving) {
      const validMoves = helpers.solveGrid(gridData)

      // sorry, for imperative code :(
      return new Promise(resolve => {
        let i = 0
        dispatch(solving(true))
        const exec = setInterval(function () {
          if (i === validMoves.length) {
            clearInterval(exec)
            dispatch(solving(false))
            resolve()
          }
          switch (validMoves[i++]) {
            case CODE_KEY.LEFT:
              dispatch(goleft())
              break
            case CODE_KEY.RIGHT:
              dispatch(goright())
              break
            case CODE_KEY.UP:
              dispatch(goup())
              break
            case CODE_KEY.DOWN:
              dispatch(godown())
              break
          }
        }, 260)
      })
    } else {
      console.log('ALREADY SOLVING! :D')
    }
  }
}

function go (shift) {
  return (dispatch, getState) => {
    // const {moves:{isRunning}} = getState();

    // isRunning ?
    // if(!isRunning){
    dispatch(verifyMove(shift))
    const {
      moves: { canAnimate }
    } = getState()

    // canAnimate ?
    if (canAnimate) {
      dispatch(setMove())
    }
    // }
  }
}

const goright = () => go(SHIFT.RIGHT)
const goleft = () => go(SHIFT.LEFT)
const godown = () => go(SHIFT.DOWN)
const goup = () => go(SHIFT.UP)

export default {
  goleft,
  goright,
  goup,
  godown,
  goreset,
  start
}
