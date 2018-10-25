import React from "react";
import ReactDOM from "react-dom";
import Square from "./Squares/Square";
import styled from "styled-components";

const state = [
  [1, 2, 3],
  [4, 5, 0],
  [7, 8, 6]
]

const Box = ({className}) => (
  <div className={className} >
    { 
      state.reduce((a, b) => a.concat(b), []).map( i => 
        <Square>{ i != 0 ? i : '-' }</Square>
      )
    }
  </div>
);

const BoxStyled = styled(Box)`
  width: 300px;
  padding: 20px;
  div{
    float:left;
  }
`;

ReactDOM.render(<BoxStyled />, document.getElementById("hue"));