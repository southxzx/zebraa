import axiosClient from "./axiosClient";

const historyApi = {
    getAll : (idUser) =>{
        const url = `/history/get?idUser=${idUser}`;
        return axiosClient.get(url);
    },
    add : (data) =>{
        const url = '/history/add';
        return axiosClient.post(url, data);
    },
    // delete : (idItem)=>{
    //     const url = `/cart/delete?idItem=${idItem}`;
    //     return axiosClient.delete(url);
    // },
    // update: (data)=>{
    //     const url = `/cart/update`;
    //     return axiosClient.put(url, data);
    // }
}

export default historyApi;