import { axios } from "~/configs";

const userApi = {
    login() {
        const url = "/users";
        return axios.get(url);
    },
}

export default userApi