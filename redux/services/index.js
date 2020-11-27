import agent from "./agent";
import axios from "axios";
import qs from "qs";
const convert = item => {
  return JSON.stringify(item).replace(/\"([^(\")"]+)\":/g, "$1:");
};
export default {
  get: (url, item) => {
    return agent().get(url, {
      params: item
    });
  },
  post: (url, item, params) => {
    return agent().post(url, item, { params: params });
  },
  patch: (url, item) => {
    return agent().patch(url, item);
  },
  put: (url, item) => {
    return agent().put(url, item);
  },
  delete: url => {
    return agent().delete(url);
  },
  upload: (url, item) => {
    try {
      let data = new FormData();
      data.append("file", item.file, item.file.fileName);
      return axios
        .post("/api" + url, data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`
          }
        })
        .then(response => {
          console.log(response);
          //handle success
        })
        .catch(error => {
          console.log(error);
          //handle error
        });
    } catch (e) {
      console.log(e);
    }
  }
};
