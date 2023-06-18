import {
    API_SUCCESS,
    API_FAIL,
    GET_CHARTS_DATA,
    GET_ORDERS_COUNT_DATA,
    GET_ORDERS_COUNT_DATA_SUCCESS,
    GET_ORDERS_COUNT_DATA_ERROR,
    GET_REVENUE_TOTAL_DATA,
    GET_REVENUE_TOTAL_DATA_SUCCESS,
    GET_REVENUE_TOTAL_DATA_ERROR,
    GET_ORDER_TOTAL_AVERAGE_PRICE,
    GET_ORDER_TOTAL_AVERAGE_PRICE_SUCCESS,
    GET_ORDER_TOTAL_AVERAGE_PRICE_ERROR
} from "./actionTypes";

export const apiSuccess = (actionType, data) => ({
    type: API_SUCCESS,
    payload: { actionType, data },
});

export const apiFail = (actionType, error) => ({
    type: API_FAIL,
    payload: { actionType, error },
});

// charts data
export const getChartsData = (periodType) => ({
    type: GET_CHARTS_DATA,
    payload: periodType
});

export const getTotalOrderCount = () => ({
    type: GET_ORDERS_COUNT_DATA
})

export const getTotalOrdersCountApiSuccess = (actionType, data) => ({
    type: GET_ORDERS_COUNT_DATA_SUCCESS,
    payload: { actionType, data },
});

export const getTotalOrdersCountApiError = (actionType, error) => ({
    type: GET_ORDERS_COUNT_DATA_ERROR,
    payload: { actionType, error },
});

export const getRevenueTotalData = () => ({
    type: GET_REVENUE_TOTAL_DATA
})

export const getRevenueTotalDataSuccess = (actionType, data) => ({
    type: GET_REVENUE_TOTAL_DATA_SUCCESS,
    payload: { actionType, data },
});

export const getRevenueTotalDataError = (actionType, error) => ({
    type: GET_REVENUE_TOTAL_DATA_ERROR,
    payload: { actionType, error },
});

export const getOrderTotalAveragePrice = () => ({
    type: GET_ORDER_TOTAL_AVERAGE_PRICE
})

export const getOrderTotalAveragePriceSuccess = (actionType, data) => ({
    type: GET_ORDER_TOTAL_AVERAGE_PRICE_SUCCESS,
    payload: { actionType, data },
});

export const getOrderTotalAveragePriceError = (actionType, error) => ({
    type: GET_ORDER_TOTAL_AVERAGE_PRICE_ERROR,
    payload: { actionType, error },
});