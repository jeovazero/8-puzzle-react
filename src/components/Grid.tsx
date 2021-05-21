import styled from 'styled-components'
import type { GridData } from '../puzzle'
import Square from './Square'

type GridProps = {
  data: GridData
  squareShift: number
  className?: string
}

const Grid = ({ className, data, squareShift }: GridProps) => (
  <div className={className}>
    {data.data.map(({ digit, delta }) => (
      <Square
        isTransparent={digit === 0}
        key={digit}
        delta={{ x: delta[0], y: delta[1] }}
        shift={squareShift}
      >
        {digit}
      </Square>
    ))}
  </div>
)

const GridSquares = styled(Grid)`
  width: 270px;
  padding: 15px;
  border-radius: 10px;
  background-color: var(--primary);
  display: flex;
  flex-wrap: wrap;
  transition: background-color 1.25s ease;
`

export default GridSquares
