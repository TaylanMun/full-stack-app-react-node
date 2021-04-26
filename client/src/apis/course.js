import axios from "axios";

//post new course
export const createCourse = (course, user) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/courses`, course, {
        responseType: "json",
        auth: {
          username: user.emailAddress,
          password: user.password,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

// send delete course
export const deleteCourse = (id, user) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/courses/${id}`, {
        responseType: "json",
        auth: {
          username: user.emailAddress,
          password: user.password,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

// get all courses
export const getCourses = async () => {
  return new Promise((resolve, reject) =>
    axios
      .get(`/api/courses`, { responseType: "json" })
      .then((response) => {
        if (response.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error.response);
      })
  );
};

//  get course details with id
export const getCourse = (courseId) => {
  return new Promise((resolve, reject) =>
    axios
      .get(`/api/courses/${courseId}`, { responseType: "json" })
      .then((response) => {
        if (response.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error.response);
      })
  );
};


// update course with id
export const updateCourse = (id, course, user) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/courses/${id}`, course, {
        responseType: "json",
        auth: {
          username: user.emailAddress,
          password: user.password,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};
