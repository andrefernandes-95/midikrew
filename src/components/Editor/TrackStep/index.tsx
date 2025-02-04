/* eslint-disable no-constant-binary-expression */
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrackStepContainer, StepWrapper } from "./styled";
import { ReduxStoreState } from "global/store";
import { trackActions } from "data/track/reducer";
import { Note } from "models";
import useNoteSample from "hooks/useNoteSample";

interface Props {
  stepPosition: number;
  audioContext: AudioContext | null;
}

const TrackStep: React.FC<Props> = ({ stepPosition, audioContext }) => {
  const { notes, selectedInstrument, currentStep } = useSelector(
    (state: ReduxStoreState) => ({
      notes: state.track.notes,
      selectedInstrument: state.track.selectedInstrumentNumber,
      currentStep: state.track.currentStep,
    })
  );

  const stepNote = useMemo(
    () =>
      notes.find(
        (note) =>
          note.pageNumber === 1 &&
          note.trackNumber === 1 &&
          note.stepPosition === stepPosition
      ),
    [notes, stepPosition]
  );

  const { playNoteSample } = useNoteSample(stepNote, audioContext);

  const dispatch = useDispatch();

  if (currentStep === stepPosition && stepNote) {
    playNoteSample();
  }

  return (
    <TrackStepContainer>
      <StepWrapper
        selected={currentStep === stepPosition}
        key={stepPosition}
        index={stepPosition}
        onClick={() => {}}
        onKeyDown={(ev) => {
          if (ev.key === "Backspace") {
            dispatch(trackActions.removeNote(stepPosition));
            return;
          }

          if (keyToNoteMapping[ev.key]) {
            const note: Note = {
              value: keyToNoteMapping[ev.key],
              stepPosition,
              trackNumber: 1,
              pageNumber: 1,
              instrumentNumber: selectedInstrument,
            };

            dispatch(trackActions.setNote(note));
          }
        }}
      >
        {stepNote && stepNote.value + "" + stepNote.instrumentNumber}
      </StepWrapper>
    </TrackStepContainer>
  );
};

export default TrackStep;

const keyToNoteMapping: Record<string, string> = {
  z: "C",
  s: "C#",
  x: "D",
  d: "D#",
  c: "E",
  v: "F",
  g: "F#",
  b: "G",
  h: "G#",
  n: "A",
  j: "A#",
  m: "B",
  ",": "C", // Next octave
  l: "C#",
  ".": "D",
  ";": "D#",
  "/": "E",
};
