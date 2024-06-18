import React from "react";
import styles from "./footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className={styles.footerInnerContainer}>
        <Link to="/privacy">privacybeleid</Link>
        <Link to="/terms">algemene voorwaarden</Link>
        <Link to="/legal">Credits en jurdisch</Link>
      </div>
    </footer>
  );
}
