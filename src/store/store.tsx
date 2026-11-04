import { createSlice, configureStore, PayloadAction, createSelector } from "@reduxjs/toolkit";
import exampleStore from "./exampleStore";
import { api } from "./api/api";
import { User } from "./types";

const worldSlice = createSlice({
  name: "wolrdData",
  initialState: exampleStore,
  reducers: {
    addCurrentExpanded: (state, action: PayloadAction<number>) => {
      if (state.currentExpanded.includes(action.payload)) {
        state.currentExpanded = [
          ...state.currentExpanded.filter((item) => item !== action.payload),
        ];
      } else state.currentExpanded.push(action.payload);
    },
    setExplorerContent: (state, action: PayloadAction<number>) => {
      state.explorerContent = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setDarkTheme: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
    }
  },
});

export const { addCurrentExpanded, setExplorerContent, setUser, setDarkTheme } =
  worldSlice.actions;

export const currentExpanded = (state: RootState) =>
  state.worldSlice.currentExpanded;
export const explorerContent = (state: RootState) =>
  state.worldSlice.explorerContent;
const selectUser = (state: RootState) => state.worldSlice.user;
export const user = createSelector(
  [selectUser],
  (user) => ({
    id: user?.id,
    name: user?.name,
  }));
export const isDark = (state: RootState) => state.worldSlice.isDark;
export const store = configureStore({
  reducer: {
    worldSlice: worldSlice.reducer,
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export default worldSlice.reducer;
export type RootState = ReturnType<typeof store.getState>;