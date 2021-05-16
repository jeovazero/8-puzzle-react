import { AStar, makeSearchState, gridFromList, Step, pairSum, Pair, isValidPosition, pairEq } from '@lib/search'
import { useEffect, useReducer } from 'react'

type PuzzleState = {
    status: Status
    gridData: GridData
    movesQueue: Array<Step>
    initialList: Array<number>
}

type Action
    = { type: 'START' }
    | { type: 'RESET' }
    | { type: 'STOP' }
    | { type: 'MOVE', payload: Step }

enum Status {
    Running,
    Stopped
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
    delta: [0,0]
    }))
})

const makeStateFromList = (list: Array<number>): PuzzleState =>
  ({
    status: Status.Stopped,
    movesQueue: [],
    gridData: makeGridDataFromList(list),
    initialList: list
})

// Relative to zero position
const MOVES: Record<Step, Pair> = {
    [Step.Down]: [0,-1],
    [Step.Up]: [0,1],
    [Step.Left]: [1,0],
    [Step.Right]: [-1,0],
}

const pairToIndex = ([x,y]: Pair): number => y * 3 + x
const deltaFromPairs = ([a,b]: Pair, [c,d]: Pair): Pair => [a - c, b - d] 
const updateGridData = (step: Step, grid: GridData): GridData => {
  const zeroSquare = grid.data[grid.zeroIndex]
   const nextZeroPosition = pairSum(zeroSquare.position, MOVES[step])

   if (isValidPosition(nextZeroPosition)) {
     const nextIndex = grid.data.findIndex(el => pairEq(el.position, nextZeroPosition))
     const zeroIndex = grid.zeroIndex

     const nextSquare = grid.data[nextIndex]

     const nextData = [...grid.data]
     // Swapping
     nextData[zeroIndex] = {
        ...zeroSquare,
         delta: pairSum(zeroSquare.delta, deltaFromPairs(nextZeroPosition, zeroSquare.position)),
         position: nextZeroPosition
     }
     nextData[nextIndex] = {
         ...nextSquare,
        delta: pairSum(nextSquare.delta, deltaFromPairs(zeroSquare.position, nextSquare.position)),
        position: zeroSquare.position
     }

     return {
         ...grid,
         data: nextData
   }
   }

   return grid
} 

const solvePuzzle = (list: Array<number>) => {
    return  AStar(makeSearchState(gridFromList(list)))
}

const INITIAL_LIST = [8, 3, 2, 7, 4, 5, 1, 6, 0]
const INITIAL_STATE =  makeStateFromList(INITIAL_LIST)

const reducer = (state: PuzzleState, action: Action): PuzzleState => {
    switch(action.type) {
        case 'START':
            return {
                ...state,
                status: Status.Running
            }
        case 'STOP':
             return {
                ...state,
                status: Status.Stopped
        }
        case 'RESET':
            return {
                ...state,
                gridData: makeGridDataFromList(state.initialList),
                status: Status.Stopped
            }
        case 'MOVE':
            return {
                ...state,
                gridData: updateGridData(action.payload, state.gridData)
            }
        default: return state
    }
}

export const usePuzzle = () => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    useEffect(() => {
        const queue = state.movesQueue
        let timer: number | null;

        const tick = () => {
            if (!queue.length) return
            dispatch({ type: 'MOVE', payload: queue[0] })
            timer = setTimeout(tick, 500)
        }

        if (queue.length) {
            tick()
        } else {
            dispatch({ type: 'STOP' })
        }

        return () => {
            if(timer) clearTimeout(timer)
        }
    }, [state.movesQueue])

    return [state, dispatch] as const
}
