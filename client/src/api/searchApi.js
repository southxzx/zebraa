import axiosClient from "./axiosClient";

const searchApi = {
    get: (name) => {
        const url = `/search/get?name=${name}`;
        return axiosClient.get(url);
    }
}

export default searchApi;