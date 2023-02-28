import { BaseService } from "./base.service";
import { IErrorResponse, ISuccessResponse } from "./interfaces/ApiResponse.interface";
import { IBuyerList, IProductList, ISellerList } from "./interfaces/admin.interface";

export class AdminService extends BaseService {

    public async getAllSales(saleList:any): Promise<ISuccessResponse | IErrorResponse> {
        try {
            const { data } = await this.httpClient.post("getAllSales", saleList);
            return data;
        } catch (error: any) {
            return error.response.data;
        }
    }

    public async deleteSale(saleDetails:any): Promise<ISuccessResponse | IErrorResponse> {
        try {
            const { data } = await this.httpClient.post("deleteSale", saleDetails);
            return data;
        } catch (error: any) {
            return error.response.data;
        }
    }

    public async getAllUsers(userList: ISellerList): Promise<ISuccessResponse | IErrorResponse> {
        try {
            const { data } = await this.httpClient.post("getAllUsers", userList);

            return data;
        } catch (error: any) {
            return error.response.data;
        }
    }

    public async userApproval(userDetails: any): Promise<ISuccessResponse | IErrorResponse> {
        try {
            const { data } = await this.httpClient.post("userApproval", userDetails);

            return data;
        } catch (error: any) {
            return error.response.data;
        }
    }

    public async getAllBuyers(buyerList: IBuyerList): Promise<ISuccessResponse | IErrorResponse> {
        try {
            const { data } = await this.httpClient.post("getAllBuyers", buyerList);

            return data;
        } catch (error: any) {
            return error.error.response.data;
        }
    }

    public async getCreditPoints(): Promise<ISuccessResponse | IErrorResponse> {
        try {
            const { data } = await this.httpClient.get("getCreditPoints");

            return data;
        } catch (error: any) {
            return error.error.response.data;
        }
    }

    public async getAllProducts(productList: IProductList): Promise<ISuccessResponse | IErrorResponse> {
        try {
            const { data } = await this.httpClient.post("getAllProducts", productList);

            return data;
        } catch (error: any) {
            return error.error.response.data;
        }
    }

    public async deleteProduct(productDetails: any): Promise<ISuccessResponse | IErrorResponse> {
        try {
            const { data } = await this.httpClient.post("deleteProduct", productDetails);

            return data;
        } catch (error: any) {
            return error.error.response.data;
        }
    }

    public async getSaleById(saleId: any): Promise<ISuccessResponse | IErrorResponse> {
        try {
            const { data } = await this.httpClient.post("getSaleById", saleId);

            return data;
        } catch (error: any) {
            return error.error.response.data;
        }
    }

    public async getDashboardDetails(request: any): Promise<ISuccessResponse | IErrorResponse> {
        try {
            const { data } = await this.httpClient.post("getDashboardDetails", request);

            return data;
        } catch (error: any) {
            return error.error.response.data;
        }
    }

}


