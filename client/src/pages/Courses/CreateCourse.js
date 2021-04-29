import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ErrorDisplay } from "../../components/ErrorDisplay";
import { AuthContext } from "../../context/context";
import { createCourse } from "../../apis";

export const CreateCourse = () => {
  // take login user
  const authState = useContext(AuthContext);
  const history = useHistory();

  // initial state
  const [apiError, setApiError] = useState([]);
  const [values, setValues] = useState({});

  // take input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Form submit event when clicking Create Course button
  const handleSubmit = (e) => {
    e.preventDefault();
    // take course information from the values state
    const course = {
      title: values.title,
      userId: authState.authUser.id,
      description: values.description,
      estimatedTime: values.estimatedTime,
      materialsNeeded: values.materialsNeeded,
    };
    createCourse(course, authState.authUser)
      .then(() => history.push("/"))
      .catch((error) => {
        if (error.status === 400) {
          setApiError(error.data.errors);
        } else if (error.status === 401) {
          history.push("/forbidden");
        } else {
          history.push("/error");
        }
      });
  };

  // click cancel button will turn back to courses
  const handleCancel = () => {
    history.push("/");
  };

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>

        <ErrorDisplay errors={apiError} />
        <form>
          <div className="main--flex">
            <div>
              <label htmlFor="title">Course Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={values.title || ""}
                onChange={handleChange}
              />

              <label htmlFor="courseAuthor">Course Author</label>
              <input
                id="courseAuthor"
                name="courseAuthor"
                type="text"
                value={`${authState.authUser.firstName} ${authState.authUser.lastName}`}
                disabled
              />

              <label htmlFor="description">Course Description</label>
              <textarea
                id="description"
                name="description"
                value={values.description || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={values.estimatedTime || ""}
                onChange={handleChange}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                value={values.materialsNeeded || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="button" onClick={handleSubmit}>
            Create Course
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};
