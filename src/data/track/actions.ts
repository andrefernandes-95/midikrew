// Action Types
const SET_CURRENT_BPM = "SET_CURRENT_BPM";
const SET_INTERVAL = "SET_INTERVAL";
const SET_CURRENT_STEP = "SET_CURRENT_STEP";
const SET_CURRENT_SEQUENCE = "SET_CURRENT_SEQUENCE";
const ADD_SEQUENCE = "ADD_SEQUENCE";
const REMOVE_SEQUENCE = "REMOVE_SEQUENCE";
const PLAY = "PLAY";
const PAUSE = "PAUSE";
const SET_MODE = "SET_MODE";

// Action Payload Types
interface SetCurrentBpmAction {
  type: typeof SET_CURRENT_BPM;
  payload: number; // BPM value
}

interface SetIntervalAction {
  type: typeof SET_INTERVAL;
  payload: number; // Interval value
}

interface SetCurrentStepAction {
  type: typeof SET_CURRENT_STEP;
  payload: number; // Step value
}

interface SetCurrentSequenceAction {
  type: typeof SET_CURRENT_SEQUENCE;
  payload: number; // Sequence index
}

interface AddSequenceAction {
  type: typeof ADD_SEQUENCE;
  payload?: undefined; // No payload required
}

interface RemoveSequenceAction {
  type: typeof REMOVE_SEQUENCE;
  payload?: undefined; // No payload required
}

interface PlayAction {
  type: typeof PLAY;
  payload?: undefined; // No payload required
}

interface PauseAction {
  type: typeof PAUSE;
  payload?: undefined; // No payload required
}

interface SetModeAction {
  type: typeof SET_MODE;
  payload: "continuous" | "loop"; // Player mode
}

export type TrackAction =
  | SetCurrentBpmAction
  | SetIntervalAction
  | SetCurrentStepAction
  | SetCurrentSequenceAction
  | AddSequenceAction
  | RemoveSequenceAction
  | PlayAction
  | PauseAction
  | SetModeAction;

// actions
const setCurrentBPM = (payload: number): SetCurrentBpmAction => ({
  type: SET_CURRENT_BPM,
  payload,
});

const setInterval = (payload: number): SetIntervalAction => ({
  type: SET_INTERVAL,
  payload,
});

const setCurrentStep = (payload: number): SetCurrentStepAction => ({
  type: SET_CURRENT_STEP,
  payload,
});

const setCurrentSequence = (payload: number): SetCurrentSequenceAction => ({
  type: SET_CURRENT_SEQUENCE,
  payload,
});

const addSequence = (): AddSequenceAction => ({
  type: ADD_SEQUENCE,
});

const removeSequence = (): RemoveSequenceAction => ({
  type: REMOVE_SEQUENCE,
});

const play = (): PlayAction => ({
  type: PLAY,
});

const pause = (): PauseAction => ({
  type: PAUSE,
});

const setMode = (payload: "continuous" | "loop"): SetModeAction => ({
  type: SET_MODE,
  payload,
});

export default {
  setCurrentBPM,
  setInterval,
  setCurrentStep,
  setCurrentSequence,
  addSequence,
  removeSequence,
  play,
  pause,
  setMode,
  SET_CURRENT_BPM,
  SET_INTERVAL,
  SET_CURRENT_STEP,
  SET_CURRENT_SEQUENCE,
  ADD_SEQUENCE,
  REMOVE_SEQUENCE,
  PLAY,
  PAUSE,
  SET_MODE,
};
