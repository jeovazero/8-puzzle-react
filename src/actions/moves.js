import {SET_MOVE} from '../constants/actionTypes';

function goLeft(){
  return { type: SET_MOVE.LEFT }
}

function goRight(){
  return { type: SET_MOVE.RIGHT }
}

function goUp(){
  return { type: SET_MOVE.UP }
}

function goDown(){
  return { type: SET_MOVE.DOWN }
}

export default {
  goLeft,
  goRight,
  goUp,
  goDown
};