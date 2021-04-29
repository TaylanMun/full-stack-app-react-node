import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/context";

export const UserSignOut = () => {
  // take login state
  const authState = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    authState.actions.signOut();
    history.push("/");
  });

  return (<></>);
};
