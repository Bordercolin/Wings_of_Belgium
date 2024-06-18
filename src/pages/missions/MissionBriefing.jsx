import React from "react";
import design from "./mission.module.css";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALL_MISSIONS } from "../../graphql/queries";
import { LinkButtons } from "../../components/global/buttons/Buttons";

export default function MissionBriefing() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ALL_MISSIONS, {
    variables: { id: id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data) return <p>Not found</p>;
  const filteredData = data.missions.filter(
    (mission) => mission.id === id
    
  );

  sessionStorage.setItem("selectedMission", id)

  return (
    <>
      <Helmet>
        <title>Briefing</title>
      </Helmet>
      <div className={design.missionPopUp}>
        <div className={design.missionBriefingContainer}>
          <h2>BRIEFING</h2>
          <p>{filteredData[0].briefing}</p>
          <LinkButtons name={"Stel team Samen"} link={"/team-select-intro"} />
        </div>
      </div>
    </>
  );
}
