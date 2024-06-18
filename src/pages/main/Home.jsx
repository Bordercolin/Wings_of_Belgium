import React, { useContext, useEffect } from "react";
import WorldMap from "../../components/global/map/WorldMap";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_INFO } from "../../graphql/queries.jsx";
import NavigationBar from "../../components/global/menu/NavigationBar.jsx";
import { UserContext } from "../../context/UserContext.jsx";
import DiamondButton from "../../components/global/buttons/DiamondButton.jsx";
import design from "./home.module.css";
import { Helmet } from "react-helmet";


export default function Home() {
  const { user, loading } = useContext(UserContext);
  const [getUserInfo, { loading: queryLoading, error, data }] =
    useLazyQuery(GET_USER_INFO);

  useEffect(() => {
    if (!loading) {
      getUserInfo({
        variables: {
          email: user?.email,
        },
      });
    }
  }, [loading, getUserInfo, user]);

  if (loading || queryLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error : {error.message}</p>;
  }
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <NavigationBar />
      <WorldMap zoomAllowed={false} dragAllowed={true} />
      <div className={design.highlightedMissionsContainer}>
        <h2 className={design.highlightedMission}>Uitgelichte missies</h2>
        <div className={design.buttonContainer}>
          <DiamondButton
            buttonText={"NL"}
            link={"/mission-popup/clwkl0k7w0e0a07w44j4uc6mh"}
          />
          <DiamondButton
            buttonText={"DE"}
            link={"/mission-popup/clwkmx12q3f4y07w9qolsf1g9"}
          />
          <DiamondButton buttonText={"BE"} />
          <DiamondButton buttonText={"FR"} />
        </div>
      </div>
    </>
  );
}
