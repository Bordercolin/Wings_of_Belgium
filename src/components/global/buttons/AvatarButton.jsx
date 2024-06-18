import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { UPDATE_PLAYER_AVATAR } from "../../../graphql/mutations";
import style from "./buttons.module.css";
import { UserContext } from "../../../context/UserContext";

export default function AvatarButton({
  avatarImg,
  onClick,
  activeAvatarId,
  avatarId,
  setAvatar,
  avatarImageId,
  unlockedPlayerAvatars,
  setLoading,
}) {
  const [updateAvatar] = useMutation(UPDATE_PLAYER_AVATAR);
  const { user, setUser } = useContext(UserContext);
  
  const isActive = user.activePlayerAvatar.avatar.image.id === avatarImageId;
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await updateAvatar({
        variables: {
          id: activeAvatarId,
          avatarId: avatarId,
        },
      });
      setAvatar(avatarImg);
      setUser({
        ...user,
        activePlayerAvatar: {
          ...user.activePlayerAvatar,
          avatar:
            data.updateActivePlayerAvatar.player.activePlayerAvatar.avatar,
        },
      });
      setLoading(false);
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
    onClick();
  };

  return (
    <button
      type="submit"
      onClick={handleSubmit}
      disabled={!unlockedPlayerAvatars || isActive}
      className={`${isActive ? style.activeAvatar : style.notActiveAvatar} ${
        !unlockedPlayerAvatars ? style.disabled : ""
      }`}
    >
      <img src={avatarImg} alt="Avatar" />
    </button>
  );
}
