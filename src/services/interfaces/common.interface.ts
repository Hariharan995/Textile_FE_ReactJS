
export type ISuccessResponse <T = any> = {
    total_stock?:number,
    data: T, 
    status: string,
    message: string
    pagecount?:number
}
 
export type IErrorResponse <T = any> = {
    error: T, 
    data?: unknown,
    status: string,
    message: string
}

export interface IAPIResponse <T = unknown > {
    data?: T,
    error?: T,
    status: string,
    message: string
}


export type ISuccessResponses <T = any> = {
    Data: T, 
    StatusMessage: string,
    message: string,
    StatusCode?:number
}

export type IErrorResponses <T = any> = {
    error: T, 
    StatusMessage: string,
    message: string
}

export type IHistoryResponseData = {
     success: number,
     code : number,
     pim_code: string,
     data: string ,
     missingdata: null | string
}

export type IApproveResponse = {
    success: number,
    code : number,
    data: string ,
}


export type IHistoryResponse = {
    seller_code: string,
    success: number,
    failed: number,
    url: string,
    file: string,
    response: IHistoryResponseData [],
    row_added_dttm: string,
    row_updated_dttm: string
}

export type ILocation = {
    from: { pathname: string }
  }