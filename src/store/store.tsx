import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import exampleStore from "./exampleStore";
import { api } from "./api/api";

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
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { addCurrentExpanded, setExplorerContent, setIsAuth } =
  worldSlice.actions;

export const currentExpanded = (state: RootState) =>
  state.worldSlice.currentExpanded;
export const explorerContent = (state: RootState) =>
  state.worldSlice.explorerContent;
export const isAuth = (state: RootState) => state.worldSlice.isAuth;
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
