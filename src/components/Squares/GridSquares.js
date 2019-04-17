import styled from 'styled-components'
import Square from './Square'
import React from 'react'
import { STYLE } from '@/styles.js'

const Grid = ({ className, grid, squareShift }) => (
  <div className={className}>
    {grid.map(({ digit, delta }) => (
      <Square key={digit} transparent={digit === 0} delta={delta} shift={squareShift}>
        {digit}
      </Square>
    ))}
  </div>
)

const GridSquares = styled(Grid)`
  width: 270px;
  padding: 15px;
  border-radius: 10px;
  background-color: ${STYLE.primaryColor};
  display: flex;
  flex-wrap: wrap;
`

export default GridSquares
