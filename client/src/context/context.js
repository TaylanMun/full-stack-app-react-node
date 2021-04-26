import React, { useState, createContext } from "react";
import { getUser } from "../apis";

export const AuthContext = createContext();

export const Provider = (props) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  const signIn = (email, password) => {
    return new Promise((resolve, reject) => {
      getUser(email, password)
        .then((data) => {
          setAuthUser(data);
          localStorage.setItem("authUser", JSON.stringify(data));
          resolve(true);
        })
        .catch((error) => reject(error));
    });
  };
  
  const signOut = () => {
    setAuthUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider
      value={{
        authUser: authUser,
        actions: {
          signIn: signIn,
          signOut: signOut,
        },
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const Consumer = AuthContext.Consumer;
