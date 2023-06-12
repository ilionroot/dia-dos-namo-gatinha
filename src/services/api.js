import axios from "axios";

export const api = axios.create({
  // baseURL: "http://192.168.15.14:3030/",
  baseURL: "https://api.leparse.tech:3030/",
});
