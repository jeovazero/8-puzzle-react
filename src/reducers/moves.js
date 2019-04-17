import { SET_MOVE, VERIFY_MOVE, RESET, SOLVING } from '../constants/actionTypes'
import { sumCoordinates, isValidMove, scalarMult } from './_utils'

const gridData = [8, 3, 2, 7, 4, 5, 1, 6, 0]

const grid = gridData.map((digit, i) => {
  return {
    digit,
    pos: {
      x: Math.trunc(i / 3),
      y: Math.trunc(i % 3)
    },
    delta: {
      x: 0,
      y: 0
    }
  }
})

const getBlankPosition = grid => {
  const { pos } = grid.filter(d => d.digit === 0)[0]
  return pos
}

const initialState = {
  grid,
  gridData,
  blankPosition: getBlankPosition(grid),
  targetPosition: { x: 0, y: 0 },
  targetDigit: 0,
  canAnimate: false,
  isSolving: false,
  shift: { x: 0, y: 0 }
}

const resolveSetMove = state => {
  const oldGrid = state.grid
  const oldGridData = state.gridData

  const { targetDigit, shift, targetPosition, blankPosition } = state

  const resolvePositionDelta = ({ digit, delta }) =>
    digit === 0
      ? { pos: targetPosition, delta: sumCoordinates(delta, shift) }
      : digit === targetDigit
        ? {
          pos: blankPosition,
          delta: sumCoordinates(delta, scalarMult(-1, shift))
        }
        : {}

  const grid = oldGrid.map(attr => {
    return { ...attr, ...resolvePositionDelta(attr) }
  })

  const gridData = oldGridData.map(d => {
    return d === 0 ? targetDigit : d === targetDigit ? 0 : d
  })

  return {
    grid,
    gridData,
    blankPosition: targetPosition,
    shift: { x: 0, y: 0 },
    canAnimate: false
  }
}

const verifyMove = ({ blankPosition, gridData }, shift) => {
  const nextPosition = sumCoordinates(blankPosition, shift)

  const [targetPosition, canAnimate] = isValidMove(nextPosition)
    ? [nextPosition, true]
    : [blankPosition, false]
  const targetDigit = gridData[targetPosition.y * 3 + targetPosition.x]

  return {
    targetPosition,
    targetDigit,
    shift,
    canAnimate
  }
}

export default function moves (state = initialState, action) {
  switch (action.type) {
    case VERIFY_MOVE:
      return { ...state, ...verifyMove(state, action.shift) }
    case SET_MOVE:
      return { ...state, ...resolveSetMove(state) }
    case RESET:
      return { ...initialState }
    case SOLVING:
      return { ...state, isSolving: action.bool }
    default:
      return state
  }
}
