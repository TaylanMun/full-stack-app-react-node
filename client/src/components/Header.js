import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/context";

export const Header = () => {
  const authState = useContext(AuthContext);

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
                <Link to="/signout">Sign Out</Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/signin">Sign In</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
