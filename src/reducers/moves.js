import {MOVE} from "../constants/actionTypes";
const WIDTH_GRID = 3;

const SHIFT = {
  LEFT: {x: -1, y: 0},
  RIGHT: {x: 1, y: 0},
  UP: {x: 0, y: -1},
  DOWN: {x: 0, y: 1}
}

const grid = [1, 2, 3, 4, 5, 0, 7, 8, 6].map((digit, i) => {
  return {
    digit,
    x: Math.trunc(i / 3),
    y: Math.trunc(i % 3),
    animate: 'none'
  }
})

const initialState = {
  grid,
  pos_blank: {x: 2, y: 1}
}

const InValidInterval = (k) =>
  k <= (WIDTH_GRID - 1) && k >= 0;

const IsValidMove = ({x, y},{xi, yi}) =>
  InValidInterval(xi + x) && InValidInterval(yi + y);

const resolve = ({move, state}) =>
  IsValidMove({x: move.x, y: move.y}, {xi: state.pos_blank.x, yi: state.pos_blank.y})
  ? transform(state.grid, state.pos_blank, move)
  : state;

const getLinearIndex = ({x, y}) => WIDTH_GRID * y + x;

const swapDigits = (grid, target, blank) => {
  return grid.map(item => {
    const { digit } = item;
    switch(digit){
      case target.digit:
        return {
          ...blank.pos,
          digit: blank.digit,
          animate: blank.animate
        };
      case blank.digit:
        return {
          ...target.pos,
          digit: target.digit,
          animate: target.animate
        };
      default: return item;
    }
  });
}

const transform = (_grid, blank_pos, move) => {
  const target_pos = {
    x: blank_pos.x + move.x,
    y: blank_pos.y + move.y
  };

  const target_digit = _grid[getLinearIndex(target_pos)].digit;
  const blank_digit = _grid[getLinearIndex(blank_pos)].digit;

  const animate = move.x != 0 ? 'h' : 'v'; 

  const grid = swapDigits(
    _grid, 
    {digit: target_digit, pos: target_pos, animate}, 
    {digit: blank_digit, pos: blank_pos, animate}
  );

  return {
    grid,
    pos_blank: target_pos
  }
}

// SHIFT is inverse of MOVE
export default function move(state = initialState, action){
  switch(action.type){
    case MOVE.LEFT: 
      return resolve({move:SHIFT.RIGHT, state});

    case MOVE.RIGHT:
      return resolve({move:SHIFT.LEFT, state});
      
    case MOVE.UP: 
      return resolve({move:SHIFT.DOWN, state});

    case MOVE.DOWN:
      return resolve({move:SHIFT.UP, state});

    default: return state;
  }
}