import { configureStore } from "@reduxjs/toolkit";
import { trackSlice, TrackState } from "data/track/reducer";
import { instrumentsSlice, InstrumentsState } from "data/instrument/reducer";

export interface ReduxStoreState {
  track: TrackState;
  instruments: InstrumentsState;
}

function createAppStore(initialState?: unknown) {
  const store = configureStore({
    reducer: {
      track: trackSlice.reducer,
      instruments: instrumentsSlice.reducer,
    },
    preloadedState: initialState,
  });

  return store;
}

const reduxStore = createAppStore();

export default reduxStore;
