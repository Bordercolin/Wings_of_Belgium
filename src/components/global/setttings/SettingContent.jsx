import React, { useContext, useState } from "react";
import styles from "./setting.module.css";
import Footer from "../footer/Footer";
import AvatarBtn from "../buttons/ChangeAvatarBtn";
import UserName from "../forms/UserNameForm";
import { UserContext } from "../../../context/UserContext";
import AvatarMenu from "../menu/AvatarMenu";
import { useMutation } from "@apollo/client";
import { UPDATE_PLAYER_SETTINGS } from "../../../graphql/mutations";
import ToggleButton from "../buttons/ToggleButton";

export default function SettingContent() {
  const { user, setUser } = useContext(UserContext);
  const [showOverlay, setShowOverlay] = useState(false);
  const [avatar, setAvatar] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
  });

  const [updatePlayerSettings] = useMutation(UPDATE_PLAYER_SETTINGS);
  const [isMusicOn, setMusic] = useState(
    user?.settingsPlayer.setting.settings.music
  );
  const [isSoundOn, setSound] = useState(
    user?.settingsPlayer.setting.settings.sounds
  );
  const [isDarkModeOn, setDarkMode] = useState(
    user?.settingsPlayer.setting.settings.dark
  );

  const handleToggle = (settingKey, currentValue, setState) => {
    const newSettingValue = !currentValue;
    setState(newSettingValue);
    updateSettings({ [settingKey]: newSettingValue });
  };
  const updateSettings = async (newSettings) => {
    const updatedSettings = {
      ...user.settingsPlayer.setting.settings,
      ...newSettings,
    };
    await updatePlayerSettings({
      variables: {
        settingsPlayerId: user.settingsPlayer.id,
        newSettings: updatedSettings,
        settingsId: user.settingsPlayer.setting.id,
      },
    });
    setUser({
      ...user,
      settingsPlayer: {
        ...user.settingsPlayer,
        setting: {
          ...user.settingsPlayer.setting,
          settings: updatedSettings,
        },
      },
    });
  };

  const handleOnClick = () => {
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <>
      <h1>Instellingen</h1>
      <div className={styles.imageContainer}>
        <button onClick={handleOnClick}>
          <img
            src={avatar ? avatar : user?.activePlayerAvatar.avatar.image.url}
            alt=""
          />
        </button>
      <AvatarBtn onClick={handleOnClick} />
      </div>
      {showOverlay && (
        <AvatarMenu
          onClose={handleCloseOverlay}
          setAvatar={setAvatar}
          playerAvatar={avatar}
        />
      )}
      <UserName buttonName="Change" newUser={newUser} setNewUser={setNewUser} />
      <div className={styles.container}>
        <ToggleButton
          label="muziek"
          isOn={isMusicOn}
          onToggle={() => handleToggle("music", isMusicOn, setMusic)}
        />
        <ToggleButton
          label="geluiden"
          isOn={isSoundOn}
          onToggle={() => handleToggle("sounds", isSoundOn, setSound)}
        />
        <ToggleButton
          label="dark mode"
          isOn={isDarkModeOn}
          onToggle={() => handleToggle("dark", isDarkModeOn, setDarkMode)}
        />
      </div>
      <Footer />
    </>
  );
}
