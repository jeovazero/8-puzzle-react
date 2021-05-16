/*!
 * Copyright(c) 2021 Jeová Pereira Gomes (@jeovazero <contato@jeova.ninja>)
 * MIT Licensed
 */

import { Heap } from './heap'

export type Pair = [number, number]

type Key = string

export enum Step {
  Up = '^',
  Left = '<',
  Down = 'v',
  Right = '>',
}

type Row = [number, number, number]
type Grid = [Row, Row, Row]

type State = {
  cost: number
  path: Array<Step>
  depth: number
  key: Key
  zeroPosition: Pair
  grid: Grid
}

export const makeSearchState = (grid: Grid): State => ({
  cost: 0,
  path: [],
  depth: 0,
  key: keyFromGrid(grid),
  zeroPosition: zeroPairFromGrid(grid),
  grid,
})

const isFinalState = (state: State) => state.key === '123456780'

const MAX_BOUND = 2
const MIN_BOUND = 0
const BOUNDS_RANGE: Pair = [MIN_BOUND, MAX_BOUND]

const isWithinRange = ([x, y]: Pair, t: number) => x <= t && t <= y

export const isValidPosition = ([x, y]: Pair) =>
  isWithinRange(BOUNDS_RANGE, x) && isWithinRange(BOUNDS_RANGE, y)

const keyFromGrid = (grid: Grid) => {
  let key = ''
  for (const row of grid) {
    for (const n of row) key += n.toString()
  }
  return key
}

const zeroPairFromGrid = (grid: Grid): Pair => {
  for (let i = 0; i <= MAX_BOUND; i++) {
    for (let j = 0; j <= MAX_BOUND; j++) {
      if (grid[i][j] == 0) return [i, j]
    }
  }

  throw Error('Wrong Grid')
}

const rowFromList = (
  list: Array<number>,
  start: number,
): Row => [list[start], list[start + 1], list[start + 2]]
export const gridFromList = (
  list: Array<number>,
): Grid => [rowFromList(list, 0), rowFromList(list, 3), rowFromList(list, 6)]

// For types
const copyRow = (row: Row): Row => [row[0], row[1], row[2]]
const copyGrid = (
  grid: Grid,
): Grid => [copyRow(grid[0]), copyRow(grid[1]), copyRow(grid[2])]

const STEPS: Array<[Step, Pair]> = [
  [Step.Up, [-1, 0]],
  [Step.Left, [0, -1]],
  [Step.Down, [1, 0]],
  [Step.Right, [0, 1]],
]

type DataStructure = {
  add(state: State): void
  extract(): State
  size(): number
  isEmpty(): boolean
  cost(state: State): number
}

export const pairEq = ([a, b]: Pair, [c, d]: Pair) => a == c && b == d
export const pairSum = (
  [x1, y1]: Pair,
  [x2, y2]: Pair,
): Pair => [x1 + x2, y1 + y2]
const pairDiff = ([x1, y1]: Pair, [x2, y2]: Pair): Pair => [x1 - x2, y1 - y2]

const search = (initialState: State, data: DataStructure) => {
  data.add(initialState)

  let boundaryNodesCount = 1
  let visitedStatesCount = 0
  let visitedNodes = 0
  let maxBoundary = 0
  let maxDepth = 0

  const visitedStates = new Set<Key>()

  do {
    const currentState = data.extract()

    visitedStatesCount++
    maxDepth = Math.max(currentState.depth, maxDepth)
    maxBoundary = Math.max(data.size(), maxBoundary)

    if (isFinalState(currentState)) {
      return {
        state: currentState,
        visitedStatesCount,
        boundaryNodesCount,
        maxDepth,
        visitedNodes,
        maxBoundary,
      }
    }

    if (visitedStates.has(currentState.key)) {
      visitedNodes++
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
          grid: nextGrid,
        }

        data.add({ ...nextState, cost: data.cost(nextState) })

        boundaryNodesCount++
      }
    })
  } while (!data.isEmpty())
  console.log(data.isEmpty(), { boundaryNodesCount })
  return null
}

// Final position in the grid for each number
// 1 2 3  | [0,0] [0,1] [0,2]
// 4 5 6  | [1,0] [1,1] [1,2]
// 7 8 0  | [2,0] [2,1] [2,2]
const finalPosition: Array<Pair> = [[2, 2]]
for (let i = 0; i < 8; i++) {
  finalPosition.push([Math.floor(i / 3), i % 3])
}

const manhattanDistance = (grid: Grid) => {
  let sum = 0
  for (let i = 0; i < MAX_BOUND; i++) {
    for (let j = 0; j < MAX_BOUND; j++) {
      const currentNumber = grid[i][j]
      const finalPos = finalPosition[currentNumber]
      const pairResult = pairDiff(finalPos, [i, j])
      sum += (Math.abs(pairResult[0]) + Math.abs(pairResult[1]))
    }
  }
  return sum
}

const compareStates = (sa: State, sb: State) => sa.cost < sb.cost

const makeGreedyDS = (): DataStructure => {
  const data = Heap<State>(compareStates)

  return {
    extract: data.extract,
    add: data.add,
    cost: (state: State) => manhattanDistance(state.grid),
    size: data.size,
    isEmpty: () => data.size() === 0,
  }
}

// ( ͡° ͜ʖ ͡°)
const makeAStarDS = (): DataStructure => ({
  ...makeGreedyDS(),
  cost: (state: State) => manhattanDistance(state.grid) + state.depth,
})

export const Greedy = (initialState: State) =>
  perf(initialState, makeGreedyDS())
export const AStar = (initialState: State) => perf(initialState, makeAStarDS())

const perf = (initialState: State, dataStructure: DataStructure) => {
  const t0 = window.performance.now()
  const answer = search(initialState, dataStructure)
  const t1 = window.performance.now()

  return { time: t1 - t0, answer }
}
