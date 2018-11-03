import styled, { keyframes } from "styled-components";
import React from "react";


const makeKeyframesMove = (dir, shift) => `
  0%{ 
    ${dir == 'h' ? 'left' : 'top'}: 0%;
  }
  70%{
    transform: scale(1.05);
    background-color: #ff0372;
  }
  100%{ 
    ${dir == 'h' ? 'left' : 'top'}: ${shift};
    transform: skew(0deg);
  }
`;

const moveLeft = keyframes`
  ${makeKeyframesMove('h', '100px')}
`;

const moveRight = keyframes`
  ${makeKeyframesMove('h', '-100px')}
`;

const moveUp = keyframes`
  ${makeKeyframesMove('v', '100px')}
`; 

const moveDown = keyframes`
  ${makeKeyframesMove('v', '-100px')}
`; 

const Square = ({children, className, hostRef}) => (
  <div className={className} ref={hostRef}>
    <span>{ children || '-' }</span>
  </div>
);

const mapMove = (dir) => 
  dir == 'goleft' ? moveLeft :
  dir == 'goright' ? moveRight :
  dir == 'goup' ? moveUp :
  dir == 'godown' ? moveDown :
  'none';

const SquareStyled = styled(Square)`
  animation: ${props =>  mapMove(props.animate)} 0.25s cubic-bezier(0.19, 1, 0.22, 1);
  width: 96px;
  height: 96px;
  position: relative;
  box-sizing: border-box;
  border: 3px solid white;
  padding: 10px;
  margin: 2px;
  background-color: #e30372;
  color: white;
  opacity: ${props => props.transparent ? 0 : 1};
  text-align: center;
  font-weight: bolder;
  font-family: 'Viga', sans-serif;
  font-size: 4em;
  border-radius: 10%;
  span{
    height: 76px;
    line-height: 76px;
    display: block;
  }
`;

export default SquareStyled;