import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { getCourses } from "../../apis";
import { CourseList } from "../../components/course";

export const Courses = () => {
  // initial state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [courses, setCourses] = useState();

  //gets all the lessons when the page loads
  useEffect(() => {
    getCourses()
      .then((response) => {
        if (response.status === 200) {
          setCourses(response.data);
          setIsLoading(false);
        } else {
          setError(true);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (error.status === 404) {
          setError(true);
          setIsLoading(false);
        } else {
          setError(true);
          setIsLoading(false);
        }
      });
  }, []);

  const history = useHistory();
  
  if (error) {
    history.push("/error");
  }
  return (
    <main>
      <div className="wrap main--grid">
        <CourseList isLoading={isLoading} courses={courses} />
        {!isLoading ? (
        <Link to="/courses/create">
          <div className="course--module course--add--module">
            <span className="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                className="add"
              >
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
              </svg>
              New Course
            </span>
          </div>
        </Link>
      ) : null}
      </div>
    </main>
  );
};
