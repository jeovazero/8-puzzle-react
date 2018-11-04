import styled, { keyframes } from "styled-components";
import React from "react";
import { STYLE } from "@/styles.js";

const makeKeyframesMove = (dir, shift) => `
  0%{ transform: translate${dir}(0px); }  
  100%{ transform: translate${dir}(${shift}px); }
`;

const moveLeft = keyframes`
  ${makeKeyframesMove('X', 100)}
`;

const moveRight = keyframes`
  ${makeKeyframesMove('X', -100)}
`;

const moveUp = keyframes`
  ${makeKeyframesMove('Y', 100)}
`; 

const moveDown = keyframes`
  ${makeKeyframesMove('Y', -100)}
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
  position: relative;
  span{
    height: 90px;
    line-height: 90 px;
    display: block;
  }
`;

export default SquareStyled;