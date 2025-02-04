import { useState, useCallback } from "react";

interface Props {
  callback: (content: string) => void;
}

const JSONUploader = ({ callback }: Props) => {
  const [fileReader] = useState(new FileReader());

  const handleFileRead = useCallback(() => {
    const content = fileReader.result;

    if (callback && typeof content === "string") {
      callback(content);
    }
  }, [fileReader, callback]);

  const handleFileChosen = useCallback(
    (file: File) => {
      if (file) {
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
      }
    },
    [fileReader, handleFileRead]
  );

  return (
    <form encType="multipart/form-data">
      <input
        id="fileInput"
        onChange={(event) => {
          const file = event.target.files ? event.target.files[0] : null;
          if (file) {
            handleFileChosen(file);
          }
        }}
        type="file"
        accept=".json"
        aria-describedby="fileHelp"
      />
    </form>
  );
};

export default JSONUploader;
