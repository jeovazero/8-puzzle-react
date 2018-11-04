import {MAKE_ANIMATION, SET_MOVE, VERIFY_MOVE} from '../constants/actionTypes';

const SHIFT = {
  LEFT: {x: 1, y: 0},
  RIGHT: {x: -1, y: 0},
  UP: {x: 0, y: 1},
  DOWN: {x: 0, y: -1}
}

function makeAnimation(shift){
  return { type: MAKE_ANIMATION, shift }
}

function verifyMove(shift){
  return { type: VERIFY_MOVE, shift }
}

function setMove(){
  return { type: SET_MOVE }
}

function go(shift){
  return (dispatch, getState )=> {
    const {moves:{isRunning}} = getState();
    if(!isRunning){
      dispatch(verifyMove(shift));
      const {moves:{canAnimate}} = getState();
      if(canAnimate){
        dispatch(makeAnimation(shift));
        setTimeout(() => {
          dispatch(setMove());
        }, 210);
      }
    }
  }
}

const goright = () => go(SHIFT.RIGHT);
const goleft = () => go(SHIFT.LEFT);
const godown = () => go(SHIFT.DOWN);
const goup = () => go(SHIFT.UP);

export default {
  goleft,
  goright,
  goup,
  godown
};