export const ADD_INVENTORY = "ADD_INVENTORY";
export const WAREHOUSE_DETAILS = "WAREHOUSE_DETAILS";
export const PRODUCT_SERIAL_DETAILS = "PRODUCT_SERIAL_DETAILS";
export const USER_DETAILS = "USER_DETAILS";
export const SEARCH_TEXT = "SEARCH_TEXT";


export const setInventoryActions = (data: any) => ({ type: ADD_INVENTORY, payload: data });

export const setWarehouseActions = (data: any) => ({ type: WAREHOUSE_DETAILS, payload: data });

export const setProductSerialActions = (data: any) => ({ type: PRODUCT_SERIAL_DETAILS, payload: data });

export const setAuthData = (data: any) => ({ type: USER_DETAILS, payload: data });

export const setSearchActions = (data: any) => ({ type: SEARCH_TEXT, payload: data });