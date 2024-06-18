import React from "react";
import design from "./teamSelect.module.css";
import DiamondButton from "../../components/global/buttons/DiamondButton";
import { LinkButtons } from "../../components/global/buttons/Buttons";
import { Helmet } from "react-helmet";
export default function TeamSelect() {
  
  return (
    <>
      <Helmet>
        <title>Teamselectie intro</title>
      </Helmet>
      <h1>Teamselectie</h1>
      <div className={design.missionTeamSelectionContainer}>
        <div className={design.rectanglesContainer}>
          <div className={design.rectangle}></div>
          <div className={design.rectangle}></div>
          <div className={design.horizontalRowRectangles}>
            <div className={design.rectangle}></div>
            <div className={design.rectangleHighlight}></div>
            <div className={design.rectangle}></div>
          </div>
          <div className={design.rectangle}></div>
        </div>

        <div className={design.instructionsContainer}>
          <div className={design.instruction}>
            <div className={design.bulletpoint}>
              <DiamondButton />
            </div>
            <p>Selecteer beroepen die nodig zijn voor de missie</p>
          </div>
          <div className={design.instruction}>
            <div className={design.bulletpoint}>
              <DiamondButton />
            </div>
            <p>Swipe naar links of rechts voor een ander karakter </p>
          </div>
          <div className={design.instruction}>
            <div className={design.bulletpoint}>
              <DiamondButton />
            </div>
            <p>Swipe naar boven of onder voor het volgend beroep</p>
          </div>
          <div className={design.instruction}>
            <div className={design.bulletpoint}>
              <DiamondButton />
            </div>
            <p>Probeer foutloos te blijven</p>
          </div>
        </div>
        <LinkButtons name={"Stel team samen"} link={"/team-select"} />
      </div>
    </>
  );
}
