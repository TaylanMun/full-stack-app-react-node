import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/context";

export const Header = () => {
  const authState = useContext(AuthContext);
  const history = useHistory();
  const handleSignOut = () => {
    authState.actions.signOut();
    history.push("/sign-in");
  };

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>

        <nav>
          <ul className="header--signedout">
            {authState.authUser ? (
              <li className="header--signedout ">
                <span>{`Welcome ${authState.authUser.firstName} ${authState.authUser.lastName}!  `}</span>

                <a href="#/" role="button" onClick={handleSignOut}>
                  Sign Out
                </a>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/sign-up">Sign Up</Link>
                </li>
                <li>
                  <Link to="/sign-in">Sign In</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
