import axiosClient from "./axiosClient";


const productApi = {
    getAll: (params) => {
        const url = '/product/getAll';
        return axiosClient.get(url , {params});
    }
}

export default productApi;
