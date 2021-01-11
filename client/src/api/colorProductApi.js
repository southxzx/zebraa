import axiosClient from "./axiosClient";

const colorProductApi = {
    getAll : () => {
        const url = '/colorProduct/get';
        return axiosClient.get(url);
    }
}

export default colorProductApi;