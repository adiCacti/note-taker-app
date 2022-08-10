import React, { useCallback, useEffect, useState } from "react";
// libraries
import { useSelector } from "react-redux";
// slices
import { INote, selectedNotes } from "../../../slices/notes";
// components
import Note from "../Note/Note";
// styles
import styles from "./ArchiveGroup.module.scss";
// icons
import { MdOutlineArchive } from "react-icons/md";

const ArchiveGroup = () => {
  const notes = useSelector(selectedNotes);

  const [numOfNotesInArchive, setNumOfNotesInArchive] = useState(0);

  const getNotesInArchive = useCallback(
    () =>
      notes.reduce((acc, { inArchive }) => {
        const value = inArchive ? 1 : 0;
        return (acc += value);
      }, 0),
    [notes]
  );

  useEffect(() => {
    setNumOfNotesInArchive(getNotesInArchive());
  }, [notes]);

  if (numOfNotesInArchive === 0)
    return (
      <div className={styles.outerContainerForEmptyNotes}>
        <div className={styles.emptyNotes}>
          <MdOutlineArchive className={styles.addNotesIcons} />
          <h1 className={styles.addNotesText}>Empty Archive...</h1>
        </div>
      </div>
    );

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
            if (inArchive)
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

export default ArchiveGroup;
