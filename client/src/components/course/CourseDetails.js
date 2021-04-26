import React from "react";
import ReactMarkdown from "react-markdown";

export const CourseDetails = ({ course }) => (
  <div className="wrap">
    <h2>Course Detail</h2>
    <div className="main--flex">
      <div>
        <h3 className="course--detail--title">Course</h3>
        <h4 className="course--name">{course.title}</h4>
        <p>By {`${course.user.firstName} ${course.user.lastName}`}</p>

        <ReactMarkdown>{course.description}</ReactMarkdown>
      </div>
      <div>
        <h3 className="course--detail--title">Estimated Time</h3>
        <p>{course.estimatedTime}</p>

        <h3 className="course--detail--title">Materials Needed</h3>
        <ul className="course--detail--list">
          <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
        </ul>
      </div>
    </div>
  </div>
);
