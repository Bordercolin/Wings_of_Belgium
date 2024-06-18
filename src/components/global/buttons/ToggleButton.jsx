import React from "react";
import styles from "./togglebtn.module.css";

export default function ToggleButton({ label, isOn, onToggle }) {
  return (
    <div className={styles.btnSetting}>
      <p>{label}</p>
      <div onClick={onToggle} className={styles.toggleButton}>
        <span
          className={styles.buttonOptions}
          style={{ backgroundColor: isOn ? "#FF9E20" : "" }}
        >
          ON
        </span>{" "}
        <span
          className={styles.buttonOptions}
          style={{ backgroundColor: isOn ? "" : "#FF9E20" }}
        >
          OFF
        </span>
      </div>
    </div>
  );
}
