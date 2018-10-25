import React from "react";
import ReactDOM from "react-dom";
import Square from "./Squares/Square";
import styled from "styled-components";

const Box = ({className}) => (
  <div className={className} >
    <Square> 5 </Square>
  </div>
);

const BoxStyled = styled(Box)`
  width: 200px;
  height: 200px;
`;

ReactDOM.render(<BoxStyled />, document.getElementById("hue"));