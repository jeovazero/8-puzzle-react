import {MOVE} from '../constants/actionTypes';

export function goLeft(){
  return { type: MOVE.LEFT }
}

export function goRight(){
  return { type: MOVE.RIGHT }
}

export function goUp(){
  return { type: MOVE.UP }
}

export function goDown(){
  return { type: MOVE.DOWN }
}