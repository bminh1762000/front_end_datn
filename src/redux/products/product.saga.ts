import { takeLatest, put, all, call } from 'redux-saga/effects';

import { fetchProductsSuccess, fetchProductsFailure, ActionTypes } from '.';

import { getProductsApi, getProductDetailApi } from '../../service/product';
import { loadingEnd, loadingStart } from '../loading/loading.actions';

export function* fetchProductsAsync() {
    try {
        yield put(loadingStart());
        const response = yield call(getProductsApi);
        yield put(fetchProductsSuccess(response.products));
    } catch (error) {
        yield put(fetchProductsFailure(error.message));
    } finally {
        yield put(loadingEnd());
    }
}

export function* getProductAsync(productId: string) {
    yield put(loadingStart());
    const response = yield call(getProductDetailApi, productId);
    yield put(fetchProductsSuccess(response.product));
}

export function* fetchProductsStart() {
    yield takeLatest(ActionTypes.FETCH_PRODUCTS_START, fetchProductsAsync);
}

export function* productsSagas() {
    yield all([call(fetchProductsStart)]);
}
