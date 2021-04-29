import axios from "axios";

/**
 * posts new course data to backend with credential
 *
 * @param {Object} course
 * @param {Object} user
 * @returns {Promise}
 */
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

/**
 * send delete request to course to backend with credential
 *
 * @param {number} id course id
 * @param {Object} user
 * @returns {Promise}
 */
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

/**
 * get all courses data to backend
 *
 * @returns {Promise}
 */
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

/**
 * get course details with given course id from courses api
 *
 * @param {number} courseId
 * @returns {Promise}
 */
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


/**
 * Update a course with user credential
 *
 * @param {number} id
 * @param {Object} course
 * @param {Object} user
 * @returns {Promise}
 */
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
