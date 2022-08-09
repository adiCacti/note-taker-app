import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
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
// redux
import { useSelector, useDispatch } from "react-redux";
import {
  updateTitle,
  updateNote,
  updateBgColor,
  addImages,
  removeImages,
  addInTrash,
  removeFromTrash,
  addInArchive,
  removeFromArchive,
  addNoteToPinned,
  removeNoteFromPinned,
  selectTitle,
  selectNote,
  selectBgColor,
  selectImages,
  selectIsPinned,
  selectInTrash,
  selectInArchive,
} from "../../../slices/note";
// libraries
import { useAutoAnimate } from "@formkit/auto-animate/react";

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

const Note = () => {
  const [isHovering, setIsHovering] = useState(false);

  const title = useSelector(selectTitle);
  const note = useSelector(selectNote);
  const bgColor = useSelector(selectBgColor);
  const images = useSelector(selectImages);
  const isPinned = useSelector(selectIsPinned);
  const inTrash = useSelector(selectInTrash);
  const inArchive = useSelector(selectInArchive);
  const dispatch = useDispatch();

  console.log({ isPinned });

  const textRef = useRef<null | HTMLTextAreaElement>(null);

  const [parent] = useAutoAnimate();

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTitle(e.target.value));
  };

  const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateNote(e.target.value));
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleColorChange = () => {
    const randomBgColor =
      bgColorForNote[Math.floor(Math.random() * bgColorForNote.length)];
    console.log(randomBgColor);
    dispatch(updateBgColor(randomBgColor));
  };

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: bgColor }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      ref={parent}
    >
      <div className={styles.headingContainer}>
        <input
          type='text'
          className={styles.title}
          value={title}
          onChange={(e) => handleTitleChange(e)}
        />

        {isHovering &&
          (isPinned ? (
            <div
              className={styles.pinIcons}
              onClick={() => dispatch(removeNoteFromPinned())}
            >
              <BsPinFill className={styles.pin} />
            </div>
          ) : (
            <div
              className={styles.pinIcons}
              onClick={() => dispatch(addNoteToPinned())}
            >
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
        </div>
      )}
    </div>
  );
};

export default Note;
