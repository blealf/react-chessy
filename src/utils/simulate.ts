import moves, { pawnMove } from './Movements';
import type { ChessPieceType, SimulateArgsType } from '../types'
type movesIndex = 'kingMove' | 'queenMove' | 'bishopMove' | 'knightMove' | 'rookMove';
const pawnMoved = (piece: ChessPieceType) => {
  return (piece.id.charAt(0) === 'b' && (piece.value[0] > 1)) ||
    ((piece.id.charAt(0) === 'w' && (piece.value[0] < 6)))
}

const getCurrentPieceColor = (whiteMoved: boolean) => {
  return whiteMoved ? 'w' : 'b'
}

const getOpponentKingPosition = (position: ChessPieceType[], whiteMoved: boolean): Array<number> => {
  const color = getCurrentPieceColor(!whiteMoved)
  return position.filter((piece) => piece.title === 'king' && piece.id.charAt(0) === color)[0]?.value
}

const simulate = ({ position, whiteMoved, occupied }: SimulateArgsType) => {
  const allMoves: (number | null)[][] = [];
  const validPositions = position.filter((pos) =>
    pos.title !== 'king' 
    && pos.id.charAt(0) === getCurrentPieceColor(whiteMoved)
  )
  validPositions
    .forEach((piece: ChessPieceType) => {
      if (piece.title === 'pawn') {
        const isBlack = piece.id.charAt(0) === 'b'
        allMoves.push(...pawnMove(piece.value, pawnMoved(piece), isBlack, occupied))
      }
      else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Unreachable code error
        const pieceTitle: movesIndex = `${piece.title}Move`
        allMoves.push(...moves[pieceTitle]((piece.value), occupied))
      }
    }
  )
  // console.log(allMoves)
  const opponentKing = [...getOpponentKingPosition(position, whiteMoved)]
  const threatened = !!allMoves.find((move) => JSON.stringify(move) === JSON.stringify(opponentKing))
  // console.log({ opponentKing })
  // console.log(allMoves)
  if (threatened) {
    // console.log("FOUND")
    document.getElementById(`${getCurrentPieceColor(whiteMoved)}k1`)?.setAttribute('class', 'threatened')
    // console.log(whiteMoved ? document.getElementById("wk1").style : document.getElementById("bk1").style)
  }
}
  
export { simulate }