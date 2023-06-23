import OrderActionTypes from './order.types';

const INITIAL_STATE = {
    orders: [],
    error: null,
    loading: false,
};

const orderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OrderActionTypes.FETCH_ORDERS_START:
        case OrderActionTypes.CREATE_ORDER_START:
            return {
                ...state,
                loading: true,
            };
        case OrderActionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload,
                loading: false,
            };
        case OrderActionTypes.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                orders: [...state.orders, action.payload],
                loading: false,
            };
        case OrderActionTypes.FETCH_ORDERS_FAILURE:
        case OrderActionTypes.CREATE_ORDER_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default orderReducer;
