import { ChangeEvent, LegacyRef, useRef, useState } from "react";
// icons
import { BsPin, BsPinFill } from "react-icons/bs";
import {
  MdDeleteOutline,
  MdOutlineArchive,
  MdOutlineImage,
} from "react-icons/md";
import { IoColorFillOutline } from "react-icons/io5";
// styles
import styles from "./Note.module.scss";
// libraries
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { updateNote } from "../../../slices/notes";
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
  const [parent] = useAutoAnimate();

  const dispatch = useDispatch();

  const [isHovering, setIsHovering] = useState(false);

  const [noteState, setNoteState] = useState<INote>({
    id: uuid(),
    title: "",
    note: "",
    bgColor: "#1F2025",
    images: [],
    isPinned: false,
    inTrash: false,
    inArchive: false,
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
    if (isPinned) {
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
    setNoteState({
      id: uuid(),
      title: "",
      note: "",
      bgColor: "#1F2025",
      images: [],
      isPinned: false,
      inTrash: false,
      inArchive: false,
    });
  };
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: bgColor }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      ref={parent as LegacyRef<HTMLDivElement> | undefined}
    >
      <div className={styles.headingContainer}>
        <input
          type='text'
          className={styles.title}
          value={title}
          onChange={(e) => handleTitleChange(e)}
          placeholder='Title'
        />

        {isHovering &&
          (isPinned ? (
            <div className={styles.pinIcons} onClick={handlePinNote}>
              <BsPinFill className={styles.pin} />
            </div>
          ) : (
            <div className={styles.pinIcons} onClick={handlePinNote}>
              <BsPin className={styles.pin} />
            </div>
          ))}
      </div>

      <textarea
        className={styles.content}
        value={note}
        onChange={(e) => {
          handleNoteChange(e);
        }}
        ref={textRef}
        placeholder='Take a note....'
      />

      {isHovering && (
        <div className={styles.bottomIconsContainer}>
          <IoColorFillOutline
            className={styles.bottomIcons}
            onClick={handleColorChange}
          />
          <MdOutlineImage className={styles.bottomIcons} />
          <MdOutlineArchive className={styles.bottomIcons} />
          <MdDeleteOutline className={styles.bottomIcons} />

          <button
            className={styles.createNoteBtn}
            onClick={handleUpdateNoteBtnClick}
          >
            Update Note
          </button>
        </div>
      )}
    </div>
  );
};

export default Note;
