import { AxiosError } from "axios";
import { parseAxiosError, showNotification, STATUS } from "../common/constant";
import { BaseService } from "./base.service";
import { IErrorResponse, ISuccessResponse } from "./interfaces/ApiResponse.interface";
import { Ilogin, ISignUp } from "./interfaces/authentication.interface";


export class AuthService extends BaseService {

    public async Signup(signup: ISignUp): Promise<ISuccessResponse | IErrorResponse> {
        try {
            const { data } = await this.httpClient.post("register", signup);

            return data;
        } catch (error: any) {
            const err = parseAxiosError(error as AxiosError);

            return err.error.response.data;
        }
    }

    public async Login(signin: Ilogin) {
        try {
            const { data } = await this.httpClient.post("login", signin);

            if (data.status === STATUS.SUCCESS) {
                return data;
            } else {
                showNotification(data.status, data.message);
            }
        }
        catch (error) {
            parseAxiosError(error as AxiosError);

        }
    }
}