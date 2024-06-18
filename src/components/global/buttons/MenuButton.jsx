import React, { useState } from "react";
import MenuOverlay from "../menu/MenuOverlay";
import button from "./menuBtn.module.css";
export default function MenuButton(handleEvent) {

  const [showOverlay, setShowOverlay] = useState(false);

  const handleMenuButtonClick = () => {
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <>
    
    <button onClick={handleMenuButtonClick} className={button.menuBtn} >
      <img src="/assets/img/menu/menu.png" alt="menu" />
    </button>
    {showOverlay && <MenuOverlay onClose={handleCloseOverlay} />}
    </>
  );
}
