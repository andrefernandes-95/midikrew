import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Instrument, InstrumentSample } from "./types";

export interface InstrumentsState {
  instruments: Array<Instrument>;
  copyBuffer: Array<{
    instrumentID: number;
    sequence: {
      index: number;
      fx: {
        pitch?: number;
        volume?: number;
        reverb?: boolean;
      };
    };
  }>;
}

const initialState: InstrumentsState = {
  instruments: [],
  copyBuffer: [],
};

export const instrumentsSlice = createSlice({
  name: "instruments",
  initialState,
  reducers: {
    addInstrument(state, action: PayloadAction<Instrument>) {
      state.instruments.push(action.payload);
    },
    removeInstrument(state) {
      state.instruments = state.instruments.slice(0, -1);
    },
    updateInstrumentSample(state, action: PayloadAction<InstrumentSample>) {
      const instruments = state.instruments.slice();
      const instrumentToUpdate = instruments.find(
        (instrument) => instrument.id === action.payload.instrumentID.toString()
      );

      if (instrumentToUpdate) {
        instrumentToUpdate.sampleSource = action.payload.sampleSource;
        instruments[instruments.indexOf(instrumentToUpdate)] =
          instrumentToUpdate;
      }

      state.instruments = instruments;
    },
    updateSequence(
      state,
      action: PayloadAction<{
        sequence: Array<number>;
        sequenceID: number;
        instrumentID: number;
      }>
    ) {
      const instrumentID = action.payload.instrumentID; //
      const sequenceID = action.payload.sequenceID; //

      // $Ignore
      const instruments = state.instruments.slice(); // Always slice the state!

      const instrumentToUpdate = instruments.find(
        (instrument) => instrument.id === instrumentID.toString()
      );

      if (instrumentToUpdate) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        instruments[instruments.indexOf(instrumentToUpdate)].sequences[
          sequenceID
        ] = action.payload.sequence;
      }
    },
    copySequence(state, action: PayloadAction<number>) {
      const targetSequence = action.payload;
      const instruments = state.instruments.slice();

      const copied: unknown[] = [];

      instruments.forEach((instrument) => {
        if (instrument.sequences[targetSequence]) {
          copied.push({
            instrumentID: instrument.id,
            sequence: instrument.sequences[targetSequence],
            sequenceID: targetSequence,
          });
        }
      });
    },
    pasteSequence(state, action: PayloadAction<number>) {
      const targetSequence = action.payload;

      // $Ignore
      const instruments = state.instruments.slice();
      const copyBuffer = state.copyBuffer.slice();

      instruments.forEach((instrument) => {
        const match = copyBuffer.findIndex(
          (entry) => entry.instrumentID.toString() === instrument.id
        );

        if (match !== -1) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          instrument.sequences[targetSequence] =
            state.copyBuffer[match].sequence;
        }
      });
    },
    clearAll(state) {
      state.instruments = [];
    },
  },
});

export const instrumentsActions = instrumentsSlice.actions;
