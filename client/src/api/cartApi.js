import axiosClient from "./axiosClient";
import { toast } from 'react-toastify';

const cartApi = {
    getAll : (idUser) =>{
        const url = `/cart/get?idUser=${idUser}`;
        return axiosClient.get(url);
    },
    add : (data) =>{
        const url = '/cart/add';
        return axiosClient.post(url, data)
                            .then(res => {toast.success(res.data.message)})
                            .catch(err => {toast.error(err.response.data.errors)});
    },
    delete : (idItem)=>{
        const url = `/cart/delete?idItem=${idItem}`;
        return axiosClient.delete(url);
    },
    update: (data)=>{
        const url = `/cart/update`;
        return axiosClient.put(url, data);
    }
}

export default cartApi;