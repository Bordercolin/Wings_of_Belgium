import React, { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { GET_ALL_BADGES } from "../../../graphql/queries";
import { useQuery } from "@apollo/client";
import styles from "./calculations.module.css";
import { CircularProgress } from "@mui/material";

export default function Calculations() {
  const { user } = useContext(UserContext);
  const { loading: queryLoading, error, data } = useQuery(GET_ALL_BADGES);

  // game checker
  const totalGames = user?.wins + user?.losses;
  let winRatio;
  if (user?.losses === 0) {
    winRatio = 100;
  } else {
    winRatio = totalGames > 0 ? (user?.wins / totalGames) * 100 : 0;
  }

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (winRatio / 100) * circumference;

  if (queryLoading)
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  if (error)
    return (
      <p>
        Error :(
        {console.log(error)})
      </p>
    );
  const dataBadges = data.badges;
  //badge checker

  const totalBadges = dataBadges.length;
  const collectedBadges = user?.unlockedPlayerBadge.badges.length;
  const badgeRatio =
    totalBadges > 0 ? (collectedBadges / totalBadges) * 100 : 0;

  const badgeOffset = circumference - (badgeRatio / 100) * circumference;
  return (
    <div>
      <h1> Prestaties</h1>
      <div className={styles.userAchievements}>
        <h2>level {user?.level}</h2>
        {user?.experience}/ {user?.maxExperience} XP
      </div>
      <h2 className={styles.achievementsTitle}>Statistieken</h2>
      <div className={styles.statContainer}>
        <svg height="120" width="120">
          <circle
            stroke="#ff9e20"
            fill="transparent"
            strokeWidth="15"
            strokeDasharray={circumference}
            style={{
              strokeDashoffset: offset,
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
            r={radius}
            cx="60"
            cy="60"
          />
          <text x="50%" y="50%" textAnchor="middle" fill="#FFF">
            <tspan x="50%" dy="-0.3em">{`${Math.round(winRatio)}%`}</tspan>
            <tspan x="50%" dy="1.2em">
              W/L ratio
            </tspan>
          </text>
        </svg>
        <svg height="120" width="120">
          <circle
            stroke="#ff9e20"
            fill="transparent"
            strokeWidth="15"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: badgeOffset }}
            r={radius}
            cx="60"
            cy="60"
          />
          <text x="50%" y="50%" textAnchor="middle" fill="#FFF">
            <tspan x="50%" dy="-0.3em">{`${collectedBadges}`}</tspan>
            <tspan x="50%" dy="1.2em">
              Badges
            </tspan>
          </text>
        </svg>
      </div>
      <h2 className={styles.achievementsTitle}>Badges</h2>
      <div className={styles.badgeContainer}>
        {dataBadges.map((badge) => {
          const isUnlocked = user?.unlockedPlayerBadge.badges.some(
            (unlockedBadge) => unlockedBadge.id === badge.id
          );
          return (
            <div key={badge.id}>
              <img
                src={badge.image.url}
                alt="Badge"
                className={isUnlocked ? "" : "grayscale"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
