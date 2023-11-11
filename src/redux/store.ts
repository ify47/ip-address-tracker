import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import geoReducer from "./api/geoApi";
// Create the root reducer independently to obtain the RootState type
export const store = configureStore({
  reducer: {
    geoData: geoReducer,
  },
});

const rootReducer = combineReducers({
  geoData: geoReducer,
});
export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
