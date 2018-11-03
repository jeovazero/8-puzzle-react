import React from "react";
import moves from "../../actions/moves";
import Square from "../Squares/Square";
import styled from "styled-components";
import { connect } from "react-redux";
import {AESTRELA, State} from "../../search/ia_lib";
import GridSquares from "../Squares/GridSquares";

const CODE_KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  W: 119,
  A: 97,
  D: 100,
  S: 115,
  ENTER: 13
}

const toMatrix = (list) =>
  [list.slice(0, 3), list.slice(3, 6), list.slice(6, 9)]

const symbolToMove = (s) => {
  console.log(s)
  switch(s){
    case 'v': return CODE_KEY.UP;
    case '^': return CODE_KEY.DOWN;
    case '>': return CODE_KEY.LEFT;
    case '<': return CODE_KEY.RIGHT;
  }
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.keyHandle = this.keyHandle.bind(this);
    this.resolveCode = this.resolveCode.bind(this);
    this.start = this.start.bind(this);
    console.log(props)
  }
  resolveCode(code){
    console.log(this.props.grid)
    switch(code){
      case CODE_KEY.LEFT:
      case CODE_KEY.A:
        this.props.goLeft();
        break;
      case CODE_KEY.W:
      case CODE_KEY.UP:
        this.props.goUp();
        break;
      case CODE_KEY.D:
      case CODE_KEY.RIGHT:
        this.props.goRight();
        break;
      case CODE_KEY.S:
      case CODE_KEY.DOWN:
        this.props.goDown();
        break;
      default: console.log(code)
    }
  }
  start(){
    const result = AESTRELA(
      new State(
        toMatrix(this.props.grid.map(o => o.digit))
      )
    );
    const moves = result.resultado_busca.estado_resultado.moves;
    const validMoves = moves.map( o => symbolToMove(o.simbol) );
    let i = 0;
    const that = this;
    const exec = setInterval(function(){
      that.resolveCode(validMoves[i++]);
      if(i == validMoves.length) clearInterval(exec);
    }, 500);
  }
  keyHandle(event){
    const code = event.keyCode != 0 ? event.keyCode : event.charCode;
    if(code == CODE_KEY.ENTER){
      this.start();
    }
    else this.resolveCode(code);
  }
  componentWillMount(){
    document.addEventListener("keypress", this.keyHandle)
  }
  render(){
    return (
      <div className={this.props.className} >
        <GridSquares grid={this.props.grid} />
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  grid: state.moves.grid
});

const mapDispatchToProps = (dispatch) => ({
  goLeft: () => dispatch(moves.goleft()),
  goRight: () => dispatch(moves.goright()),
  goDown: () => dispatch(moves.godown()),
  goUp: () => dispatch(moves.goup())
})

const _App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

const AppStyled = styled(_App)`
  display: flex;
  border: 1px dashed lightpink;
  justify-content: center;
`;

export default AppStyled;