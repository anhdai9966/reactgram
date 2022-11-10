import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://127.0.0.1:5001/reactjs-api-a31a3/us-central1/app",
  headers: { "Content-type": "application/json; charset=UTF-8" },
});

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosConfig;
