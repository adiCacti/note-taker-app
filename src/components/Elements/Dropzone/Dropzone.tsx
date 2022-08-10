// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
// libraries
import { useDropzone } from "react-dropzone/";

interface FileDropzoneProps {
  setFileToImport: any;
}

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 0.1,
  borderRadius: 10,
  borderColor: "rgba(255,255,255,0.2)",
  borderStyle: "solid",
  backgroundColor: "transparent",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  marginTop: "15px",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function FileDropzone({ setFileToImport }: FileDropzoneProps) {
  const [files, setFiles] = useState<any>();

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      maxFiles: 10,
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  useEffect(() => {
    if (!files) return;
    setFileToImport((prev: any) => {
      if (prev !== undefined) return [...prev, files[0].preview];
      else return [files[0].preview];
    });
  }, [files]);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className='container'>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag n drop images here</p>
      </div>
    </div>
  );
}

export default FileDropzone;
