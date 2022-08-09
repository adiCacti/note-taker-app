import { useState } from "react";

import styles from "./App.module.scss";
import Note from "./components/Elements/Note/Note";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.App}>
      <Note />
    </div>
  );
}

export default App;
