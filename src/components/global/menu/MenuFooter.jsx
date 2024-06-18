import React from "react";
import style from "../footer/footer.module.css";

export default function MenuFooter() {
  return (
    <footer>
      <div className={style.footerInnerContainer}>
        <a href="">Facebook</a>
        <a href="">Instagram</a>
        <a href="">Website</a>
      </div>
    </footer>
  );
}
