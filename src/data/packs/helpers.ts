import type { Instrument } from "data/instrument/types";
import { loadSample } from "data/audio/helpers";
import { instrumentsActions } from "data/instrument/reducer";
import reduxStore from "global/store";

export const extractInstrumentFromPack = (
  name: string,
  pack: Instrument[]
): Instrument | undefined =>
  pack.find((instrument) => instrument.name === name);

export const loader = (instrument: Instrument | Instrument[]) => {
  const audioContext = reduxStore.getState().track.audioContext;

  if (instrument && Array.isArray(instrument)) {
    instrument.forEach((instrument) => {
      loadAsync(instrument, audioContext);
    });
  } else {
    loadAsync(instrument, audioContext);
  }
};

export const loadAsync = (
  instrument: Instrument,
  audioContext: AudioContext
) => {
  loadSample(
    instrument.samplePath,
    audioContext,
    1,
    1,
    (result: AudioBuffer) => {
      const _instrument = {
        ...instrument,
        sampleSource: result,
      };

      reduxStore.dispatch(instrumentsActions.addInstrument(_instrument));
    }
  );
};
