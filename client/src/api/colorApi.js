import axiosClient from "./axiosClient";

const colorApi = {
    getAll : () =>{
        const url = '/color/get';
        return axiosClient.get(url);
    }
}

export default colorApi;