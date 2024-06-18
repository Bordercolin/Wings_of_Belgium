import React, { useContext, useEffect, useState } from "react";
import design from "./forms.module.css";
import { InputFields } from "../input-fields/InputFields";
import { StandardSubmitButtons } from "../buttons/Buttons";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export default function Forms({ title, buttonName, newUser, setNewUser }) {
  const { user, register, loading } = useContext(UserContext);
  const [isFormError, setIsFormError] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    const { output, errorMessage } = await register({
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      date: newUser.date,
    });
    setIsFormError(output);
    setFormErrorMessage(errorMessage);
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
    <>
      <form className={design.form} onSubmit={handleSumbit}>
        <div className={design.formTitleContainer}>
          <h3 className={design.formTitle}>{title}</h3>
        </div>

        <div className={design.divider}>
          <InputFields
            placeholder="Username"
            label="username"
            type="text"
            value={newUser?.username}
            onChange={(e) => {
              setNewUser((prev) => {
                return { ...prev, username: e.target.value };
              });
            }}
          />
          <InputFields
            placeholder="E-mail"
            label="email"
            type="email"
            value={newUser?.email}
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
            value={newUser?.password}
            onChange={(e) => {
              setNewUser((prev) => {
                return { ...prev, password: e.target.value };
              });
            }}
          />
          <InputFields
            placeholder="Geboortedatum"
            label="date"
            type="date"
            value={newUser?.date}
            onChange={(e) => {
              setNewUser((prev) => {
                return { ...prev, date: e.target.value };
              });
            }}
          />
        </div>
        {isFormError && <div style={{ color: "red" }}>{formErrorMessage}</div>}
        <StandardSubmitButtons name={buttonName} />
      </form>
    </>
  );
}
