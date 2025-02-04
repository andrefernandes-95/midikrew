import INSTRUMENT_ACTIONS from "data/instrument/actions";
import { loadSample } from "data/audio/helpers";
import reduxStore, { ReduxStoreState } from "global/store";
import { Instrument } from "data/instrument/types";
import { trackActions } from "data/track/reducer";

export const importProject = (json: string) => {
  const file = JSON.parse(json);

  // Set BPM
  reduxStore.dispatch(trackActions.setCurrentBpm(file.bpm));

  // Set Number Of Sequences
  const fileSequencesLength = file.sequences.length;
  for (let i = 1; i < fileSequencesLength; i++) {
    reduxStore.dispatch(trackActions.addSequence());
  }

  // Set Instruments (For Each Instrument, we need to load Sample)
  const audioContext = (reduxStore.getState() as ReduxStoreState).track
    .audioContext;

  // CLEAN ALL INSTRUMENTS BEFORE UPLOADING SAVED ONES!
  reduxStore.dispatch(INSTRUMENT_ACTIONS.clearAll());

  file.instruments.instruments.forEach((instrument: Instrument) => {
    loadSample(
      instrument.samplePath,
      audioContext,
      1,
      1,
      (sampleLoaded: AudioBuffer) => {
        const returnedInstrument = {
          ...instrument,
          sampleSource: sampleLoaded,
        };

        reduxStore.dispatch(
          INSTRUMENT_ACTIONS.addInstrument(returnedInstrument)
        );
      }
    );
  });
};

export const exportProject = () => {
  const instruments = reduxStore.getState().instruments;
  const bpm = reduxStore.getState().track.bpm;
  const sequences = reduxStore.getState().track.sequences;

  const config = {
    instruments,
    bpm,
    sequences,
  };

  const encoded = JSON.stringify(config);
  const dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(encoded);

  const exportFileDefaultName = `midikrew-${Date.now()}.json`;

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
};
