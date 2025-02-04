import { Button } from "componentsStyled/Buttons";
import { InstrumentContainer } from "./styled";
import { Text } from "componentsStyled/Typography";
import { loadSample } from "data/audio/helpers";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStoreState } from "global/store";
import { trackActions } from "data/track/reducer";

interface InstrumentInstanceProps {
  url: string;
  instrumentNumber: number;
  audioContext: AudioContext | null;
}

const InstrumentInstance: React.FC<InstrumentInstanceProps> = ({
  instrumentNumber,
  url,
  audioContext,
}) => {
  // Function to play the sample
  const playSample = async () => {
    const sample = await loadSample(url, audioContext);

    if (!audioContext) {
      return;
    }

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

  const selectedInstrumentNumber = useSelector(
    (state: ReduxStoreState) => state.track.selectedInstrumentNumber
  );

  const dispatch = useDispatch();

  return (
    <InstrumentContainer
      onClick={(ev) => {
        ev.stopPropagation();
        ev.preventDefault();

        dispatch(trackActions.setSelectedInstrumentNumber(instrumentNumber));
      }}
      selected={selectedInstrumentNumber === instrumentNumber}
    >
      <Text>{url.split("/")?.reverse()?.[0]}</Text>

      <Button
        onClick={(ev) => {
          ev.stopPropagation();
          ev.preventDefault();

          playSample();
        }}
      >
        Play
      </Button>
    </InstrumentContainer>
  );
};

export default InstrumentInstance;
