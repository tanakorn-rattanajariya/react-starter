import axios from "axios";
const API_ROOT = process.env.BACKEND_URI;
const headers = () => ({});
const agent = (token) => {
  // let user = localStorage.getItem("use");
  // const tk = JSON.parse(user).token;
  return axios.create({
    baseURL: `${API_ROOT}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    timeout: 20000,
  });
};

export default agent;
