export type ISale = {
    createdAt: Date,
    orderNo: number,
    buyerName: object,
    paymentType: string,
    totalAmount: number
}

export type ISaleList = {
    page: number,
    limit: number,
    filterObj?: object,
    sortObj?: object
}


export type IProductList = {
    page: number,
    limit: number,
    filterObj?: object,
    sortObj?: object
}

export type ISellerList = {
    page: number,
    limit: number,
    filterObj?: object,
    sortObj?: object
}

export type IBuyerList = {
    page: number,
    limit: number,
    filterObj?: object,
    sortObj?: object
}

