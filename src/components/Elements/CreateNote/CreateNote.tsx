import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
// icons
import { BsPin, BsPinFill } from "react-icons/bs";
import { MdArchive, MdOutlineArchive, MdOutlineImage } from "react-icons/md";
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

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const CreateNote = () => {
  const dispatch = useDispatch();

  const [isHovering, setIsHovering] = useState(false);

  const [file, setFile] = useState<any>(null);

  const [fileDataURL, setFileDataURL] = useState<string | null>(null);

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

  const handleArchiveNote = () => {
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
  };

  const changeHandler = (e: any) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };

  useEffect(() => {
    let fileReader: FileReader,
      isCancel = false;
    if (file as any) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target as any;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      if (file) {
        fileReader.readAsDataURL(file);
      }
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  useEffect(() => {
    if (!fileDataURL) return;
    setNoteState((prev) => {
      return {
        ...prev,
        images: [...prev.images, fileDataURL],
      };
    });
  }, [fileDataURL]);

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

        {noteState.images && (
          <div key={2} className={styles.imgPreviewContainer}>
            {noteState.images.map((image: string, index: number) => {
              return (
                <div key={index} className={styles.imgOuter}>
                  <img src={image} className={styles.img} />
                </div>
              );
            })}
          </div>
        )}

        <div className={styles.bottomIconsContainer}>
          <IoColorFillOutline
            className={styles.bottomIcons}
            onClick={handleColorChange}
          />

          <label className={styles.uploadImg}>
            <MdOutlineImage className={styles.bottomIcons} />
            <input
              type='file'
              id='image'
              accept='.png, .jpg, .jpeg'
              onChange={changeHandler}
            />
          </label>

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

          <button
            className={styles.createNoteBtn}
            onClick={handleCreateNoteBtnClick}
          >
            Create Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
