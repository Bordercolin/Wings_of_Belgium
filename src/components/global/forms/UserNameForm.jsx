import React, { useContext, useState } from "react";
import styles from "../setttings/setting.module.css";
import { UserContext } from "../../../context/UserContext";
import { StandardSubmitButtons } from "../buttons/Buttons";
import { InputFields } from "../input-fields/InputFields";
import { CircularProgress } from "@mui/material";

export default function UserName({ newUser, setNewUser, buttonName }) {
  const { user, changeUsername, loading } = useContext(UserContext);
  const [isFormError, setIsFormError] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { output, errorMessage } = await changeUsername({
      username: newUser.username,
    });
    if (!output) {
      setNewUser({ username: "" }); // Clear the input field on successful update
    }
    setIsFormError(output);
    setFormErrorMessage(errorMessage);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <form className={styles.user} onSubmit={handleSubmit}>
      <InputFields
        className={styles.userInput}
        type="text"
        label="Naam"
        placeholder={user?.username}
        id="Name"
        value={newUser?.username}
        onChange={(e) => {
          setNewUser((prev) => {
            return { ...prev, username: e.target.value };
          });
        }}
      />
      {isFormError && <div style={{ color: "red" }}>{formErrorMessage}</div>}
      <StandardSubmitButtons name={buttonName} />
    </form>
  );
}
