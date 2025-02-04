import { loadSample } from "data/audio/helpers";
import { ReduxStoreState } from "global/store";
import { Note } from "models";
import { useSelector } from "react-redux";

export default function useNoteSample(
  note: Note | undefined,
  audioContext: AudioContext | null
) {
  const instruments = useSelector(
    (state: ReduxStoreState) => state.track.instruments
  );

  // Function to play the sample
  const playNoteSample = async () => {
    if (!audioContext || !note) {
      return;
    }

    const instrument = instruments.find(
      (instrument) => instrument.instrumentNumber === note.instrumentNumber
    );

    if (!instrument) {
      return;
    }

    const sample = await loadSample(instrument.url, audioContext);

    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain(); // Creates a gain node for volume control

    // Set pitch and volume
    source.playbackRate.value = 1;
    gainNode.gain.value = 1;

    // Connect nodes
    gainNode.connect(audioContext.destination);
    source.connect(gainNode);

    source.buffer = sample;
    source.start(0);
  };

  return {
    playNoteSample,
  };
}
