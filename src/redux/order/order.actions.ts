import OrderActionTypes from './order.types';

export const fetchOrdersStart = (token) => ({
    type: OrderActionTypes.FETCH_ORDERS_START,
    payload: token,
});

export const fetchOrdersSuccess = (orders) => ({
    type: OrderActionTypes.FETCH_ORDERS_SUCCESS,
    payload: orders,
});

export const fetchOrdersFailure = (error) => ({
    type: OrderActionTypes.FETCH_ORDERS_FAILURE,
    payload: error,
});

export const createOrderStart = (order) => ({
    type: OrderActionTypes.CREATE_ORDER_START,
    payload: order,
});

export const createOrderSuccess = (order) => ({
    type: OrderActionTypes.CREATE_ORDER_SUCCESS,
    payload: order,
});

export const createOrderFailure = (error) => ({
    type: OrderActionTypes.CREATE_ORDER_FAILURE,
    payload: error,
});
