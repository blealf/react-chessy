import { configureStore } from '@reduxjs/toolkit';
import GameSliceReducer from './features/GameSlice';

const store = configureStore({
  reducer: {
    game: GameSliceReducer,
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch