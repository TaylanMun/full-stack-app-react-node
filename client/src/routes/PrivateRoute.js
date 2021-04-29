import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "../context/context";

// check for routes to be accessed only after logging in
export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {({ authUser }) => (
        <Route
          {...rest}
          render={(props) =>
            authUser ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      )}
    </Consumer>
  );
};
