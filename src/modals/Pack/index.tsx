import { extractInstrumentFromPack, loader } from "data/packs/helpers";
import type { Instrument } from "data/instrument/types";
import { Field, Text } from "componentsStyled/Typography";
import { PaddedIconButton, FullIconButton } from "componentsStyled/Buttons";
import { PaddedColumn, PaddedContainer } from "componentsStyled/Layout";
import { StyledLi } from "./styled";

interface Props {
  close: () => void;
  pack: Instrument[];
  credits: {
    name: string;
    source: string;
  };
}

const getFormat = (str: string) => {
  const splitted = str.split(".");
  const media = splitted[splitted.length - 1];

  return media.toLowerCase();
};

const Pack = ({ credits, pack }: Props) => (
  <>
    <ul>
      <PaddedContainer>
        <Text>
          Samples downloaded from &nbsp;{" "}
          <a href={credits.source} rel="noopener noreferrer" target="_blank">
            {credits.name}
          </a>
        </Text>
      </PaddedContainer>
      <hr />
      <br />
      {pack.map((instrument) => (
        <StyledLi
          key={instrument.id}
          onClick={() => {
            const selectedInstrument = extractInstrumentFromPack(
              instrument.name,
              pack
            );

            if (!selectedInstrument) {
              return;
            }

            return loader(selectedInstrument);
          }}
        >
          <PaddedColumn>
            <Field>{instrument.name}</Field>
            <PaddedIconButton>Add Instrument</PaddedIconButton>
          </PaddedColumn>
          <audio controls>
            <source
              src={instrument.samplePath}
              type={`audio/${getFormat(instrument.samplePath)}`}
            />
          </audio>
        </StyledLi>
      ))}
      <FullIconButton onClick={() => loader(pack)}>Add all</FullIconButton>
    </ul>
  </>
);

export default Pack;
