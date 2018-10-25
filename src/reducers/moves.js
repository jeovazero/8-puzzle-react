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
    y: Math.trunc(i % 3)
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

const transform = (_grid, blank, move) => {
  console.log(_grid)
  const target = {
    x: blank.x + move.x,
    y: blank.y + move.y
  };
  const target_digit = _grid[getLinearIndex(target)].digit;
  const blank_digit = _grid[getLinearIndex(blank)].digit;

  const grid = _grid.map(item => {
    const { digit } = item;

    switch(digit){
      case target_digit:
        return {
          ...blank,
          digit: blank_digit
        };
      case blank_digit:
        return {
          ...target,
          digit: target_digit
        };
      default: return item;
    }
  });
  console.log(grid)
  return {
    grid,
    pos_blank: target
  }
}

export default function move(state = initialState, action){
  switch(action.type){
    case MOVE.LEFT: 
      console.log('L');
      return resolve({move:SHIFT.LEFT, state});

    case MOVE.RIGHT: 
      console.log('R');
      return resolve({move:SHIFT.RIGHT, state});
      
    case MOVE.UP: 
      return resolve({move:SHIFT.UP, state});

    case MOVE.DOWN:
      return resolve({move:SHIFT.DOWN, state});

    default: return state;
  }
}