import type { Pair } from './pair'
import { MAX_BOUND, pairDiff } from './pair'

// Grid and Row
type Row = [number, number, number]
export type Grid = [Row, Row, Row]

export const rowFromList = (
  list: Array<number>,
  start: number
): Row => [list[start], list[start + 1], list[start + 2]]

export const gridFromList = (
  list: Array<number>
): Grid => [rowFromList(list, 0), rowFromList(list, 3), rowFromList(list, 6)]

// For types
const copyRow = (row: Row): Row => [row[0], row[1], row[2]]

export const copyGrid = (
  grid: Grid
): Grid => [copyRow(grid[0]), copyRow(grid[1]), copyRow(grid[2])]

// Final position in the grid for each number
// 1 2 3  | [0,0] [0,1] [0,2]
// 4 5 6  | [1,0] [1,1] [1,2]
// 7 8 0  | [2,0] [2,1] [2,2]
const finalPosition: Array<Pair> = [[2, 2]]
for (let i = 0; i < 8; i++) {
  finalPosition.push([Math.floor(i / 3), i % 3])
}

export const manhattanDistance = (grid: Grid) => {
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
