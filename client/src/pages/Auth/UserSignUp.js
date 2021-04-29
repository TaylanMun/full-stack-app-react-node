import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { createUser } from "../../apis";
import { ErrorDisplay } from "../../components/ErrorDisplay";
import { AuthContext } from "../../context/context";

export const UserSignUp = () => {
  // initial state
  const [values, setValues] = useState({});
  const [apiError, setApiError] = useState([]);
  const context = useContext(AuthContext);
  const history = useHistory();

  // take input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  
  // create user process
  const handleCreateUser = (e) => {
    e.preventDefault();
        // take user information from the values state
    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      emailAddress: values.emailAddress,
      password: values.firstPassword,
      confirmedPassword: values.secondPassword,
    };

    createUser(user)
      .then(() => {
        context.actions
          .signIn(values.emailAddress, values.secondPassword)
          .then(() => history.push("/"))
          .catch((error) => {
            if (error === 401) {
              setApiError({
                message:
                  "Your email addresss or password was entered incorrectly. Try again.",
              });
            } else {
              history.push("/error");
            }
          });
      })
      .catch((error) => {
        if (error.status === 400) {
          setApiError(error.data.errors);
        } else {
          history.push("/error");
        }
      });
  }
  
  // click cancel button will turn back to courses
  const handleCancel = () => {
    history.push("/");
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
        <div>
          <ErrorDisplay errors={apiError} />
          <form onSubmit={handleCreateUser} noValidate>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={values.firstName || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={values.lastName || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="emailAddress">Email Address</label>
              <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                value={values.emailAddress || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="firstPasswords-spesific">Password</label>
              <input
                id="firstPassword"
                name="firstPassword"
                type="password"
                value={values.firstPassword || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="secondPassword">Confirm Password</label>
              <input
                id="secondPassword"
                name="secondPassword"
                type="password"
                value={values.secondPassword || ""}
                onChange={handleChange}
              />
            </div>
            <div className="pad-bottom">
              <button className="button" type="submit">
                Sign Up
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
          Already have a user account? Click here to
          <Link to="/signin"> sign in</Link>!
        </p>
      </div>
    </main>
  );
};
