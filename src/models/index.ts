export interface Fx {
  volume?: number;
  pitch?: number;
  reverb?: number;
}

export interface Note {
  value: string;
  stepPosition: number;
  pageNumber: number;
  trackNumber: number;
  instrumentNumber: number;
}

export interface InstrumentSample {
  instrumentNumber: number;
  url: string;
}
