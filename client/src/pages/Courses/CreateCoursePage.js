import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { ErrorDisplay } from "../../components/ErrorDisplay";
import { AuthContext } from "../../context/context";
import { createCourse } from "../../apis";

export const CreateCoursePage = () => {
  const [apiError, setApiError] = useState([]);
  const validation = (values) => {
    let errors = {};
  
    if (!values.title) {
      errors.title = "Title is required.";
    }
  
    if (!values.description) {
      errors.description = "Description is required.";
    }
  
    return errors;
  };
  
  const { values, errors, handleChange, handleSubmit } = useForm(
    handleCreateCourse,
    validation
  );
  const authState = useContext(AuthContext);
  const history = useHistory();

  function handleCreateCourse() {
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
  }

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
              {errors.title && <p className="validation--errors-spesific">{errors.title}</p>}

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
              {errors.description && (
               <p className="validation--errors-spesific">{errors.description}</p>
              )}
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
