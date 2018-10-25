import {MOVE} from "../constants/actionTypes";

const initialState = {
  grid: [[1,2,3], [4,5,0], [7,8, 6]],
  pos_blank: {x: 2, y: 1}
}

export default function move(state = initialState, action){
  switch(action.type){
    case MOVE.LEFT: 
      console.log('L');
      return state;

    case MOVE.RIGHT: 
      console.log('R');
      return state;

    case MOVE.UP: 
      console.log('T');
      return state;

    case MOVE.DOWN: 
      console.log('B');
      return state;

    default: return state;
  }
}