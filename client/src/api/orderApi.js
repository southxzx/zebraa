import axiosClient from "./axiosClient";

const orderApi = {
    get : (idUser) =>{
        const url = `/order/get?idUser=${idUser}`;
        return axiosClient.get(url);
    },
    add : (data) =>{
        const url = '/order/add';
        return axiosClient.post(url, data);
    }
    // delete : (idItem)=>{
    //     const url = `/cart/delete?idItem=${idItem}`;
    //     return axiosClient.delete(url);
    // },
    // update: (data)=>{
    //     const url = `/cart/update`;
    //     return axiosClient.put(url, data);
    // }
}

export default orderApi;