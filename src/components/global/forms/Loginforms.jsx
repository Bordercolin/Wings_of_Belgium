import React, { useContext, useEffect, useState } from "react";
import design from "./forms.module.css";
import { InputFields } from "../input-fields/InputFields";
import { StandardSubmitButtons } from "../buttons/Buttons";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export default function Forms({ title, buttonName, newUser, setNewUser }) {
  const { user, login, loading } = useContext(UserContext);
  const [isFormError, setIsFormError] = useState(false);
  const navigate = useNavigate();
  const handleSumbit = async (e) => {
    e.preventDefault();
    const status = await login({
      email: newUser.email,
      password: newUser.password,
    });
    setIsFormError(status);
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  if (loading) {
    return <CircularProgress />;
  }
  return (
    <form className={design.form} onSubmit={handleSumbit}>
      <div className={design.formTitleContainer}>
        <h3 className={design.formTitle}>{title}</h3>
      </div>

      <div className={design.divider}>
        <InputFields
          placeholder="E-mail"
          label="email"
          type="email"
          value={newUser.email}
          onChange={(e) => {
            setNewUser((prev) => {
              return { ...prev, email: e.target.value };
            });
          }}
        />
        <InputFields
          placeholder="Wachtwoord"
          label="password"
          type="password"
          value={newUser.password}
          onChange={(e) => {
            setNewUser((prev) => {
              return { ...prev, password: e.target.value };
            });
          }}
        />
      </div>
      {isFormError && (
        <div style={{ color: "red" }}>Credentials not correct</div>
      )}
      <StandardSubmitButtons name={buttonName} />
    </form>
  );
}
