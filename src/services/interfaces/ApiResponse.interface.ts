export type ISuccessResponse<T = any> = {
    count?: T,
    data: T,
    status: string,
    message: string
    statusCode?: string
}

export type IErrorResponse<T = any> = {
    error: T,
    count?: unknown,
    data?: unknown,
    status: string,
    message: string
}
