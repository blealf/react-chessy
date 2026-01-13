import { chessPieces } from './data.ts';
import type { BoardStateType, ChessPieceArray } from '../types';

export const initialPosition: ChessPieceArray = chessPieces;

/* The `export const initialState` in the code snippet is defining an initial state object for the
board in a board game application. Here's a breakdown of what each property in the `initialState`
object represents: */
export const initialState: BoardStateType = {
  kingPosition: {
    white: initialPosition.find((piece) => piece.id === 'wk1')?.value,
    black: initialPosition.find((piece) => piece.id === 'wk1')?.value
  },
  moveColor: [{ id: '', color: '' }],
  position: initialPosition,
  whiteMoved: false,
  firstUpdate: true,
  whiteKilled: [],
  blackKilled: [],
  occupied: [],
};

/**
 * The function `boardReducer` is a TypeScript reducer function that handles various actions to update
 * the state of a board in a board game.
 * @param {BoardStateType} state - The `state` parameter in the `boardReducer` function represents the
 * current state of the board in your application. It contains various properties such as `occupied`,
 * `position`, `moveColor`, `blackKilled`, `whiteKilled`, `whiteMoved`, `kingPosition`, and `first
 * @param action - The `action` parameter in the `boardReducer` function is an object that contains a
 * `type` property which is a string representing the type of action being dispatched, and an optional
 * `payload` property which can contain additional data related to the action. The reducer function
 * uses the `type` property
 * @returns The `boardReducer` function returns a new state object based on the action type provided.
 * It updates specific properties of the state based on the action type, such as `occupied`,
 * `position`, `moveColor`, `blackKilled`, `whiteKilled`, `whiteMoved`, `kingPosition`, and
 * `firstUpdate`. If the action type is not recognized, it returns the current state unchanged
 */
export const boardReducer = (state: BoardStateType, action: { type: string; payload?: any; }): BoardStateType => {
  switch (action.type) {
    case 'SET_OCCUPIED':
      return { ...state, occupied: action.payload };
    case 'SET_POSITION':
      return { ...state, position: action.payload };
    case 'SET_MOVE_COLOR':
      return { ...state, moveColor: action.payload };
    case 'SET_BLACK_KILLED':
      return { ...state, blackKilled: action.payload };
    case 'SET_WHITE_KILLED':
      return { ...state, whiteKilled: action.payload };
    case 'SET_WHITE_MOVED':
      return { ...state, whiteMoved: action.payload };
    case 'SET_KING_POSITION':
      return { ...state, kingPosition: action.payload };
    case 'SET_FIRST_UPDATE':
      return { ...state, firstUpdate: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};
