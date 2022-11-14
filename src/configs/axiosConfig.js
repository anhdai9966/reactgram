import axios from "axios";

const axiosFirebaseConfig = axios.create({
  baseURL: "http://127.0.0.1:5001/reactjs-api-a31a3/us-central1/app",
  headers: { "Content-Type": "application/json" },
});

const axiosMediaConfig = axios.create({
  baseURL: "http://103.237.147.34:8888/api/v1/users/1",
  headers: { "Content-Type": "multipart/form-data" },
});

export { axiosMediaConfig, axiosFirebaseConfig };
