import styled from "styled-components";
import React from "react";

const Square = ({children, className, hostRef}) => (
  <div className={className} ref={hostRef}>
    <span>{ children || '-' }</span>
  </div>
);

const SquareStyled = styled(Square)`
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