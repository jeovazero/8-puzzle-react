import {AESTRELA, State} from "../../search/ia_lib";

export const CODE_KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  W: 119,
  A: 97,
  D: 100,
  S: 115,
  ENTER: 13
}

export const toMatrix = (list) =>
  [list.slice(0, 3), list.slice(3, 6), list.slice(6, 9)]

export const symbolToMove = (s) => {
  console.log(s)
  switch(s){
    case 'v': return CODE_KEY.UP;
    case '^': return CODE_KEY.DOWN;
    case '>': return CODE_KEY.LEFT;
    case '<': return CODE_KEY.RIGHT;
  }
}

export const solveGrid = (grid) => {
  const result = AESTRELA(
    new State(
      toMatrix(grid.map(o => o.digit))
    )
  );
  const moves = result.resultado_busca.estado_resultado.moves;
  const validMoves = moves.map( o => symbolToMove(o.simbol) );
  return validMoves;
}
