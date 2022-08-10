import React from "react";
// icons
import { HiOutlineDocumentAdd } from "react-icons/hi";
// hooks
import { useSelector } from "react-redux";
// slices
import { INote, selectedNotes } from "../../../slices/notes";
// components
import Note from "../Note/Note";
// styles
import styles from "./NotesGroup.module.scss";

const NotesGroup = () => {
  const notes = useSelector(selectedNotes);

  if (notes.length === 0) {
    return (
      <div className={styles.outerContainerForEmptyNotes}>
        <div className={styles.emptyNotes}>
          <HiOutlineDocumentAdd className={styles.addNotesIcons} />
          <h1 className={styles.addNotesText}>Add Notes...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.outerContainer}>
      <h2>Notes 📝 </h2>
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
            if (!isPinned && !inTrash && !inArchive)
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

export default NotesGroup;
