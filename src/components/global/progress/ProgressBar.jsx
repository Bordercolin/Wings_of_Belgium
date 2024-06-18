import React, { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import style from "./progress.module.css";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#FF9E20" : "#308fe8",
  },
}));
export default function ProgressBar() {
  const { user } = useContext(UserContext);

  const userPercentage = (user?.experience / (user?.level * 100)) * 100;

  return (
    <>
      <div className={style.progressContainer}>
        <h2 className={style.username}>{user?.username}</h2>
        <BorderLinearProgress
          className={style.progressBar}
          variant="determinate"
          value={userPercentage}
        />
      </div>
    </>
  );
}
