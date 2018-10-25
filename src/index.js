import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Hue = styled.div`
  border: 2px solid tomato;
  padding: 10px 20px;
  background-color: #e30372;
  color: white;
  font-weight: bolder;
  font-family: sans-serif;
`;

ReactDOM.render(<Hue>HUE HUE beauty!</Hue>, document.getElementById("hue"));