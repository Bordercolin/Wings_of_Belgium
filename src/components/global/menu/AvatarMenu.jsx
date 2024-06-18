import React, { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import AvatarButton from "../buttons/AvatarButton";
import style from "./menuOverlay.module.css";
import { CircularProgress } from "@mui/material";

export default function AvatarMenu({ onClose, setAvatar, playerAvatar }) {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  if (loading)
    return (
      <div className={style.overlay__loading}>
        <CircularProgress />
      </div>
    );
  return (
    <div className={style.overlay}>
      <button className={style.closeBtn} onClick={onClose}>
        Close
      </button>
      <div className={style.avatarGrid}>
        {user?.avatars.map((avatar, i) => {
          const isUnlocked = user?.unlockedPlayerAvatar.avatars.some(
            (unlockedAvatar) => avatar.id === unlockedAvatar.id
          );

          return (
            <AvatarButton
              key={`avatar-${i}`}
              onClick={onClose}
              avatarImg={avatar.image.url}
              activeAvatarId={user?.activePlayerAvatar.id}
              avatarImageId={avatar.image.id}
              avatarId={avatar.id}
              setAvatar={setAvatar}
              avatar={playerAvatar}
              unlockedPlayerAvatars={isUnlocked}
              setLoading={setLoading}
            />
          );
        })}
      </div>
    </div>
  );
}
