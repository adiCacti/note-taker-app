import React from "react";
// libraries
import { useSelector } from "react-redux";
import { selectedNotes } from "../../../slices/notes";
import Note from "../Note/Note";
// styles
import styles from "./NotesGroup.module.scss";

const NotesGroup = () => {
  const notes = useSelector(selectedNotes);

  console.log(notes);

  return (
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
        }): any => {
          <Note
            id={id}
            title={title}
            note={note}
            bgColor={bgColor}
            images={images}
            isPinned={isPinned}
            inTrash={inTrash}
            inArchive={inArchive}
          />;
        }
      )}
    </div>
  );
};

export default NotesGroup;
