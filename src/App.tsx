import React from "react";
import { RandomPuppy } from "./components/RandomPuppy";
import styles from "./styles/Style.module.css";

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <RandomPuppy />
      </header>
    </div>
  );
}

export default App;
