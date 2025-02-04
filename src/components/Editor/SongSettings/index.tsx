import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "componentsStyled/Buttons";
import { Field } from "componentsStyled/Typography";
import {
  MdContentCopy as CopyIcon,
  MdContentPaste as PasteIcon,
} from "react-icons/md";
import { Menu, Input } from "./styled";
import { trackActions } from "data/track/reducer";
import { ReduxStoreState } from "global/store";
import { instrumentsActions } from "data/instrument/reducer";

const SongSettings = () => {
  const dispatch = useDispatch();
  const bpm = useSelector((state: ReduxStoreState) => state.track.bpm);
  const currentSequence = useSelector(
    (state: ReduxStoreState) => state.track.currentSequence
  );

  const copySequence = useCallback(
    () => dispatch(instrumentsActions.copySequence(currentSequence)),
    [dispatch, currentSequence]
  );

  const pasteSequence = useCallback(
    () => dispatch(instrumentsActions.pasteSequence(currentSequence)),
    [dispatch, currentSequence]
  );

  return (
    <Menu>
      <IconButton onClick={copySequence}>
        <CopyIcon />
      </IconButton>
      <IconButton onClick={pasteSequence}>
        <PasteIcon />
      </IconButton>
      &nbsp;
      <Field>BPM: </Field>
      <Input
        title="Set the current tempo of the song"
        type="number"
        value={bpm}
        onChange={(ev) => {
          const value = Number(ev.currentTarget.value);
          dispatch(trackActions.setCurrentBpm(value));
        }}
      />
    </Menu>
  );
};

export default SongSettings;
