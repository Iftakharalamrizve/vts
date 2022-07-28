import _ from "lodash";
import storage from "../helpers/storage";
import axios from "axios";
import apiConfig from "./pathconfig";

axios.interceptors.request.use((config) => {
  return config;
});

const authHttp = axios.create({
  baseURL: "http://sapi.cpsdbd.com/api/v1",
  timeout: 30000,
});

export { authHttp };

const execute = async (
  path,
  method = "GET",
  { params = {}, queries = {}, payloads = {}, headers = {} } = {}
) => {
  const base = apiConfig.apiBaseUrl.replace(/~\/$/, "");
  const url = base + "/" + path;

  const options = { method, headers };

  if (method === "POST" || method === "PATCH") {
    options.data = payloads;
  }

  if (queries) {
    options.params = queries;
  }

  options.url = url;
  options.baseURL = base;
  return await axios(options);
};

export default {
  get: (path, options) => execute(path, "GET", options),
  post: (path, options) => execute(path, "POST", options),
  patch: (path, options) => execute(path, "PATCH", options),
  delete: (path, options) => execute(path, "DELETE", options),
};
