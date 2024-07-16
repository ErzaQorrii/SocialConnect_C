  import axios from "axios"
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

//Attach token to the request
axiosInstance.interceptors.request.use(
  //  // Function to handle and modify the request configuration before the request is sent
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }


);

export default axiosInstance;
