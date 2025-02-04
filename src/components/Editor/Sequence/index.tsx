import { useDispatch, useSelector } from "react-redux";
import { Wrapper } from "./styled";
import { trackActions } from "data/track/reducer";
import { ReduxStoreState } from "global/store";

interface Props {
  id: number; // The sequence index in the sequence list
}

const Sequence = ({ id }: Props) => {
  const dispatch = useDispatch();

  const currentSequence = useSelector(
    (state: ReduxStoreState) => state.track.currentSequence
  );

  return (
    <Wrapper
      onClick={() => {
        if (id !== currentSequence) {
          dispatch(trackActions.setCurrentSequence(id));
        }
      }}
      active={id === currentSequence}
    >
      {id + 1}
    </Wrapper>
  );
};

export default Sequence;
