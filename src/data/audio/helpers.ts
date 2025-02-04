export const loadSample = (
  url: string,
  audioContext: AudioContext | null
): Promise<AudioBuffer> => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = function () {
      if (!audioContext) {
        return;
      }

      audioContext.decodeAudioData(
        request.response,
        (buffer) => {
          // Resolving with the decoded audio buffer
          resolve(buffer);
        },
        () => {
          // Reject the promise if an error occurs during decoding
          reject(new Error("Error decoding audio data"));
        }
      );
    };

    request.onerror = function () {
      // Reject if the request itself fails
      reject(new Error("Request failed"));
    };

    request.send();
  });
};
