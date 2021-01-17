import axiosClient from "./axiosClient";

const sizeApi = {
    getAll : () =>{
        const url = '/size/get';
        return axiosClient.get(url);
    }   
}

export default sizeApi;