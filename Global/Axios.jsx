import axios from "axios";

const api = axios.create({
    baseURL: "http://3.110.193.205:3200",
    withCredentials: true
})
export default api;