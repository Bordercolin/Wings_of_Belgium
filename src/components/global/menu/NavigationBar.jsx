import React, { useState } from "react";
import styles from "./navigationBar.module.css";
import ProgressBar from "../progress/ProgressBar";

import MenuButton from "../buttons/MenuButton";

export default function NavigationBar() {

  return (
    <nav className={styles.container}>
      <img
        className={styles.expStart}
        src="/assets/img/menu/progressBar.png"
        alt=""
      />
      <ProgressBar />
      <MenuButton />
    </nav>
  );
}
