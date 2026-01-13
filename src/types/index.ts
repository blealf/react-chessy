import type { DragEvent } from 'react';
import type { Nullable, NumberArray, StringArray } from './types';

export interface ChessPieceType {
  id: string
  title: string
  value: NumberArray
  moved?: boolean
}

export type ChessPieceArray = Array<ChessPieceType>
export type MovesReturnType = Array<Nullable<number>>[]

export interface PieceProps {
  uniqueId: string
  name: string
  color: string
  onDragStart: (e: DragEvent) => void
  position: NumberArray
  info: string
}

export interface MovesType {
  kingMove: (currentPosition: NumberArray) => MovesReturnType
  queenMove: (currentPosition: NumberArray, occupied: StringArray) => MovesReturnType
  bishopMove: (currentPosition: NumberArray, occupied: StringArray) => MovesReturnType
  knightMove: (currentPosition: NumberArray) => MovesReturnType
  rookMove: (currentPosition: NumberArray, occupied: StringArray) => MovesReturnType
  pawnMove: (currentPosition: NumberArray, moved: boolean, fromTop: boolean, occupied: StringArray) => MovesReturnType
  pawnKill: (currentPosition: NumberArray, fromTop: boolean) => MovesReturnType
}

export interface SimulateArgsType {
  position: ChessPieceArray,
  whiteMoved: boolean,
  occupied: StringArray
}

export type SimulateFunction = ({ position, whiteMoved, occupied }: SimulateArgsType) => void
export interface SquarePropsType {
  boardMatrix: ChessPieceArray
  changePosition: (arg: ChessPieceArray) => void
  uniqueId: string
  onDragStart: (e: DragEvent) => void
  squarePosition: NumberArray
  tileColor: string
  updateBlackKill: (arg: string | null) => void
  updateWhiteKill: (arg: string | null) => void
  setWhiteMoved: () => void
  simulate: () => void
  onChangeColor?: () => void
}


export interface BoardStateType {
  occupied: StringArray
  position: ChessPieceArray
  moveColor: Array<{
    id: string
    color: string
  }>
  whiteKilled: ChessPieceArray
  blackKilled: ChessPieceArray
  whiteMoved: boolean
  kingPosition: {
    white: NumberArray | undefined
    black: NumberArray | undefined
  }
  firstUpdate?: boolean
}
export type BoardStatePayload = Partial<BoardStateType>
// export interface BoardStatePayload {
//   occupied?: StringArray
//   position?: ChessPieceArray
//   moveColor?: Array<{
//     id: string
//     color: string
//   }>
//   whiteKilled?: ChessPieceArray
//   blackKilled?: ChessPieceArray
//   whiteMoved?: boolean
//   kingPosition?: {
//     white: NumberArray | undefined
//     black: NumberArray | undefined
//   }
//   firstUpdate?: boolean
// }

export type KilledType = {
  blackKilled: ChessPieceType[]
  whiteKilled: ChessPieceType[]
}
export interface InitialStateType {
  positions: ChessPieceType | [],
  savedPositions: ChessPieceType[] | [],
  occupied: StringArray,
  killed: KilledType,
  allMoves?: Array<number>[],
}