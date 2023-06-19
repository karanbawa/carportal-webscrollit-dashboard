//REGISTER
export const POST_REGISTER = "/v1/signup/basic";

//Login
export const POST_LOGIN = "/v1/login/basic";

// dashboard
export const GET_ORDERS_COUNT_DATA = "/v1/orders/get/totalorders";
export const GET_REVENUE_TOTAL_DATA = "/v1/orders/get/totalrevenue";
export const GET_ORDERS_AVERAGE_PRICE = "/v1/orders/get/averageprice";

//COLLECTIONS (SAME AS CATEGORIES)
export const GET_COLLECTIONS = "/v1/categories";
export const ADD_COLLECTION = "/v1/categories";
export const UPDATE_COLLECTION = "/v1/categories/";
export const DELETE_COLLECTION = "/v1/categories/";

// products
export const GET_ALL_PRODUCTS_IN_LIST = "/v1/products/submitted/all";
export const ADD_PRODUCT_IN_LIST = "/v1/products";
export const GET_ONE_PRODUCT = "/v1/products/id/";
export const DELETE_PRODUCT_IN_LIST = "/v1/products/id/";
export const UPDATE_PRODUCT_IN_LIST = "v1/products/id/";

//domain
export const DOMAIN_SUGGESTION = "v1/godaddy/suggest-domains?keyword";
export const DOMAIN_AVAILABILITY = "v1/godaddy/check-domain?domain=";
export const BUY_DOMAIN = "v1/godaddy/purchase-domain";

export const DOMAIN_ORDERID = "v1/godaddy/razorpay/orders";

//ORDERS
export const GET_ORDERS = "/v1/orders";
export const ADD_NEW_ORDER = "/v1/orders";
export const UPDATE_ORDER = "/v1/orders/";
export const DELETE_ORDER = "/v1/orders/";
export const DELETE_ALL_ORDER = "/v1/orders/delete/all";

//CUSTOMERS
export const GET_CUSTOMERS = "/v1/customer/importcustomers";
export const ADD_NEW_CUSTOMER = "/v1/customer/add";
export const UPDATE_CUSTOMER = "/v1/customer/update/";
export const DELETE_CUSTOMER = "/v1/customer/delete/";
export const DELETE_ALL_CUSTOMERS = "/v1/customer/deleteall";
export const IMPORT_CUSTOMERS = "/v1/customer/importcustomers";
