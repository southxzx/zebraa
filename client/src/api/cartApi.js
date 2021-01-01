import axiosClient from "./axiosClient";

const colorApi = {
    getAll : (idUser) =>{
        const url = `/cart/get?idUser=${idUser}`;
        return axiosClient.get(url);
    }
}

export default colorApi;