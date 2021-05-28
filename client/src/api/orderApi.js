import axiosClient from "./axiosClient";

const orderApi = {
    get : (idUser) =>{
        const url = `/order/get?idUser=${idUser}`;
        return axiosClient.get(url);
    },
    add : (data) =>{
        const url = '/order/add';
        return axiosClient.post(url, data);
    },
    getAll : () => {
      const url = '/order/getAll';
      return axiosClient.get(url);
    },
    updateStatus : (data) => {
      return axiosClient.put('/order/update', data)
    }
}

export default orderApi;