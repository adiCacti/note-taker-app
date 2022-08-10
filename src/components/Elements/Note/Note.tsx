import { ChangeEvent, useRef, useState } from "react";
// icons
import { BsPin, BsPinFill } from "react-icons/bs";
import {
  MdDelete,
  MdDeleteOutline,
  MdOutlineArchive,
  MdArchive,
  MdOutlineImage,
} from "react-icons/md";
import { IoColorFillOutline } from "react-icons/io5";
// styles
import styles from "./Note.module.scss";
// libraries
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
// slices
import { deleteNote, updateNote } from "../../../slices/notes";
// types
import { INote } from "../../../slices/notes";

const bgColorForNote = [
  "#5D2C2A",
  "#614A19",
  "#635D19",
  "#355920",
  "#17504B",
  "#4D409A",
  "#1E3A5F",
  "#42275F",
  "#5B2346",
  "#452F19",
  "#3D3F44",
];

interface NotesProps extends INote {}

const Note = ({
  id,
  title,
  note,
  bgColor,
  images,
  isPinned,
  inTrash,
  inArchive,
}: NotesProps) => {
  const dispatch = useDispatch();

  const [isHovering, setIsHovering] = useState(false);

  const [noteState, setNoteState] = useState<INote>({
    id: id,
    title: title,
    note: note,
    bgColor: bgColor,
    images: images,
    isPinned: isPinned,
    inTrash: inTrash,
    inArchive: inArchive,
  });

  const textRef = useRef<null | HTMLTextAreaElement>(null);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNoteState((prev) => {
      return {
        ...prev,
        title: e.target.value,
      };
    });
  };

  const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteState((prev) => {
      return {
        ...prev,
        note: e.target.value,
      };
    });
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleColorChange = () => {
    const randomBgColor =
      bgColorForNote[Math.floor(Math.random() * bgColorForNote.length)];

    setNoteState((prev) => {
      return {
        ...prev,
        bgColor: randomBgColor,
      };
    });
  };

  const handlePinNote = () => {
    if (noteState.isPinned) {
      setNoteState((prev) => {
        return {
          ...prev,
          isPinned: false,
        };
      });
    } else {
      setNoteState((prev) => {
        return {
          ...prev,
          isPinned: true,
        };
      });
    }
  };

  const handleUpdateNoteBtnClick = () => {
    dispatch(updateNote(noteState));
  };

  const handleDeleteNote = () => {
    if (noteState.inTrash) {
      dispatch(deleteNote(noteState.id));
    } else {
      setNoteState((prev) => {
        return {
          ...prev,
          inTrash: true,
        };
      });
    }
  };

  const handleArchiveNote = () => {
    console.log(noteState.inArchive);
    if (noteState.inArchive) {
      setNoteState((prev) => {
        return {
          ...prev,
          inArchive: false,
        };
      });
    } else {
      setNoteState((prev) => {
        return {
          ...prev,
          inArchive: true,
        };
      });
    }
  };

  return (
    <div
      className={styles.container}
      style={
        isHovering
          ? {
              backgroundColor: noteState.bgColor,
              justifyContent: "space-between",
            }
          : { backgroundColor: noteState.bgColor, justifyContent: "flex-start" }
      }
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className={styles.headingContainer}>
        <input
          type='text'
          className={styles.title}
          value={noteState.title}
          onChange={(e) => handleTitleChange(e)}
          placeholder='Title'
        />

        <AnimatePresence>
          {isHovering &&
            (noteState.isPinned ? (
              <motion.div
                className={styles.pinIcons}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handlePinNote}
              >
                <BsPinFill className={styles.pin} />
              </motion.div>
            ) : (
              <motion.div
                className={styles.pinIcons}
                onClick={handlePinNote}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <BsPin className={styles.pin} />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      <textarea
        className={styles.content}
        value={noteState.note}
        onChange={(e) => {
          handleNoteChange(e);
        }}
        ref={textRef}
        placeholder='Take a note....'
      />

      <AnimatePresence>
        {isHovering && (
          <motion.div
            className={styles.bottomIconsContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <IoColorFillOutline
              className={styles.bottomIcons}
              onClick={handleColorChange}
            />
            <MdOutlineImage className={styles.bottomIcons} />

            {noteState.inArchive ? (
              <MdArchive
                className={styles.bottomIcons}
                onClick={handleArchiveNote}
              />
            ) : (
              <MdOutlineArchive
                className={styles.bottomIcons}
                onClick={handleArchiveNote}
              />
            )}

            {noteState.inTrash ? (
              <MdDelete
                className={styles.bottomIcons}
                onClick={handleDeleteNote}
              />
            ) : (
              <MdDeleteOutline
                className={styles.bottomIcons}
                onClick={handleDeleteNote}
              />
            )}

            <button
              className={styles.updateNowBtn}
              onClick={handleUpdateNoteBtnClick}
            >
              Update Note
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Note;
