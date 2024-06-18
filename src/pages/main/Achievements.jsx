import React from "react";
import MenuButton from "../../components/global/buttons/MenuButton";
import Calculations from "../../components/global/achievements-calc/Calculations";
import { Helmet } from "react-helmet";

export default function Achievements() {
  return (
    <>
      <Helmet>
        <title>Achievements</title>
      </Helmet>
      <nav>
        <MenuButton />
      </nav>
      <div>
        <Calculations />
      </div>
    </>
  );
}
