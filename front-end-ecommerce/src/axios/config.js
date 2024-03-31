import axios from "axios";


const ecommerceFetch = axios.create({
  baseURL: "http://localhost:5150/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default ecommerceFetch;