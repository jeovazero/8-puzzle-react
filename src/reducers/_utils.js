const WIDTH_GRID = 3
const VALID_VALUES = Array(WIDTH_GRID)
  .fill(0)
  .map((_, i) => i)
export const isValidValue = x => VALID_VALUES.includes(x)
export const isValidMove = ({ x, y }) => isValidValue(x) && isValidValue(y)
export const sumCoordinates = (u, v) => ({
  x: u.x + v.x,
  y: u.y + v.y
})

export const scalarMult = (e, { x, y }) => ({ x: x * e, y: y * e })
