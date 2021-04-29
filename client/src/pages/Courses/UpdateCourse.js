import React, { useState, useContext, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getCourse, updateCourse } from "../../apis";
import { ErrorDisplay } from "../../components/ErrorDisplay";
import { AuthContext } from "../../context/context";


export const UpdateCourse = () => {
  // take login user
  const { authUser } = useContext(AuthContext);
  const { id } = useParams();
  const history = useHistory();

  // initial state
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [status, setStatus] = useState(null);
  const [apiError, setApiError] = useState([]);
  const [error, setError] = useState([]);
  const [values, setValues] = useState({});
  
  // take input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  
  // When id arrives, it receives relevant course information
  useEffect(() => {
    getCourse(id)
      .then((response) => {
        if (response.status === 200) {
          setCourse(response.data);
          setValues(response.data);
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


  if (error && status === 500) {
    history.push("/error");
  }

  // Form submit event when clicking Update Course button
  const handleSubmit = (e) => {
    e.preventDefault();
    // take new course information from the values state
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
          history.push("/notfound");
        } else {
          history.push("/error");
        }
      });
  }

  // click cancel button will turn back to course detail
  const handleCancel = () => {
    history.push(`/courses/${course.id}`);
  };

  return (
    <main>
      {isLoading ? null : (
        <>
          {course === null ? (
            <Redirect to="/notfound" />
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
