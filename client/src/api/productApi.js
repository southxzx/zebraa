import axiosClient from "./axiosClient";


const productApi = {
    getAll: (params) => {
        const url = '/product/getAll';
        return axiosClient.post(url , params);
    }
}

export default productApi;
