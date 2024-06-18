import React, { useState, useEffect } from "react";
import { GET_ALL_TEAMROLES } from "../../graphql/queries.jsx";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import design from "./teamSelectionPage.module.css";
import { Helmet } from "react-helmet"

export default function TeamSelectionPage() {

  const [correctTeamRoles, setCorrectTeamRoles] = useState([]);
  const [selectedTeamRoles, setSelectedTeamRoles] = useState([]);
  const [showWrongOverlay, setShowWrongOverlay] = useState(false); // State to control wrong overlay visibility
  const [showCorrectOverlay, setShowCorrectOverlay] = useState(false); // State to control correct overlay visibility
  const navigate = useNavigate(); // Initialize useNavigate
  let missionId = sessionStorage.getItem("selectedMission");
  const handleClick = (event) => {
    const selectedRole = event.target.id;

    if (selectedTeamRoles.includes(selectedRole)) {
      alert("Rol al geselecteerd.");
      return;
    }

    if (selectedTeamRoles.length >= 3) {
      alert("Al 3 items geselecteerd.");
      return;
    }

    setSelectedTeamRoles((prevRoles) => [...prevRoles, selectedRole]);
  };

  const handleSubmit = () => {
    const arraysEqual = (arr1, arr2) => {
      if (arr1.length !== arr2.length) return false;
      return arr1.every((item) => arr2.includes(item));
    };

    if (arraysEqual(selectedTeamRoles, correctTeamRoles)) {
      setShowCorrectOverlay(true); // Show correct overlay
    } else {
      setShowWrongOverlay(true); // Show wrong overlay
    }
  };

  const handleRetry = () => {
    setSelectedTeamRoles([]); // Reset selected team roles
    setShowWrongOverlay(false); // Hide wrong overlay
  };

  const handleContinue = () => {
    setShowCorrectOverlay(false);
    if (missionId === "clwkmx12q3f4y07w9qolsf1g9") {
      navigate("/fight-or-flight");
    } else if (missionId === "clwkl0k7w0e0a07w44j4uc6mh") {
      navigate("/safezone");
    }
  };

  const handleBack = () => {
    navigate("/"); // Navigate to the home page
  };

  const [selectedRoles, setSelectedRoles] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const { loading, error, data } = useQuery(GET_ALL_TEAMROLES);
  const filteredData = (data && data?.teamRoles) || [];

  useEffect(() => {
    if (missionId === "clwkmx12q3f4y07w9qolsf1g9") {
      setCorrectTeamRoles(["Avionics", "Meteoroloog", "Jachtpiloot"]);
    } else if (missionId === "clwkl0k7w0e0a07w44j4uc6mh") {
      setCorrectTeamRoles(["Cel", "Transportpiloot", "Avionics"]);
    }
  }, [missionId]);

  let categories = filteredData.map((teamRole) => teamRole.category);
  categories = Array.from(new Set(categories));

  categories = categories.map((category) => {
    let roles = filteredData.filter(
      (teamRole) => teamRole.category === category
    );
    return { roles, name: category };
  });

  const roleLength = categories[selectedCategory]?.roles.length || 0;

  useEffect(() => {
    setSelectedRoles(0);
  }, [selectedCategory]);

  useEffect(() => {
    const roleIndexIncrease = () => {
      setSelectedRoles((prev) => (prev + 1) % roleLength);
    };

    const roleIndexDecrease = () => {
      setSelectedRoles((prev) => (prev - 1 + roleLength) % roleLength);
    };

    const categoryIndexIncrease = () => {
      setSelectedCategory((prev) => (prev + 1) % categories.length);
    };

    const categoryIndexDecrease = () => {
      setSelectedCategory(
        (prev) => (prev - 1 + categories.length) % categories.length
      );
    };

    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        roleIndexIncrease();
      } else if (event.key === "ArrowLeft") {
        roleIndexDecrease();
      } else if (event.key === "ArrowUp") {
        categoryIndexIncrease();
      } else if (event.key === "ArrowDown") {
        categoryIndexDecrease();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedRoles, selectedCategory, roleLength, categories]);

  useEffect(() => {
  }, [selectedTeamRoles]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Helmet>
        <title>Selecteer Team</title>
      </Helmet>
      <div className={design.backgroundContainer}>
        <img
          className={design.background}
          src={categories[selectedCategory]?.roles[selectedRoles]?.image.url}
          alt=""
        />
        <div className={design.contentContainer}>
          <div className={design.titleContainer}>
            <h1 className={design.title}>Teamselectie</h1>
            <div className={design.rectangleContainer}>
              <div
                className={`${design.rectangle} ${
                  selectedTeamRoles.length > 0 ? design.active : ""
                }`}
              ></div>
              <div
                className={`${design.rectangle} ${
                  selectedTeamRoles.length > 1 ? design.active : ""
                }`}
              ></div>
              <div
                className={`${design.rectangle} ${
                  selectedTeamRoles.length > 2 ? design.active : ""
                }`}
              ></div>
            </div>
          </div>

          <div className={design.roleDetails}>
            <h2 className={design.roleTitle}>
              {categories[selectedCategory]?.roles[selectedRoles]?.category} :{" "}
              {categories[selectedCategory]?.roles[selectedRoles]?.name}{" "}
            </h2>
            <p>description</p>
          </div>

          <div
            onClick={handleClick}
            className={`${design.selectButton} ${
              selectedTeamRoles.length < 3 ? design.show : design.hide
            }`}
            id={`${categories[selectedCategory]?.roles[selectedRoles]?.name}`}
          >
            Selecteer
          </div>

          <div
            onClick={handleSubmit}
            className={`${design.selectButton} ${
              selectedTeamRoles.length === 3 ? design.show : design.hide
            }`}
          >
            Select dit team
          </div>

          <div className={design.menuButton} onClick={handleBack}>
            <div className={design.backButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-8 -5 24 24"
                width="28"
                fill="currentColor"
              >
                <path d="M2.757 7l4.95 4.95a1 1 0 1 1-1.414 1.414L.636 7.707a1 1 0 0 1 0-1.414L6.293.636A1 1 0 0 1 7.707 2.05L2.757 7z"></path>
              </svg>
              <p>Back</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${design.wrongOverlay} ${
          showWrongOverlay ? design.show : ""
        }`}
      >
        <div className={design.overlayContent}>
          <p>Probeer opnieuw</p>
          <button onClick={handleRetry} className={design.retryButton}>
            Probeer opnieuw
          </button>
        </div>
      </div>

      <div
        className={`${design.correctOverlay} ${
          showCorrectOverlay ? design.show : ""
        }`}
      >
        <div className={design.overlayContent}>
          <button onClick={handleContinue} className={design.continueButton}>
            Start de missie
          </button>
        </div>
      </div>
    </>
  );
}
