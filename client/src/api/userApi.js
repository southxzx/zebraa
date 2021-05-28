import axiosClient from "./axiosClient";

const userApi = {
    get: (email) => {
        const url = `/user/info?email=${email}`;
        return axiosClient.get(url);
    }
}

export default userApi;