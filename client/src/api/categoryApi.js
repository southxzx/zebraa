import axiosClient from "./axiosClient";
import { toast } from 'react-toastify';

const categoryApi = {
    getAll: () => {
        const url = '/category/get';
        return axiosClient.get(url);
    }
    ,
    post: (data) => {
        const url = '/category/post';
        return axiosClient.post(url,data)
                            .then(res => {toast.success(res.data.message)})
                            .catch(err => {toast.error(err.response.data.errors)});
    }

}

export default categoryApi;