import axios from 'axios';
import queryString from "query-string";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-type": "application/json"
    },
    paramsSerializer: (params) => queryString.stringify(params) // transform object params to string params : ?...&... 
});

axiosClient.interceptors.request.use( async (config) => {
    // Handle token here ...
    return config
});

axiosClient.interceptors.response.use(
    (response) => {

        return response;
    }
    ,
    (error) => {
        // Handle errors
        throw error;
    }
);

export default axiosClient;