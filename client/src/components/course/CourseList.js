import React from "react";
import { CourseItem } from "./CourseItem";

export const CourseList = ({ isLoading, courses }) =>
  isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      {courses && courses.map((course) => (
        <CourseItem key={course.id} course={course} />
      ))}
    </>
  );
