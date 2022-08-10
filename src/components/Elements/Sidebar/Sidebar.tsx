import React from "react";
// styles
import styles from "./Sidebar.module.scss";
// icons
import { MdOutlineLightbulb, MdOutlineArchive } from "react-icons/md";
import { BiTrash } from "react-icons/bi";

interface SidebarProps {
  selectedSideBarTopic: "notes" | "archive" | "trash";
  handleSideBarTopicUpdate: (topic: "notes" | "archive" | "trash") => void;
}

const Sidebar = ({
  selectedSideBarTopic,
  handleSideBarTopicUpdate,
}: SidebarProps) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.sideBarTopicOuter}
        style={
          selectedSideBarTopic === "notes"
            ? { backgroundColor: "rgba(251, 188, 4, 0.2)" }
            : {}
        }
        onClick={() => handleSideBarTopicUpdate("notes")}
      >
        <div className={styles.sidebarTopic}>
          <MdOutlineLightbulb className={styles.icons} />
          <h1>Notes</h1>
        </div>
      </div>

      <div
        className={styles.sideBarTopicOuter}
        style={
          selectedSideBarTopic === "archive"
            ? { backgroundColor: "rgba(251, 188, 4, 0.2)" }
            : {}
        }
        onClick={() => handleSideBarTopicUpdate("archive")}
      >
        <div className={styles.sidebarTopic}>
          <MdOutlineArchive className={styles.icons} />
          <h1>Archive</h1>
        </div>
      </div>

      <div
        className={styles.sideBarTopicOuter}
        style={
          selectedSideBarTopic === "trash"
            ? { backgroundColor: "rgba(251, 188, 4, 0.2)" }
            : {}
        }
        onClick={() => handleSideBarTopicUpdate("trash")}
      >
        <div className={styles.sidebarTopic}>
          <BiTrash className={styles.icons} />
          <h1>Trash</h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
