import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import puppyReducer from "./puppySlice";

export const store = configureStore({
  reducer: {
    puppy: puppyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
