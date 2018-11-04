import styled, { keyframes } from "styled-components";
import React from "react";
import { STYLE } from "@/styles.js";

const makeKeyframesMove = (dir, shift) => `
  0%{ ${dir == 'h' ? 'left' : 'top'}: 0%; }
  70%{ transform: scale(1.05); background-color: #aaa;}
  100%{ ${dir == 'h' ? 'left' : 'top'}: ${shift}; }
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
  width: 90px;
  height: 90px;
  position: relative;
  box-sizing: border-box;
  margin: 5px;
  background-color: white;
  color: ${STYLE.bg};
  opacity: ${props => props.transparent ? 0 : 1};
  text-align: center;
  font-weight: bolder;
  font-family: 'Viga', sans-serif;
  font-size: 4em;
  border-radius: 10%;
  span{
    height: 90px;
    line-height: 90 px;
    display: block;
  }
`;

export default SquareStyled;