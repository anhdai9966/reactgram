import axios from "axios";

const axiosFirebaseConfig = axios.create({
  baseURL:
    process.env.REACT_APP_FIREBASE_API ||
    "https://us-central1-reactjs-api-a31a3.cloudfunctions.net/app",
  headers: { "Content-Type": "application/json" },
});

const axiosMediaConfig = axios.create({
  baseURL: "http://103.237.147.34:8888/api/v1/users/1",
  headers: { "Content-Type": "multipart/form-data" },
});

export { axiosMediaConfig, axiosFirebaseConfig };
