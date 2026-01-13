import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { InitialStateType, KilledType } from '../types'


const initialState: InitialStateType = {
  positions: [],
  savedPositions: [],
  occupied: [],
  killed: {
    blackKilled: [],
    whiteKilled: [],
  },
  // allMoves: [],
}
const GameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateKilled(state: InitialStateType, action: PayloadAction<KilledType>) {
      const { blackKilled, whiteKilled } = action.payload
      // console.log(blackKilled, whiteKilled)
      state.killed['blackKilled'] = blackKilled
      state.killed['whiteKilled'] = whiteKilled
    },
    undo(state: InitialStateType, action: PayloadAction<{index: number}>) {
      const { index } = action.payload
      state.positions = state.savedPositions[index]
    },
    redo(state: InitialStateType, action: PayloadAction<{index: number}>) {
      const { index } = action.payload
      state.positions = state.savedPositions[index]
    }
  }
})

export const { updateKilled } = GameSlice.actions

export default GameSlice.reducer