import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/context";

export const UserSignIn = (props) => {
  // initial state
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

    // take input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const history = useHistory();
  const context = useContext(AuthContext);

    // Form submit event when clicking Sign In button
    // Email and password required validation
    // Return error if username or password is incorrect from apide
  const handleSubmit = (e) => {
    e.preventDefault();
    let err = {};

    if (!values.emailAddress) {
      err.emailAddress = "Email address is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailAddress)
    ) {
      err.emailAddress = "Email address is invalid.";
    }

    if (!values.password) {
      err.password = "Password is required";
    }
    setErrors(err);
    if (Object.keys(err).length === 0) {
      const login = () => {
        const { from } = props.location.state || { from: { pathname: "/" } };
        context.actions
          .signIn(values.emailAddress, values.password)
          .then(() => history.push(from))
          .catch((error) => {
            if (error === 401) {
              console.log(error);
              setApiError({
                message:
                  "Your email addresss or password was entered incorrectly. Try again.",
              });
            } else {
              history.push("/error");
            }
          });
      };
      login();
    }
  };

  // click cancel button will turn back to courses
  const handleCancel = () => {
    history.push("/");
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        <div>
          {apiError && <p className="validation--errors">{apiError.message}</p>}
          <form>
            <div>
              <label htmlFor="emailAddress">Email Address</label>
              <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                value={values.emailAddress || ""}
                onChange={handleChange}
              />
              {errors.emailAddress && (
                <p className="validation--errors-spesific">
                  {errors.emailAddress}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={values.password || ""}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="validation--errors-spesific">{errors.password}</p>
              )}
            </div>
            <div className="pad-bottom">
              <button className="button" type="submit" onClick={handleSubmit}>
                Sign In
              </button>
              <button
                className="button button-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <p>
          Don't have a user account? Click here to
          <Link to="/signup"> sign up</Link>!
        </p>
      </div>
    </main>
  );
};
