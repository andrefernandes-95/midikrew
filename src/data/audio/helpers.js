// @flow
import { reduxStore } from '../../index'
import INSTRUMENT_ACTIONS from 'data/instrument/actions'
import type { Instrument } from 'data/instrument/types'

export const loadPack = (pack: Instrument[]) => {
  const audioContext = reduxStore.getState().track.audioContext

  pack.forEach(instrument => {
    loadSample(instrument.samplePath, audioContext, 1, 1, result => {
      const _instrument = {
        ...instrument,
        sampleSource: result,
      }

      reduxStore.dispatch(
        INSTRUMENT_ACTIONS.addInstrument(_instrument)
      )
    })
  })
}


export const loadSample = async (
  url: string,
  audioContext: AudioContext,
  pitch: number = 1,
  volume: number = 1,
  callback: Function,
) => {
  var request = new XMLHttpRequest()

//  var originalUrl = url
  url = url.replace('public/', '/')

  request.open('GET', url, true)
  request.responseType = 'arraybuffer'

  // Decode asynchronously
  request.onload = function () {
    audioContext.decodeAudioData(request.response, function (buffer) {
      // Now for the fun part :)
      var source = audioContext.createBufferSource(); // creates a sound source

      // Pitch
      source.playbackRate.value = pitch
      // Volume
      var gainNode = audioContext.createGain()
      gainNode.gain.value = volume


      gainNode.connect(audioContext.destination)
      source.connect(gainNode)

      source.buffer = buffer
      source.connect(audioContext.destination)

      callback(buffer)
    }, () => {})
  }

  request.send()
}
