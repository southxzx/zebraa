import axiosClient from "./axiosClient";

const categoryApi = {
    getAll: () => {
        const url = '/category/get';
        return axiosClient.get(url);
    }
}

export default categoryApi;