import axiosClient from "./axiosClient";

const searchApi = {
    get: (name) => {
        const url = `/search/get?name=${name}`;
        return axiosClient.get(url,{
            baseURL: 'http://localhost:5000'
        });
    }
}

export default searchApi;