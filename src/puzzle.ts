import { gridFromList } from '@lib/grid'
import { isValidPosition, Pair, pairEq, pairSum } from '@lib/pair'
import {
  AStar,
  makeSearchState,
  Step,
} from '@lib/search'
import { useEffect, useReducer } from 'react'

type PuzzleState = {
  status: Status
  gridData: GridData
  solutionQueue: Array<Step>
  initialList: Array<number>
}

type Action =
  | { type: 'START' }
  | { type: 'RESET' }
  | { type: 'STOP' }
  | { type: 'MOVE'; payload: Step }
  | { type: 'RUN_SOLUTION' }

enum Status {
  Running,
  Stopped,
}

type SquareData = {
  digit: number
  position: Pair
  delta: Pair
}

export type GridData = {
  zeroIndex: number
  data: Array<SquareData>
}

const zeroIndexFromList = (list: Array<number>): number => {
  const index = list.findIndex(el => el === 0)

  if (index) return index
  throw Error('Invalida list. The a "zero" element is required')
}
const makeGridDataFromList = (list: Array<number>): GridData => ({
  zeroIndex: zeroIndexFromList(list),
  data: list.map((digit, i) => ({
    digit,
    position: [Math.trunc(i % 3), Math.trunc(i / 3)],
    delta: [0, 0],
  })),
})

const makeStateFromList = (list: Array<number>): PuzzleState => ({
  status: Status.Stopped,
  solutionQueue: [],
  gridData: makeGridDataFromList(list),
  initialList: list,
})

// Relative to zero position
// row x col
const MOVES: Record<Step, Pair> = {
  [Step.Down]: [0, -1],
  [Step.Up]: [0, 1],
  [Step.Left]: [1, 0],
  [Step.Right]: [-1, 0],
}

const pairToIndex = ([x, y]: Pair): number => y * 3 + x
const deltaFromPairs = ([a, b]: Pair, [c, d]: Pair): Pair => [a - c, b - d]
const updateGridData = (step: Step, grid: GridData): GridData => {
  const zeroSquare = grid.data[grid.zeroIndex]
  const nextZeroPosition = pairSum(zeroSquare.position, MOVES[step])

  if (isValidPosition(nextZeroPosition)) {
    const nextIndex = grid.data.findIndex(el =>
      pairEq(el.position, nextZeroPosition)
    )
    const zeroIndex = grid.zeroIndex

    const nextSquare = grid.data[nextIndex]

    const nextData = [...grid.data]
    // Swapping
    nextData[zeroIndex] = {
      ...zeroSquare,
      delta: pairSum(
        zeroSquare.delta,
        deltaFromPairs(nextZeroPosition, zeroSquare.position),
      ),
      position: nextZeroPosition,
    }
    nextData[nextIndex] = {
      ...nextSquare,
      delta: pairSum(
        nextSquare.delta,
        deltaFromPairs(zeroSquare.position, nextSquare.position),
      ),
      position: zeroSquare.position,
    }

    return {
      ...grid,
      data: nextData,
    }
  }

  return grid
}

const solvePuzzle = (state: PuzzleState) => {
  const list = Array(9)
  for (const item of state.gridData.data) {
    list[pairToIndex(item.position)] = item.digit
  }
  const ans = AStar(makeSearchState(gridFromList(list)))
  return ans
}

const INITIAL_LIST = [8, 3, 2, 7, 4, 5, 1, 6, 0]
// const INITIAL_LIST = [1, 2, 3, 4, 5, 6, 7, 0, 8]
const INITIAL_STATE = makeStateFromList(INITIAL_LIST)
const EMPTY_QUEUE: Array<Step> = []
const reducer = (state: PuzzleState, action: Action): PuzzleState => {
  switch (action.type) {
    case 'START':
      if (state.status === Status.Running) return state
      return {
        ...state,
        solutionQueue: solvePuzzle(state).answer?.path || EMPTY_QUEUE,
        status: Status.Running,
      }
    case 'STOP':
      return {
        ...state,
        solutionQueue: EMPTY_QUEUE,
        status: Status.Stopped,
      }
    case 'RESET':
      return {
        ...state,
        solutionQueue: EMPTY_QUEUE,
        gridData: makeGridDataFromList(state.initialList),
        status: Status.Stopped,
      }
    case 'MOVE':
      if (state.status === Status.Running) return state
      return {
        ...state,
        gridData: updateGridData(action.payload, state.gridData),
      }
    case 'RUN_SOLUTION':
      return state.solutionQueue.length
        ? {
          ...state,
          solutionQueue: state.solutionQueue.slice(1),
          gridData: updateGridData(state.solutionQueue[0], state.gridData),
        }
        : {
          ...state,
          status: Status.Stopped,
        }
    default:
      return state
  }
}

export const usePuzzle = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    if (state.status !== Status.Running) return
    let timer: number | null

    const tick = () => {
      dispatch({ type: 'RUN_SOLUTION' })
      timer = setTimeout(tick, 250)
    }

    tick()

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [state.status])

  return [state, dispatch] as const
}
