import axiosClient from "./axiosClient";


const reviewApi = {
    add: (data) => {
        const url = '/review/add';
        return axiosClient.post(url, data);
    }
    // ,
    // get:(id) => {
    //     const url = `/product/get?id=${id}`;
    //     return axiosClient.get(url);
    // }
}

export default reviewApi;
