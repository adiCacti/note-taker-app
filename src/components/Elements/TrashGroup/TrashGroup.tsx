import React, { useCallback, useEffect, useState } from "react";
// libraries
import { useSelector } from "react-redux";
// slices
import { INote, selectedNotes } from "../../../slices/notes";
// components
import Note from "../Note/Note";
// styles
import styles from "./TrashGroup.module.scss";

const TrashGroup = () => {
  const notes = useSelector(selectedNotes);

  const [numOfNotesInTrash, setNumOfNotesInTrash] = useState(0);

  const getNotesInTrash = useCallback(
    () =>
      notes.reduce((acc, { inTrash }) => {
        const value = inTrash ? 1 : 0;
        return (acc += value);
      }, 0),
    [notes]
  );

  useEffect(() => {
    setNumOfNotesInTrash(getNotesInTrash());
  }, [notes]);

  if (numOfNotesInTrash === 0) return <></>;

  return (
    <div className={styles.outerContainer}>
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
            if (inTrash)
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

export default TrashGroup;
