import axios from "axios";
import {DEFAULT_URL} from "./constants";

export default function ({token, ...apiParams}) {
    const api = axios.create({
        baseURL: DEFAULT_URL,
        ...apiParams
    })
    if (token) {
        const header = {Authorization: `Bearer ${token}`}
        api.interceptors.request.use(
            (config) => {
                config.headers.common = header
                return config
            },
            function (error) {
                return Promise.reject(error)
            }
        )
    }
    return api
}