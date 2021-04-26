import axios from "axios";

//posts new user
export const createUser = (user) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/users`, user, { responseType: "json" })
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

// get user
export const getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/users", {
        responseType: "json",
        auth: {
          username: email,
          password: password,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          resolve({ ...response.data, password });
        } else {
          reject(response.status);
        }
      })
      .catch((error) => {
        reject(error.response.status);
      });
  });
};
