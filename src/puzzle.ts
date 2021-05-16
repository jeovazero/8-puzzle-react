type SquareData = {
  digit: number
  position: [number,number]
  delta: [number, number]
}

export type GridData = Array<SquareData>

export const gridFromList = (list: Array<number>): GridData =>
  list.map((digit, i) => ({
      digit,
      position: [Math.trunc(i / 3), Math.trunc(i % 3)],
      delta: [0,0]
    })
  )
