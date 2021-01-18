import axiosClient from "./axiosClient";


const productApi = {
    getAll: (params) => {
        const url = '/product/getAll';
        return axiosClient.post(url , params);
    }
    ,
    get:(id) => {
        const url = `/product/get?id=${id}`;
        return axiosClient.get(url);
    },
    updateQty:(data) => {
        const url = `/product/updateQty`;
        return axiosClient.put(url, data);
    }
}

export default productApi;
