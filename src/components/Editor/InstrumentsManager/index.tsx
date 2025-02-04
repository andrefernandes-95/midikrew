import { useSelector } from "react-redux";
import { Menu } from "./styled";
import { Field } from "componentsStyled/Typography";
import InstrumentInstance from "../InstrumentInstance";
import { ReduxStoreState } from "global/store";

interface Props {
  audioContext: AudioContext | null;
}

const InstrumentsManager = ({ audioContext }: Props) => {
  const instruments = useSelector(
    (state: ReduxStoreState) => state.track.instruments
  );

  return (
    <Menu>
      <Field>Instruments</Field>

      {instruments.map((instrument) => (
        <InstrumentInstance
          instrumentNumber={instrument.instrumentNumber}
          url={instrument.url}
          audioContext={audioContext}
        />
      ))}
    </Menu>
  );
};

export default InstrumentsManager;
