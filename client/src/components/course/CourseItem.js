import React from "react";
import { Link } from "react-router-dom";

export const CourseItem = ({ course }) => {
  return (
    <>
      <Link to={`/courses/${course.id}`}>
        <div className="course--module course--link">
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{course.title}</h3>
        </div>
      </Link>
    </>
  );
};
