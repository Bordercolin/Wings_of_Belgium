import React, { useEffect } from "react";
import style from "./game.module.css";

export default function WinLoss({
  user,
  levelUp,
  setLevelUp,
  updateWinsLevelUp,
  updateWin,
  updateLoss,
  updateUnlockedBadges,
  dataBadges,
  setUser,
  dataAvatars,
  updateUnlockedAvatars,
}) {
  const winLoss = async (event) => {
    if (!user) {
      console.error("User is null");
      return;
    }

    if (event.data.type === "GAME_WON") {
      const score = event.data.score;
      const exp = user.experience + score;
      if (exp >= user.maxExperience) {
        setLevelUp(true);
        const newExp = exp - user.maxExperience;
        const newLevel = user.level + 1;
        const newMaxExp = newLevel * 100;
        const { data: dataLevelUp } = await updateWinsLevelUp({
          variables: {
            email: user.email,
            wins: user.wins + 1,
            experience: newExp,
            level: newLevel,
            maxExperience: newMaxExp,
          },
        });
        const badgeUnlock = async (badgeIndex) => {
          const { data: dataUnlockedBadges } = await updateUnlockedBadges({
            variables: {
              badgeId: dataBadges.badges[badgeIndex].id,
              playerBadgeId: user.unlockedPlayerBadge.id,
            },
          });
          setUser({
            ...user,
            wins: dataLevelUp.updatePlayer.wins,
            experience: dataLevelUp.updatePlayer.experience,
            level: dataLevelUp.updatePlayer.level,
            maxExperience: dataLevelUp.updatePlayer.maxExperience,
            unlockedPlayerBadge: dataUnlockedBadges.updateUnlockedPlayerBadge,
          });
        };

        const avatarUnlock = async (avatarIndex) => {
          const { data: dataUnlockedAvatars } = await updateUnlockedAvatars({
            variables: {
              avatarId: dataAvatars.avatars[avatarIndex].id,
              playerAvatarId: user.unlockedPlayerAvatar.id,
            },
          });
          setUser({
            ...user,
            wins: dataLevelUp.updatePlayer.wins,
            experience: dataLevelUp.updatePlayer.experience,
            level: dataLevelUp.updatePlayer.level,
            maxExperience: dataLevelUp.updatePlayer.maxExperience,
            unlockedPlayerAvatar:
              dataUnlockedAvatars.updateUnlockedPlayerAvatar,
          });
        };

        if (newLevel % 5 === 0) {
          let badgeIndex = Math.floor(newLevel / 5) - 1; // Calculate the badge index based on level
          if (badgeIndex < dataBadges.badges.length) {
            await badgeUnlock(badgeIndex);
          }
        }

        if (newLevel % 2 === 0) {
          let avatarIndex = Math.floor(newLevel / 2) - 1; // Calculate the avatar index based on level
          if (avatarIndex < dataAvatars.avatars.length) {
            if (avatarIndex === 0) {
              avatarIndex = 1;
            }
            await avatarUnlock(avatarIndex);
          }
        }
      } else {
        const { data } = await updateWin({
          variables: {
            email: user.email,
            wins: user.wins + 1,
            experience: exp,
          },
        });
        setUser({
          ...user,
          wins: data.updatePlayer.wins,
          experience: data.updatePlayer.experience,
        });
      }
    }

    if (event.data.type === "GAME_LOST") {
      const { data } = await updateLoss({
        variables: {
          email: user.email,
          losses: user.losses + 1,
        },
      });
      setUser({ ...user, losses: data.updatePlayer.losses });
    }
  };

  useEffect(() => {
    const handleGameMessage = async (event) => {
      await winLoss(event);
    };

    window.addEventListener("message", handleGameMessage);

    return () => {
      window.removeEventListener("message", handleGameMessage);
    };
  }, [
    user,
    updateWin,
    updateLoss,
    updateWinsLevelUp,
    updateUnlockedBadges,
    updateUnlockedAvatars,
    setUser,
    dataBadges,
    dataAvatars,
  ]);

  return (
    <>
      {levelUp && (
        <div className={style.levelUpOverlay}>
          <h2>Congratulations!</h2>
          <p>You have leveled up!</p>
          <p>Your new level is {user.level}</p>
          <button onClick={() => setLevelUp(false)}>Close</button>
        </div>
      )}
    </>
  );
}
