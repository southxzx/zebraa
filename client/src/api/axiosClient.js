import axios from 'axios';
import queryString from "query-string";
import cookie from 'js-cookie';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-type": "application/json"
    },
    paramsSerializer: (params) => queryString.stringify(params) // transform object params to string params : ?...&... 
});

axiosClient.interceptors.request.use( async (config) => {
    // Handle token here ...
    const token = await cookie.get('token');
    config.headers.Authorization = `Bearer ${token}`;
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