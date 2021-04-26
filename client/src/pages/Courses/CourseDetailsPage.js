import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, Redirect, useHistory } from "react-router-dom";
import { getCourse } from "../../apis";
import { CourseDetails } from "../../components/course";
import { AuthContext } from "../../context/context";
import { deleteCourse } from "../../apis";

export const CourseDetailsPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [course, setCourse] = useState();
  const [status, setStatus] = useState();
  const { authUser } = useContext(AuthContext);

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

  const handleDelete = () => {
    if (authUser && authUser.id === course.user.id) {
      deleteCourse(course.id, authUser)
        .then(() => history.push("/"))
        .catch((error) => {
          if (error === 403) {
            // Redirect if not course owner
            history.push("/forbidden");
          } else {
            // 500 Server Error
            history.push("/error");
          }
        });
    }
  };

  return (
    <main>
      {isLoading ? null : (
        <>
          {course === null ? (
            <Redirect to="/not-found" />
          ) : (
            <>
              <div className="actions--bar">
                <div className="wrap">
                  {authUser && authUser.id === course.user.id ? (
                    <>
                      <Link to={`/courses/${course.id}/update`}>
                        <button className="button">Update Course</button>
                      </Link>
                      <button
                        className="button"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this course?"
                            )
                          ) {
                            handleDelete();
                          }
                        }}
                      >
                        Delete Course
                      </button>
                    </>
                  ) : null}
                  <Link to="/">
                    <button className="button button-secondary">
                      Return to List
                    </button>
                  </Link>
                </div>
              </div>
              <CourseDetails course={course} />
            </>
          )}
        </>
      )}
    </main>
  );
};
