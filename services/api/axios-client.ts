import axios from "axios";

const URL_API = process.env.NEXT_PUBLIC_API_URL;

const axiosClient = axios.create({
  baseURL: URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
