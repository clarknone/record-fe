import axios from "axios";

axios.defaults.baseURL = import.meta.env.SERVER_URL || "http://localhost:8000";
axios.defaults.withCredentials = false;
