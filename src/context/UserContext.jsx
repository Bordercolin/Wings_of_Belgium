import { createContext, useEffect, useState } from "react";
import {
  GET_ALL_AVATARS,
  GET_ALL_RANKS,
  GET_USERS,
  GET_USER_INFO,
} from "../graphql/queries";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  CREATE_USER,
  PUBLISH_PLAYER,
  UPDATE_USERNAME,
} from "../graphql/mutations";
import bcrypt from "bcryptjs-react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Queries
  const { data } = useQuery(GET_USERS);
  const { data: dataAvatars } = useQuery(GET_ALL_AVATARS);
  const { data: dataRanks } = useQuery(GET_ALL_RANKS);
  const [getUserInfo] = useLazyQuery(GET_USER_INFO);

  // States
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mutations
  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USERNAME);
  const [publishPlayer] = useMutation(PUBLISH_PLAYER);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userLocalstorage = JSON.parse(localStorage.getItem("user"));
      if (userLocalstorage) {
        try {
          const { data } = await getUserInfo({
            variables: { email: userLocalstorage.email },
          });
          setUser(data.player);
          localStorage.setItem("user", JSON.stringify(data.player));
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    };

    fetchUserInfo();
  }, [getUserInfo]);

  // Redirect to login page if user is not logged in
  useEffect(() => {
    if (!user && !loading) {
      if (
        !document.URL.includes("/login") &&
        !document.URL.includes("/register")
      ) {
        window.location.assign("/login");
      }
    }
  }, [user, loading]);

  // Login function
  const login = async (user) => {
    let output = true;
    setLoading(true);

    for (const player of data.players) {
      if (user.email === player.email) {
        try {
          const isMatch = await bcrypt.compare(user.password, player.password);
          if (isMatch) {
            const { data, loading } = await getUserInfo({
              variables: { email: user.email },
            });
            console.log(loading);
            setUser(data.player);
            localStorage.setItem("user", JSON.stringify(data.player));
            output = false;
            window.location.replace("/");
            break;
          }
        } catch (error) {
          console.error("Error logging in:", error);
          output = true;
        }
      }
    }
    setLoading(false);
    return output;
  };

  // Register function
  const register = async (user) => {
    let output = true;
    let errorMessage = null;
    setLoading(true);

    for (const player of data.players) {
      if (
        user.username === "" ||
        user.email === "" ||
        user.password === "" ||
        user.date === ""
      ) {
        errorMessage = "Please fill in all fields";
        output = true;
        break;
      } else if (user.username === player.username) {
        errorMessage = "Username already exists";
        output = true;
        break;
      } else if (user.email === player.email) {
        errorMessage = "Email already exists";
        output = true;
        break;
      }
    }

    if (!errorMessage) {
      try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const { data: newPlayerData } = await createUser({
          variables: {
            username: user.username,
            email: user.email,
            password: hashedPassword,
            birthday: user.date,
            settings: { dark: true, sound: true, music: true },
            firstAvatarId: dataAvatars.avatars[0].id,
            avatarIds: dataAvatars.avatars.map((avatar) => ({ id: avatar.id })),
            rankId: dataRanks.ranks[0].id,
          },
        });

        // Added detailed logging and error handling for the publish mutation
        try {
          const publishResponse = await publishPlayer({
            variables: {
              email: user.email,
              activePlayerAvatarId:
                newPlayerData.createPlayer.activePlayerAvatar.id,
              unlockedPlayerAvatarId:
                newPlayerData.createPlayer.unlockedPlayerAvatar.id,
              rankId: newPlayerData.createPlayer.rankPlayer.id,
              settingsId: newPlayerData.createPlayer.settingsPlayer.setting.id,
              unlockedPlayerBadgeId:
                newPlayerData.createPlayer.unlockedPlayerBadge.id,
              settingsPlayerId: newPlayerData.createPlayer.settingsPlayer.id,
            },
          });
          output = false;
          setLoading(false);
          window.location.replace("/login");
        } catch (publishError) {
          console.error("Error publishing player:", publishError);
          output = true;
        }
      } catch (error) {
        console.error("Error creating user:", error);
        output = true;
      }
    }
    return { output, errorMessage };
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Change username function
  const changeUsername = async (username) => {
    let output = true;
    let errorMessage = null;

    if (username.username === "") {
      errorMessage = "Please give a username";
      output = true;
    } else if (username.username === user.username) {
      errorMessage = "Username cannot be the same as the current username";
      output = true;
    } else if (
      data.players.find((player) => player.username === username.username)
    ) {
      errorMessage = "Username already exists";
      output = true;
    } else {
      setLoading(true);
      try {
        const { data } = await updateUser({
          variables: {
            username: username.username,
            email: user.email,
          },
        });
        setUser({
          ...user,
          username: data.updatePlayer.username,
        });
        output = false;
        setLoading(false);
      } catch (error) {
        console.error("Error updating username:", error);
        output = true;
      }
    }

    return { output, errorMessage };
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        changeUsername,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
