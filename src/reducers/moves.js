import { MAKE_ANIMATION, SET_MOVE, VERIFY_MOVE, RESET } from '../constants/actionTypes';
import { sumCoordinates, isValidMove, aliasShift } from './_utils';

const grid = [8, 3, 2, 7, 4, 5, 1, 6, 0].map((digit, i) => {
  return {
    digit,
    x: Math.trunc(i / 3),
    y: Math.trunc(i % 3),
    keyframe: 'none'
  }
});

const getBlankPosition = (grid) => {
  const {x, y} = grid.filter(d => d.digit == 0)[0];
  return {x, y};
}

const initialState = {
  grid,
  blankPosition: getBlankPosition(grid),
  targetPosition: {x: 0, y: 0},
  targetDigit: 0,
  isRunning: false,
  canAnimate: false
}

// returns, digit of target, position of target
const makeAnimation = ({grid, targetDigit}, shift ) => {
  const neoGrid = grid.map(
    (attr) => ({
      ...attr,
      keyframe: aliasShift(attr.digit, shift, targetDigit) 
    })
  );

  return   {
    grid: neoGrid,
    isRunning: true,
    canAnimate: false
  };
}

const resolveSetMove = (state) => {
  const oldGrid = state.grid;
  const {targetDigit} = state;
  const resolveDigit = (digit) =>
    digit == 0 ? targetDigit :
    digit == targetDigit ? 0 :
    digit;
  const grid = oldGrid.map((attr) => {
    return { ...attr, digit: resolveDigit(attr.digit), keyframe: 'none' }
  });
  return {
    grid,
    blankPosition: state.targetPosition,
    isRunning: false,
    canAnimate: false
  }
}

const verifyMove = ({blankPosition, grid}, shift) => {
  const nextPosition = sumCoordinates(blankPosition, shift);
  
  const [targetPosition, canAnimate] = 
    isValidMove(nextPosition)
    ? [nextPosition, true]
    : [blankPosition, false];
  
  const targetDigit = grid[targetPosition.y * 3 + targetPosition.x].digit;

  return   {
    targetPosition,
    targetDigit,
    canAnimate,
    isRunning: false
  };
}


export default function moves(state = initialState, action){
  switch(action.type){
    case VERIFY_MOVE:
      return {...state, ...verifyMove(state, action.shift)}
    case MAKE_ANIMATION:
      return {...state, ...makeAnimation(state, action.shift) };
    case SET_MOVE:
      return {...state, ...resolveSetMove(state) }
    case RESET:
      return {...initialState};
    default: return state;
  }
}