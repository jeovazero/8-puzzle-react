import React from "react";
import moves from "../../actions/moves";
import Square from "../Squares/Square";
import styled from "styled-components";
import { connect } from 'react-redux';

const CODE_KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
}
const state = [[1]];
class App extends React.Component{
  constructor(props){
    super(props);
    this.keyHandle = this.keyHandle.bind(this);
    console.log(props)
  }
  keyHandle(event){
    switch(event.keyCode){
      case CODE_KEY.LEFT:
        this.props.goLeft();
        break;
      case CODE_KEY.UP:
        this.props.goUp();
        break;
      case CODE_KEY.RIGHT:
        this.props.goRight();
        break;
      case CODE_KEY.DOWN:
        this.props.goDown();
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
        this.props.grid.map( ({digit}) => 
          <Square key={digit}>{ digit != 0 ? digit : '-' }</Square>
        )
      }
    </div>
  }
};

const mapStateToProps = (state) => ({
  grid: state.moves.grid,
  pos_blank: state.moves.pos_blank
});

const mapDispatchToProps = (dispatch) => ({
  goLeft: () => dispatch(moves.goLeft()),
  goRight: () => dispatch(moves.goRight()),
  goDown: () => dispatch(moves.goDown()),
  goUp: () => dispatch(moves.goUp())
})

const _App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

const AppStyled = styled(_App)`
  width: 300px;
  padding: 20px;
  div{
    float:left;
  }
`;

export default AppStyled;