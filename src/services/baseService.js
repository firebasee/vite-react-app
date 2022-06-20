import axios from "axios";

const baseURL = "https://fakestoreapi.com/";

const baseService = axios.create({
  baseURL,
});

export default baseService;
