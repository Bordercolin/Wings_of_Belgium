import React from "react";
import SettingContent from "../../components/global/setttings/SettingContent";
import MenuButton from "../../components/global/buttons/MenuButton";
import { Helmet } from "react-helmet";

export default function Settings() {
  return (
    <>
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <nav>
        <MenuButton />
      </nav>
      <SettingContent />
    </>
  );
}
