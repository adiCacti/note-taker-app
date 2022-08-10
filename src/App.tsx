import { useState } from "react";
// styles
import styles from "./App.module.scss";
import ArchiveGroup from "./components/Elements/ArchiveGroup/ArchiveGroup";
// components
import CreateNote from "./components/Elements/CreateNote/CreateNote";
import NotesGroup from "./components/Elements/NotesGroup/NotesGroup";
import PinGroup from "./components/Elements/PinGroup/PinGroup";
import Sidebar from "./components/Elements/Sidebar/Sidebar";
import TrashGroup from "./components/Elements/TrashGroup/TrashGroup";

function App() {
  const [selectedSideBarTopic, setSelectedSideBarTopic] = useState<
    "notes" | "archive" | "trash"
  >("notes");

  const handleSideBarTopicUpdate = (topic: "notes" | "archive" | "trash") => {
    setSelectedSideBarTopic(topic);
  };

  return (
    <div className={styles.App}>
      <Sidebar
        selectedSideBarTopic={selectedSideBarTopic}
        handleSideBarTopicUpdate={handleSideBarTopicUpdate}
      />

      <div className={styles.noteTakingContainer}>
        {selectedSideBarTopic === "notes" && (
          <>
            <CreateNote />
            <PinGroup />
            <NotesGroup />
          </>
        )}

        {selectedSideBarTopic === "trash" && <TrashGroup />}

        {selectedSideBarTopic === "archive" && <ArchiveGroup />}
      </div>
    </div>
  );
}

export default App;
