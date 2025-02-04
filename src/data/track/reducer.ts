import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InstrumentSample, Note } from "models";

export type PLAYER_STATE = "playing" | "paused";

export type PLAYER_MODE = "continuous" | "loop";

export interface TrackState {
  bpm: number;
  interval: number; // the interval of a loop based on bpms and lines per beat
  currentStep: number;
  currentSequence: number;
  sequences: Array<{
    id: string;
    numberOfSteps: number;
  }>;
  playerState: PLAYER_STATE;
  playerMode: PLAYER_MODE;
  notes: Note[];
  selectedInstrumentNumber: number;
  instruments: InstrumentSample[];
}

const initialState: TrackState = {
  bpm: 120,
  interval: 200,
  currentStep: 0,
  currentSequence: 0,
  sequences: [
    {
      id: `Sequence ${Date.now()}`,
      numberOfSteps: 16,
    },
  ],
  playerState: "paused",
  playerMode: "continuous",
  notes: [],
  selectedInstrumentNumber: 1,
  instruments: [
    {
      url: "/909Kick.WAV",
      instrumentNumber: 1,
    },
    {
      url: "/909Snare.WAV",
      instrumentNumber: 2,
    },
  ],
} satisfies TrackState as TrackState;

export const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    addInstrument(state, action: PayloadAction<InstrumentSample>) {
      const idx = state.instruments.findIndex(
        (instrument) =>
          instrument.instrumentNumber === action.payload.instrumentNumber
      );

      if (idx !== -1) {
        state.instruments[idx] = action.payload;
      } else {
        state.instruments.push(action.payload);
      }
    },
    setNote(state, action: PayloadAction<Note>) {
      const idx = findNoteIndex(state.notes, action.payload);
      if (idx !== -1) {
        state.notes[idx] = action.payload;
      } else {
        state.notes.push(action.payload);
      }
    },
    removeNote(state, action: PayloadAction<number>) {
      const idx = state.notes.findIndex(
        (note) => note.stepPosition === action.payload
      );
      if (idx !== -1) {
        state.notes.splice(idx);
      }
    },
    setCurrentBpm(state, action: PayloadAction<number>) {
      state.bpm = action.payload;
    },
    setInterval(state, action: PayloadAction<number>) {
      state.interval = action.payload;
    },
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    increaseCurrentStep(state) {
      if (state.currentStep >= 15) {
        state.currentStep = 0;
      } else {
        state.currentStep++;
      }
    },
    setCurrentSequence(state, action: PayloadAction<number>) {
      state.currentSequence = action.payload;
      state.currentStep = 0;
    },
    addSequence(state) {
      const newSequence = {
        id: `seq-${state.sequences.length + 1}`,
        numberOfSteps: 16,
      };

      state.sequences.push(newSequence);
    },
    removeSequence(state) {
      const sequences = state.sequences.slice();
      sequences.splice(state.sequences.length - 1, 1);

      state.sequences = sequences;
    },
    play(state) {
      state.playerState = "playing";
    },
    pause(state) {
      state.playerState = "paused";
    },
    setMode(state, action: PayloadAction<PLAYER_MODE>) {
      state.playerMode = action.payload;
    },
    setSelectedInstrumentNumber(state, action: PayloadAction<number>) {
      state.selectedInstrumentNumber = action.payload;
    },
  },
});

export const trackActions = trackSlice.actions;

const findNoteIndex = (existingNotes: Note[], note: Note): number => {
  return existingNotes.findIndex(
    (existingNote) =>
      existingNote.pageNumber == note.pageNumber &&
      existingNote.stepPosition == note.stepPosition &&
      existingNote.trackNumber == note.trackNumber
  );
};
