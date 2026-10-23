import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
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
  },
});

export const { addCurrentExpanded, setExplorerContent, setUser } =
  worldSlice.actions;

export const currentExpanded = (state: RootState) =>
  state.worldSlice.currentExpanded;
export const explorerContent = (state: RootState) =>
  state.worldSlice.explorerContent;
export const user = (state: RootState) => {return {id: state.worldSlice.user?.id, name: state.worldSlice.user?.name}};
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