import axiosClient from "./axiosClient";


const productApi = {
    getAll: (params) => {
        const url = '/product';
        return axiosClient.get(url , {params});
    }
}

export default productApi;
