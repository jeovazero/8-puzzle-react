import styled from "styled-components";
import React from "react";

const Square = ({children, className}) => (
  <div className={className}> 
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