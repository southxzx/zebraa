import axiosClient from "./axiosClient";

const colorApi = {
    getAll : (idUser) =>{
        const url = `/cart/get?idUser=${idUser}`;
        return axiosClient.get(url);
    },
    add : (data) =>{
        const url = '/cart/add';
        return axiosClient.post(url, data);
    },
    delete : (idItem)=>{
        const url = `/cart/delete?idItem=${idItem}`;
        return axiosClient.delete(url);
    }
}

export default colorApi;