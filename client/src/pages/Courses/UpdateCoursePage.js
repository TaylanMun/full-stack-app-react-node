import React, { useState, useContext, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { getCourse, updateCourse } from "../../apis";
import { ErrorDisplay } from "../../components/ErrorDisplay";
import { AuthContext } from "../../context/context";

export const UpdateCoursePage = () => {
  const { authUser } = useContext(AuthContext);
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [course, setCourse] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    getCourse(id)
      .then((response) => {
        if (response.status === 200) {
          setCourse(response.data);
          setStatus(200);
          setIsLoading(false);
        } else {
          setStatus(500);
          setError(true);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (error.status === 404) {
          setStatus(404);
          setError(true);
          setIsLoading(false);
        } else {
          setStatus(500);
          setError(true);
          setIsLoading(false);
        }
      });
  }, [id]);

  const history = useHistory();

  if (error && status === 500) {
    history.push("/error");
  }

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
    handleUpdateCourse,
    validation,
    course
  );

  function handleUpdateCourse() {
    const updatedCourse = {
      title: values.title,
      id: authUser.id,
      description: values.description,
      estimatedTime: values.estimatedTime,
      materialsNeeded: values.materialsNeeded,
    };

    updateCourse(id, updatedCourse, authUser)
      .then(() => history.push(`/courses/${course.id}`))
      .catch((error) => {
        if (error.status === 400) {
          setApiError(error.data.errors);
        } else if (error.status === 403) {
          history.push("/forbidden");
        } else if (error.status === 404) {
          history.push("/not-found");
        } else {
          history.push("/error");
        }
      });
  }

  const handleCancel = () => {
    history.push(`/courses/${course.id}`);
  };

  return (
    <main>
      {isLoading ? null : (
        <>
          {course === null ? (
            <Redirect to="/not-found" />
          ) : (
            <>
              {course.user.id !== authUser.id ? (
                <Redirect to="/forbidden" />
              ) : (
                <div className="wrap">
                  <h2>Update Course</h2>
                  <ErrorDisplay errors={apiError} />
                  <form>
                    <div className="main--flex">
                      <div>
                        <label htmlFor="title">Course Title</label>
                        <input
                          id="title"
                          name="title"
                          type="text"
                          value={values.title}
                          onChange={handleChange}
                        />
                        {errors.title && (
                          <p className="validation--errors-spesific">
                            {errors.title}
                          </p>
                        )}

                        <label htmlFor="courseAuthor">Course Author</label>
                        <input
                          id="courseAuthor"
                          name="courseAuthor"
                          type="text"
                          value={`${authUser.firstName} ${authUser.lastName}`}
                          disabled
                        />

                        <label htmlFor="description">Course Description</label>
                        <textarea
                          id="description"
                          name="description"
                          value={values.description}
                          onChange={handleChange}
                        />
                        {errors.description && (
                          <p className="validation--errors-spesific">
                            {errors.description}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input
                          id="estimatedTime"
                          name="estimatedTime"
                          type="text"
                          value={
                            values.estimatedTime ? values.estimatedTime : ""
                          }
                          onChange={handleChange}
                        />

                        <label htmlFor="materialsNeeded">
                          Materials Needed
                        </label>
                        <textarea
                          id="materialsNeeded"
                          name="materialsNeeded"
                          value={
                            values.materialsNeeded ? values.materialsNeeded : ""
                          }
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <button className="button" onClick={handleSubmit}>
                      Update Course
                    </button>
                    <button
                      className="button button-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
};
