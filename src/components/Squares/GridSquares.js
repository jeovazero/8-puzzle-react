import styled from 'styled-components';
import Square from './Square';
import React from 'react';

const Grid = ({className, grid}) => (
  <div className={className}>
    {
      grid.map( ({digit, keyframe='none'}) => 
        <Square 
          key={digit}
          transparent={digit == 0}
          animate={keyframe}
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
  background-color: rgba(59, 9, 65, 0.6);
  div{
    float:left;
  }
`;

export default GridSquares;