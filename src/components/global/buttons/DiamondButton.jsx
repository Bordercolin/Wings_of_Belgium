import React from "react";
import design from "./diamondButton.module.css";
import { NavLink } from "react-router-dom";

export default function DiamondButton({ buttonText,link }) {
  return (
    <NavLink to={link}>
      <div class={design.outerBox}>
        <div class={design.innerBox}>
          <p className={design.buttonText}>{buttonText}</p>
        </div>
      </div>
    </NavLink>
  );
}
