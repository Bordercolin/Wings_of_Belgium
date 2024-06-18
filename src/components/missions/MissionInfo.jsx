import React from "react";
import Typewriter from "typewriter-effect";
import design from "./missionInfo.module.css";
import { LinkButtons } from "../global/buttons/Buttons";

export default function MissionInfo({
  header,
  image,
  title,
  description,
  buttonText,
  link,
}) {
  return (
    <>
      <div className={design.missionInfoContainer}>
        <h2 className={design.missionInfoTitle}>{header}</h2>
        <img className={design.missionInfoImage} src={image} alt="" />
        <div className={design.missionInfoDescription}>
          <Typewriter
            options={{
              autoStart: true,
              loop: false,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString(`<h1>${title}</h1>`)
                .pauseFor(1500)
                .deleteAll(100)
                .callFunction(() => {
                  typewriter.options.delay = 20;
                })
                .typeString(`${description}`)
                .start();
            }}
          />
        </div>
        <LinkButtons name={buttonText} link={link} />
      </div>
    </>
  );
}
