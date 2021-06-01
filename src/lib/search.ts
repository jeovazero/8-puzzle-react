/*!
 * Copyright(c) 2021 Jeová Pereira Gomes (@jeovazero <contato@jeova.ninja>)
 * MIT Licensed
 */

import type { Grid } from './grid'
import { copyGrid, manhattanDistance } from './grid'
import { Heap } from './heap'
import type { Pair } from './pair'
import { isValidPosition, MAX_BOUND, pairSum } from './pair'

// Key
type Key = string

const keyFromGrid = (grid: Grid) => {
  let key = ''
  for (const row of grid) {
    for (const n of row) key += n.toString()
  }
  return key
}

// Step
export enum Step {
  Up = '^',
  Left = '<',
  Down = 'v',
  Right = '>'
}

// col X row
const STEPS: Array<[Step, Pair]> = [
  [Step.Up, [1, 0]],
  [Step.Left, [0, 1]],
  [Step.Down, [-1, 0]],
  [Step.Right, [0, -1]]
]

// State
type State = {
  cost: number
  path: Array<Step>
  depth: number
  key: Key
  zeroPosition: Pair
  grid: Grid
}

const isFinalState = (state: State) => state.key === '123456780'

export const makeSearchState = (grid: Grid): State => ({
  cost: 0,
  path: [],
  depth: 0,
  key: keyFromGrid(grid),
  zeroPosition: zeroPairFromGrid(grid),
  grid
})

const zeroPairFromGrid = (grid: Grid): Pair => {
  for (let i = 0; i <= MAX_BOUND; i++) {
    for (let j = 0; j <= MAX_BOUND; j++) {
      if (grid[i][j] == 0) return [i, j]
    }
  }

  throw Error('Wrong Grid')
}

type DataStructure = {
  add(state: State): void
  extract(): State
  size(): number
  isEmpty(): boolean
  cost(state: State): number
}

const search = (initialState: State, data: DataStructure) => {
  data.add(initialState)

  const visitedStates = new Set<Key>()

  do {
    const currentState = data.extract()

    if (isFinalState(currentState)) {
      return currentState
    }

    if (visitedStates.has(currentState.key)) {
      continue
    }
    else {
      visitedStates.add(currentState.key)
    }

    STEPS.forEach(([step, move]) => {
      const nextZeroPosition = pairSum(currentState.zeroPosition, move)

      if (isValidPosition(nextZeroPosition)) {
        const [nextX, nextY] = nextZeroPosition
        const [oldX, oldY] = currentState.zeroPosition

        // Swap
        const nextGrid = copyGrid(currentState.grid)
        const tmp = nextGrid[nextX][nextY]
        nextGrid[nextX][nextY] = nextGrid[oldX][oldY]
        nextGrid[oldX][oldY] = tmp

        const nextState: State = {
          ...currentState,
          key: keyFromGrid(nextGrid),
          zeroPosition: nextZeroPosition,
          path: [...currentState.path, step],
          depth: currentState.depth + 1,
          grid: nextGrid
        }

        data.add({ ...nextState, cost: data.cost(nextState) })
      }
    })
  } while (!data.isEmpty())
  return null
}

const compareStates = (sa: State, sb: State) => sa.cost < sb.cost

const makeGreedyDS = (): DataStructure => {
  const data = Heap<State>(compareStates)

  return {
    extract: data.extract,
    add: data.add,
    cost: (state: State) => manhattanDistance(state.grid),
    size: data.size,
    isEmpty: () => data.size() === 0
  }
}

// ( ͡° ͜ʖ ͡°)
const makeAStarDS = (): DataStructure => ({
  ...makeGreedyDS(),
  cost: (state: State) => manhattanDistance(state.grid) + state.depth
})

// Greedy
export const Greedy = (initialState: State) =>
  perf(initialState, makeGreedyDS())

// A Star
export const AStar = (initialState: State) => perf(initialState, makeAStarDS())

const perf = (initialState: State, dataStructure: DataStructure) => {
  const answer = search(initialState, dataStructure)

  return { answer }
}
