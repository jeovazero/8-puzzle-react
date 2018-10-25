import {MOVE} from '../constants/actionTypes';

function goLeft(){
  return { type: MOVE.LEFT }
}

function goRight(){
  return { type: MOVE.RIGHT }
}

function goUp(){
  return { type: MOVE.UP }
}

function goDown(){
  return { type: MOVE.DOWN }
}

export default {
  goLeft,
  goRight,
  goUp,
  goDown
};