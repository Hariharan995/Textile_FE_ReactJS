import { AxiosError } from "axios";
import { IErrorResponse } from "../services/interfaces/ApiResponse.interface";
import * as toaster from "toastr";

export const BASE_URL = process.env.REACT_APP_BASE_URL as string;
export const BULL_MQ_URL = process.env.REACT_APP_BULL_MQ_URL as string;
export const BULL_MQ_SOCKET_URL = process.env.REACT_APP_BULL_MQ_SOCKET_URL as string;

export const PIM_API = "https://pimapi-d2jn4z2hbq-el.a.run.app/";
export const PINCODE_API = "https://poorvika.org/api/oc3/";
export const GST_API = "https://dev-seller.poorvika.com/api/accounts/";
export const STOCK_INFO = "https://apx.poorvikamobiles.net/api/apxapi/";


export const STATUS = {
    SUCCESS: "success",
    FAILURE: "failure"
};

export const EVENTS = {
    connection: "connection",
    CLIENT: {
        APX_STOCK_UPDATE: "APX_STOCK_UPDATE",
        DROP_SHIP_STOCK_UPDATE: "DROP_SHIP_STOCK_UPDATE",
    },
    SERVER: {
        APX_STOCK_UPDATE: "APX_STOCK_UPDATE",
        DROP_SHIP_STOCK_UPDATE: "DROP_SHIP_STOCK_UPDATE",
        APX_STOCK_PROGRESS: "APX_STOCK_PROGRESS",
        BAJAJ_STOCK_UPDATE: "BAJAJ_STOCK_UPDATE",
        BAJAJ_STOCK_PROGRESS: "BAJAJ_STOCK_PROGRESS",
        DROP_SHIP_STOCK_PROGRESS: "DROP_SHIP_STOCK_PROGRESS",
        BULK_PRODUCT_UPLOAD: "BULK_PRODUCT_UPLOAD",
        BULK_WAREHOUSE_UPLOAD: "BULK_WAREHOUSE_UPLOAD",
        ADD_TO_ALL: "ADD_TO_ALL",
    },
};

export const showNotification = (type: string, message: string): void => {
    const toasterOptions = { positionClass: "toast-top-center", timeOut: 2000 };
    toaster.remove();
    // eslint-disable-next-line no-param-reassign
    message = message || "Something Went Wrong";

    if (type === STATUS.SUCCESS) {
        toaster.success(message, "", toasterOptions);
    } else if (type === STATUS.FAILURE) {
        toaster.error(message, "", toasterOptions);
    }
};

export const parseAxiosError = (error: AxiosError): IErrorResponse => {
    if (error.isAxiosError && error.response) {

        showNotification(STATUS.FAILURE, error.response.data.message);

        return { status: STATUS.FAILURE, message: error.response.data.message, error };
    } else {
        showNotification(STATUS.FAILURE, error.message);

        return { status: STATUS.FAILURE, message: error.message, error };
    }
};


export const fullfillmentMethod = ["NORMAL", "HYPER_LOCAL", "SAME_DAY", "NEXT_DAY", "WEEK", "TWO_HOURS"];

export const allowedChannels = ["online", "amazon", "flipkart", "tatacliq"];


export const Istate = [
    "Andhra Pradesh",
    "Andaman and Nicobar Islands",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadar and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
];
