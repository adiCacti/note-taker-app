import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
// icons
import { BsPin, BsPinFill } from "react-icons/bs";
import { MdOutlineArchive, MdOutlineImage } from "react-icons/md";
import { IoColorFillOutline } from "react-icons/io5";
// styles
import styles from "./CreateNote.module.scss";
// libraries
import { v4 as uuid } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
// hooks
import { useDispatch } from "react-redux";
// slices
import { addNote } from "../../../slices/notes";
// types
import { INote } from "../../../slices/notes";
// components
import Dropzone from "../Dropzone/Dropzone";

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

const CreateNote = () => {
  const dispatch = useDispatch();

  const [isHovering, setIsHovering] = useState(false);

  const [isDropzoneOpen, setIsDropzoneOpen] = useState(false);

  const [fileToImport, setFileToImport] = useState<any>();

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

  const handleCreateNoteBtnClick = () => {
    dispatch(addNote(noteState));
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
    setFileToImport([]);
    setIsDropzoneOpen(false);
  };

  const handleDropzone = () => {
    setIsDropzoneOpen((prev) => !prev);
  };

  useEffect(() => {
    if (fileToImport !== undefined && fileToImport.length > 0) {
      setNoteState((prev) => {
        return {
          ...prev,
          images: [...fileToImport],
        };
      });
    }
  }, [fileToImport]);

  useEffect(() => {
    console.log("inside createnote");
    console.log(noteState.images);
  }, [noteState]);

  return (
    <div className={styles.outerContainer}>
      <div
        className={styles.container}
        style={{
          backgroundColor: noteState.bgColor,
        }}
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

        {isHovering && (
          <textarea
            className={styles.content}
            value={noteState.note}
            onChange={(e) => {
              handleNoteChange(e);
            }}
            ref={textRef}
            placeholder='Take a note....'
          />
        )}

        <AnimatePresence>
          {isDropzoneOpen && (
            <Dropzone key={1} setFileToImport={setFileToImport} />
          )}

          {noteState.images && (
            <div key={2} className={styles.imgPreviewContainer}>
              {noteState.images.map((image: string, index: number) => (
                <div key={index} className={styles.imgOuter}>
                  <img
                    src={image}
                    className={styles.img}
                    onLoad={() => {
                      URL.revokeObjectURL(image);
                    }}
                  />
                </div>
              ))}
            </div>
          )}

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

              <MdOutlineImage
                className={styles.bottomIcons}
                onClick={handleDropzone}
              />

              <MdOutlineArchive className={styles.bottomIcons} />

              <button
                className={styles.createNoteBtn}
                onClick={handleCreateNoteBtnClick}
              >
                Create Note
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CreateNote;
