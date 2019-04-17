import { AESTRELA, State } from '../search/ia_lib'
import CODE_KEY from '../constants/keys'

const toMatrix = list => [list.slice(0, 3), list.slice(3, 6), list.slice(6, 9)]

const symbolToMove = s => {
  console.log(s)
  switch (s) {
    case 'v':
      return CODE_KEY.UP
    case '^':
      return CODE_KEY.DOWN
    case '>':
      return CODE_KEY.LEFT
    case '<':
      return CODE_KEY.RIGHT
  }
}

const solveGrid = grid => {
  const result = AESTRELA(new State(toMatrix(grid)))
  const moves = result.resultado_busca.estado_resultado.moves
  const validMoves = moves.map(o => symbolToMove(o.simbol))
  return validMoves
}

const helpers = {
  solveGrid
}

export default helpers
