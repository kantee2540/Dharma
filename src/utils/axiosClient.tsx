import axios from "axios";
import { baseUrl } from "../networkVariable";

const axiosClient = axios.create({
  baseURL: baseUrl,
});

export { axiosClient };
