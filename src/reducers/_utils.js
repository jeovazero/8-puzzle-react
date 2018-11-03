const WIDTH_GRID = 3;
const VALID_VALUES = Array(WIDTH_GRID).fill(0).map((_, i) => i);
export const isValidValue = (x) => VALID_VALUES.includes(x);
export const isValidMove = ({x, y}) => isValidValue(x) && isValidValue(y);
export const sumCoordinates = (u, v) => ({
  x: u.x + v.x,
  y: u.y + v.y
});

export const scalarMult = (e, {x, y}) => ({x: x*e, y: y*e});
export const mapShiftToAlias = ({x, y}) =>
  x == 1 ? 'goright' :
  x == -1 ? 'goleft' :
  y == 1 ? 'godown' :
  y == -1 ? 'goup' :
  'none';

export const aliasShift = (digit, shift, targetDigit) => 
  digit == 0 ? mapShiftToAlias(scalarMult(-1, shift)) :
  digit == targetDigit ? mapShiftToAlias(shift) :
  mapShiftToAlias({x: 0, y: 0})