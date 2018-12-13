import styled from 'styled-components';
import Square from './Square';
import React from 'react';
import { STYLE } from '@/styles.js';

const Grid = ({className, grid}) => (
  <div className={className}>
    {
      grid.map( ({digit, delta}) => 
        <Square 
          key={digit}
          transparent={digit == 0}
          delta={delta}
          >{ digit }
        </Square>
      )
    }
  </div>
)

const GridSquares = styled(Grid)`
  width: 300px;
  padding: 30px;
  border-radius: 10px;
  background-color: ${STYLE.primaryColor};
  display: flex;
  flex-wrap: wrap;
`;

export default GridSquares;