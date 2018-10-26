import styled from "styled-components";
import React from "react";
import posed from "react-pose";

const Square = ({children, className, hostRef}) => (
  <div className={className} ref={hostRef}>
    <span>{ children || '-' }</span>
  </div>
);

const PoseSquare = posed(Square)({
    h: { 
      x: ({x}) => x,
      transition: {duration: 400,
      ease: 'linear'}
    },
    v: {
      y: ({y}) => y,
      transition: {
      duration: 400,
      ease: 'linear'}
    }
})

const SquareStyled = styled(PoseSquare)`
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  border: 2px solid tomato;
  padding: 10px;
  background-color: #e30372;
  color: white;
  opacity: ${props => props.transparent ? 0 : 1};
  text-align: center;
  font-weight: bolder;
  font-family: 'Viga', sans-serif;
  font-size: 4em;
  border-radius: 10%;
  span{
    height: 80px;
    line-height: 80px;
    display: block;
  }
`;

export default SquareStyled;