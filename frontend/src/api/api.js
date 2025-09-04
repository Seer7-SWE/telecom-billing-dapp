import axios from "axios";
const api = axios.create({ baseURL: "/api" }); // same origin
export default api;
