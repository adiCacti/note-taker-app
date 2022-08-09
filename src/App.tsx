import { useState } from "react";
// styles
import styles from "./App.module.scss";
// components
import CreateNote from "./components/Elements/CreateNote/CreateNote";
import Note from "./components/Elements/Note/Note";
import NotesGroup from "./components/Elements/NotesGroup/NotesGroup";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.App}>
      <div className={styles.sideBarContainer}></div>
      <div className={styles.noteTakingContainer}>
        <CreateNote />

        <NotesGroup />
      </div>
    </div>
  );
}

export default App;
