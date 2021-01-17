import axiosClient from "./axiosClient";

const colorProductApi = {
    getLastOne : () => {
        const url = '/colorProduct/getLastOne';
        return axiosClient.get(url);
    }
}

export default colorProductApi;