// Pair
export type Pair = [number, number]

export const pairEq = ([a, b]: Pair, [c, d]: Pair) => a == c && b == d

export const pairSum = (
  [x1, y1]: Pair,
  [x2, y2]: Pair
): Pair => [x1 + x2, y1 + y2]

export const pairDiff = (
  [x1, y1]: Pair,
  [x2, y2]: Pair
): Pair => [x1 - x2, y1 - y2]

export const MAX_BOUND = 2
const MIN_BOUND = 0
const BOUNDS_RANGE: Pair = [MIN_BOUND, MAX_BOUND]

const isWithinRange = ([x, y]: Pair, t: number) => x <= t && t <= y

export const isValidPosition = ([x, y]: Pair) =>
  isWithinRange(BOUNDS_RANGE, x) && isWithinRange(BOUNDS_RANGE, y)
