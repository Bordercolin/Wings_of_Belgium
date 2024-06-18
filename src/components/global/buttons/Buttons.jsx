import React from "react";
import buttons from "./buttons.module.css";
import { NavLink } from "react-router-dom";

export function StandardSubmitButtons({ name }) {
  return (
    <button className={buttons.standardSubmitButtons} type="submit">
      {name}
    </button>
  );
}

export function SocialSignupButtons({ logo, name }) {
  return (
    <button className={buttons.socialSignupButtons}>
      <div className={buttons.socialMediaLogo}>{logo}</div>
      <p>{name}</p>
    </button>
  );
}

export function LinkButtons({ name, link }) {
  return (
    <NavLink className={buttons.linkButton} to={link}>
      {name}
    </NavLink>
  );
}
