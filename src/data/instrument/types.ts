export interface Instrument {
  id: string;
  name: string;
  samplePath: string;
  sampleSource?: AudioBuffer;
  sequences: Array<Array<Sequence>>;
}

export interface Sequence {
  index?: number;
  fx?: {
    pitch?: number;
    volume?: number;
    reverb?: boolean;
  };
}

export interface InstrumentSample {
  sampleSource?: AudioBuffer;
  instrumentID: number;
}
