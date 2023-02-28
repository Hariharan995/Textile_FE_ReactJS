import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL, showNotification } from "../common/constant";

export class BaseService {
    httpClient: AxiosInstance = axios.create({ baseURL: BASE_URL });

    constructor() {

        this.httpClient.interceptors.request.use((request: AxiosRequestConfig) => {
            if (!request.headers?.authorization) {
                const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : ""
                request.headers = { authorization: "Bearer " + String(user.token), ...request.headers };
            }
            return request;
        });

        this.httpClient.interceptors.response.use((response: AxiosResponse) => {
            return response;
        }, (error: any) => {
            const err = Promise.reject(error);
            if (error.response.status === 401) {
                this.autoLogout();
            }

            return err;

        });
    }

    async autoLogout(): Promise<void> {
        //localStorage.clear();
        showNotification("failure", "Session Expired, Kindly login again");
        window.open(window.location.origin, "_self");
    }
}
