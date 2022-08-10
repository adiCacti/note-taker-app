import React, { useCallback, useEffect, useState } from "react";
// libraries
import { useSelector } from "react-redux";
// slices
import { INote, selectedNotes } from "../../../slices/notes";
// components
import Note from "../Note/Note";
// styles
import styles from "./PinGroup.module.scss";

const PinGroup = () => {
  const notes = useSelector(selectedNotes);

  const [numOfPinNotes, setNumOfPinNotes] = useState(0);

  const getPinnedNotes = useCallback(
    () =>
      notes.reduce((acc, { isPinned }) => {
        const value = isPinned ? 1 : 0;
        return (acc += value);
      }, 0),
    [notes]
  );

  useEffect(() => {
    setNumOfPinNotes(getPinnedNotes());
  }, [notes]);

  if (numOfPinNotes === 0) return <></>;

  return (
    <div className={styles.outerContainer}>
      <h2>Pinned Notes 📌</h2>
      <div className={styles.container}>
        {notes.map(
          ({
            id,
            title,
            note,
            bgColor,
            images,
            isPinned,
            inTrash,
            inArchive,
          }: INote) => {
            if (isPinned && !inTrash && !inArchive)
              return (
                <Note
                  key={id}
                  id={id}
                  title={title}
                  note={note}
                  bgColor={bgColor}
                  images={images}
                  isPinned={isPinned}
                  inTrash={inTrash}
                  inArchive={inArchive}
                />
              );
          }
        )}
      </div>
    </div>
  );
};

export default PinGroup;
