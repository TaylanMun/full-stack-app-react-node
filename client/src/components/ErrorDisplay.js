import React from "react";
// Show error display if backend validation returns
export const ErrorDisplay = ({ errors }) => {
  let errorsDisplay = null;
  if (errors.length) {
    errorsDisplay = (
      <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  return errorsDisplay;
};


