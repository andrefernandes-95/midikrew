import React, { useEffect, useCallback, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  TiMediaPlay as PlayIcon,
  TiMediaPause as PauseIcon,
} from "react-icons/ti";
import { trackActions } from "data/track/reducer";
import { IconButton } from "componentsStyled/Buttons";
import {
  StyledBoxSection as BoxSection,
  MainContainer,
  TopContainer,
  Wrapper,
  Column,
  Instrument as InstrumentContainer,
  GridWrapper,
} from "./styled";
import TrackSequence from "../TrackSequence";
import InstrumentsManager from "../InstrumentsManager";
import { ReduxStoreState } from "global/store";

const SequenceManager: React.FC = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  const dispatch = useDispatch();
  const timerID = useRef<NodeJS.Timeout>(null);

  const { bpm, playerState, currentStep } = useSelector(
    (state: ReduxStoreState) => ({
      bpm: state.track.bpm,
      playerState: state.track.playerState,
      currentStep: state.track.currentStep,
    })
  );

  const setIntervalAction = useCallback(
    (interval: number) => dispatch(trackActions.setInterval(interval)),
    [dispatch]
  );

  const play = useCallback(() => dispatch(trackActions.play()), [dispatch]);
  const pause = useCallback(() => dispatch(trackActions.pause()), [dispatch]);

  console.log("current step", currentStep);
  const handlePlayer = useCallback(() => {
    if (!audioContext) {
      setAudioContext(new AudioContext());
    }

    if (playerState === "playing") {
      if (timerID.current) clearInterval(timerID.current);
      pause();
    } else {
      const tempo = bpm || 120;
      const linesPerBeat = 4;
      const interval = (Math.pow(10, 4) * 6) / linesPerBeat / tempo;
      timerID.current = setInterval(() => {
        dispatch(trackActions.increaseCurrentStep());
      }, interval);
      setIntervalAction(interval);

      play();
    }
  }, [bpm, playerState, pause, play, setIntervalAction]);

  // Effect to handle BPM changes
  useEffect(() => {
    return () => {
      if (timerID.current) clearInterval(timerID.current);
    };
  }, []);

  return (
    <>
      <BoxSection>
        <MainContainer>
          <TopContainer>
            <IconButton title="Play / pause player" onClick={handlePlayer}>
              {playerState === "playing" ? <PauseIcon /> : <PlayIcon />}
            </IconButton>
          </TopContainer>
        </MainContainer>
      </BoxSection>

      <Wrapper>
        <Column>
          <InstrumentContainer>
            <p>Track</p>
          </InstrumentContainer>

          <GridWrapper>
            <TrackSequence audioContext={audioContext} />
          </GridWrapper>
        </Column>

        <Column>
          <InstrumentsManager audioContext={audioContext} />
        </Column>
      </Wrapper>
    </>
  );
};

export default SequenceManager;
