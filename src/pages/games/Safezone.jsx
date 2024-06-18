import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import {
  UPDATE_PLAYER_LOSSES,
  UPDATE_PLAYER_WINS,
  UPDATE_PLAYER_WINS_LEVEL_UP,
  UPDATE_UNLOCKED_AVATARS,
  UPDATE_UNLOCKED_BADGES,
} from "../../graphql/mutations";
import { GET_ALL_AVATARS, GET_ALL_BADGES } from "../../graphql/queries";
import { UserContext } from "../../context/UserContext";
import WinLoss from "./WinLoss";
import { Helmet } from "react-helmet";

export default function Safezone() {
  const [updateLoss] = useMutation(UPDATE_PLAYER_LOSSES);
  const [updateWin] = useMutation(UPDATE_PLAYER_WINS);
  const [updateWinsLevelUp] = useMutation(UPDATE_PLAYER_WINS_LEVEL_UP);
  const [updateUnlockedBadges] = useMutation(UPDATE_UNLOCKED_BADGES);
  const [updateUnlockedAvatars] = useMutation(UPDATE_UNLOCKED_AVATARS);
  const { data: dataBadges } = useQuery(GET_ALL_BADGES);
  const { data: dataAvatars } = useQuery(GET_ALL_AVATARS);
  const { user, setUser } = useContext(UserContext);
  const [levelUp, setLevelUp] = useState(false);

  return (
    <>
      <Helmet>
        <title>Safezone</title>
      </Helmet>
      <div style={{ width: "100%", height: "100vh" }}>
        <WinLoss
          user={user}
          setLevelUp={setLevelUp}
          updateWinsLevelUp={updateWinsLevelUp}
          updateWin={updateWin}
          updateLoss={updateLoss}
          updateUnlockedBadges={updateUnlockedBadges}
          dataBadges={dataBadges}
          setUser={setUser}
          levelUp={levelUp}
          dataAvatars={dataAvatars}
          updateUnlockedAvatars={updateUnlockedAvatars}
        />
        <iframe
          src="/assets/games/safezone/index.html"
          title="Game"
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    </>
  );
}
