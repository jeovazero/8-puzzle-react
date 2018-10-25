import React from "react";
import ReactDOM from "react-dom";
import Square from "./components/Squares/Square";
import styled from "styled-components";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from "./reducers";
import move from "./actions/move";

const store = createStore(rootReducer);

const state = {
  grid:[
    [1, 2, 3],
    [4, 5, 0],
    [7, 8, 6]
  ],
  pos_blank: {
    x: 2, y: 1
  }
}

const CODE_KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
}

class Box extends React.Component{
  constructor(props){
    super(props);
    this.keyHandle = this.keyHandle.bind(this);
  }
  keyHandle(event){
    switch(event.keyCode){
      case CODE_KEY.LEFT:
        store.dispatch(move.goLeft);
        break;
      case CODE_KEY.UP:
        store.dispatch(move.goUp);
        break;
      case CODE_KEY.RIGHT:
        store.dispatch(move.goRight);
        break;
      case CODE_KEY.DOWN:
        store.dispatch(move.goDown);
        break;
      default: console.log('X')
    }
  }
  componentWillMount(){
    document.addEventListener("keypress", this.keyHandle)
  }
  render(){
    return <div className={this.props.className} >
      { 
        state.grid.reduce((a, b) => a.concat(b), []).map( i => 
          <Square key={i}>{ i != 0 ? i : '-' }</Square>
        )
      }
    </div>
  }
};

const BoxStyled = styled(Box)`
  width: 300px;
  padding: 20px;
  div{
    float:left;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <BoxStyled />
  </Provider>,
  document.getElementById("hue")
);