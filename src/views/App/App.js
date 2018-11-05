import React from "react";
import moves from "../../actions/moves";
import styled from "styled-components";
import { connect } from "react-redux";

// Components ==================
import GridSquares from "@/components/Squares/GridSquares";
import Button from "@/components/Button/Button";
import ButtonSet from "@/components/Button/ButtonSet";
import StyledTitle from "@/components/Title/Title";
import Hint from "@/components/Hint/Hint";

// Assets ======================
import playIcon from "@/assets/icons/play.svg";
import resetIcon from "@/assets/icons/reset.svg";
import titleImg from "@/assets/imgs/title.svg";
import hintImg from "@/assets/imgs/hint.svg";

import { CODE_KEY, solveGrid } from "./_helpersApp";

class App extends React.Component{
  constructor(props){
    super(props);
    this.keyHandle = this.keyHandle.bind(this);
    this.resolveCode = this.resolveCode.bind(this);
    this.start = this.start.bind(this);
    this.solveGrid = solveGrid;
    console.log(props)
  }

  resolveCode(code){
    // console.log(this.props.grid)
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
    const validMoves = this.solveGrid(this.props.grid);
    let i = 0;
    const that = this;
    const exec = setInterval(function(){
      that.resolveCode(validMoves[i++]);
      if(i == validMoves.length) clearInterval(exec);
    }, 260);
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
        <div className="mid">
          <StyledTitle img={titleImg} text="Solved with A* Algorithm" />
          <GridSquares grid={this.props.grid} />        
          <ButtonSet>
            <Button icon={playIcon} onClick={this.start}/>
            <Button icon={resetIcon} />
          </ButtonSet>
        </div>
        <Hint text="Moves" img={hintImg} className="hint"/>
      </div>
    );
  }
};

// Redux ===================================
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

// Styles ==================================
const AppStyled = styled(_App)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .mid{
    width: 400px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .hint{
    margin-top: 130px;
  }
`;

export default AppStyled;