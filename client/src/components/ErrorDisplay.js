import React from "react";

export const ErrorDisplay = ({ errors }) => {
  let errorsDisplay = null;
  if (errors.length) {
    errorsDisplay = (
      <div>
        <ul className="validation--errors">
          {errors.map((error, i) => (
            <ul key={i}>{error}</ul>
          ))}
        </ul>
      </div>
    );
  }

  return errorsDisplay;
};
