import React from "react";
import design from "./mission.module.css";
import MissionInfo from "../../components/missions/MissionInfo";
import { useQuery } from "@apollo/client";
import { GET_ALL_MISSIONS } from "../../graphql/queries";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function MissionPopUp() {
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

  return (
    <>
      <Helmet>
        <title>Mission</title>
      </Helmet>
      <div className={design.missionPopUp}>
        <MissionInfo
          header={filteredData[0].header}
          image={filteredData[0].image.url}
          title={filteredData[0].title}
          description={filteredData[0].description}
          buttonText={"Go To Briefing"}
          link={"/mission-briefing/" + id}
        />
      </div>
    </>
  );
}
