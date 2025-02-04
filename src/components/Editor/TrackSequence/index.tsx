// @flow
import React from "react";
import TrackStep from "../TrackStep";

const generator: number[] = [];
for (let i = 0; i <= 15; i++) {
  generator.push(i);
}

interface Props {
  audioContext: AudioContext | null;
}

const TrackSequence = ({ audioContext }: Props) => {
  return (
    <React.Fragment>
      {generator.map((stepIndex) => {
        return (
          <TrackStep
            key={stepIndex}
            stepPosition={stepIndex}
            audioContext={audioContext}
          />
        );
      })}
    </React.Fragment>
  );
};

export default TrackSequence;
