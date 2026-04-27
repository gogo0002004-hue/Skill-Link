import axios from "axios";

const api = axios.create({
  baseURL: "https://skilllinkapi.ddns.net"
});

export default api;