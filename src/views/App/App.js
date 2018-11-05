import React from "react";
import movesAction from "../../actions/moves";
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

import CODE_KEY from "@/constants/keys";

class App extends React.Component{
  constructor(props){
    super(props);
    this.keyHandle = this.keyHandle.bind(this);
    this.resolveCode = this.resolveCode.bind(this);
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
      case CODE_KEY.ENTER:
        this.props.start();
        break; 
      default: console.log(code)
    }
  }

  keyHandle(event){
    const code = event.keyCode != 0 ? event.keyCode : event.charCode;
    // notSolving
    if(!this.props.isSolving) { 
      this.resolveCode(code);
    }else{
      console.log('STOP!');
    }
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
            <Button icon={playIcon} onClick={this.props.start}/>
            <Button icon={resetIcon} onClick={this.props.reset}/>
          </ButtonSet>
        </div>
        <Hint text="Moves" img={hintImg} className="hint"/>
      </div>
    );
  }
};

// Redux ===================================
const mapStateToProps = (state) => ({
  grid: state.moves.grid,
  isSolving: state.moves.isSolving
});

const mapDispatchToProps = (dispatch) => ({
  goLeft: () => dispatch(movesAction.goleft()),
  goRight: () => dispatch(movesAction.goright()),
  goDown: () => dispatch(movesAction.godown()),
  goUp: () => dispatch(movesAction.goup()),
  reset: () => dispatch(movesAction.goreset()),
  start: () => dispatch(movesAction.start())
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
    margin-top: 140px;
  }
  @media (max-width: 640px) {
    .hint{
      padding: 50px;
      clear: both;
      width: 200px;
      margin-top: 10px;
    }
  }
`;

export default AppStyled;