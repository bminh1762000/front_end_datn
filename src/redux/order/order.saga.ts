import { put, takeLatest, all, call } from 'redux-saga/effects';

import OrderActionTypes from './order.types';

import { getOrdersApi, createOrderApi } from '../../service/order';

import { fetchOrdersSuccess, fetchOrdersFailure, createOrderSuccess, createOrderFailure } from './order.actions';
import { clearCartStart } from '../cart/cart.actions';

export function* fetchOrdersAsync({ payload }: any) {
    try {
        const response = yield call(getOrdersApi, payload);
        yield put(fetchOrdersSuccess(response.orders));
    } catch (error) {
        yield put(fetchOrdersFailure(error.message));
    }
}

export function* createOrderAsync({ payload: { order, token } }: any) {
    try {
        const response = yield call(createOrderApi, order, token);
        yield put(createOrderSuccess(response.order));
        yield put(clearCartStart({ token }));
    } catch (error) {
        yield put(createOrderFailure(error.message));
    }
}

export function* fetchOrdersStart() {
    yield takeLatest(OrderActionTypes.FETCH_ORDERS_START, fetchOrdersAsync);
}

export function* createOrderStart() {
    yield takeLatest(OrderActionTypes.CREATE_ORDER_START, createOrderAsync);
}

export function* orderSagas() {
    yield all([call(fetchOrdersStart), call(createOrderStart)]);
}
// Compare this snippet from src/redux/root-reducer.ts:
// import { combineReducers } from 'redux';
