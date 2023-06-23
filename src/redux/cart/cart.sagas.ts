import { put, takeLatest, all, call } from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';
import CartActionTypes from './cart.types';

import {
    getCartItemsApi,
    addCartItemApi,
    clearItemFromCartApi,
    removeItemFromCartApi,
    clearCartApi,
} from '../../service/cart';

import {
    clearCart,
    addItemSuccess,
    addItemFailure,
    removeItemSuccess,
    removeItemFailure,
    clearItemFromCartSuccess,
    clearItemFromCartFailure,
    fetchCartSuccess,
    fetchCartFailure,
    clearCartFailure,
    clearCartSuccess,
} from './cart.actions';

export function* fetchCartAsync({ payload }: any) {
    try {
        const response = yield call(getCartItemsApi, payload);
        yield put(fetchCartSuccess(response.cart));
    } catch (error) {
        console.log(error.message);
        yield put(fetchCartFailure(error.message));
    }
}

export function* clearCartOnSignOut() {
    yield put(clearCart());
}

export function* addToCart({ payload: { itemId, token } }: any) {
    try {
        const cart = yield call(addCartItemApi, itemId, token);
        yield put(addItemSuccess(cart.newCart));
    } catch (error) {
        console.log(error.message);
        yield put(addItemFailure(error.message));
    }
}

export function* removeFromCart({ payload: { itemId, token } }: any) {
    try {
        const cart = yield call(removeItemFromCartApi, itemId, token);
        yield put(removeItemSuccess(cart.newCart));
    } catch (error) {
        yield put(removeItemFailure(error.message));
    }
}

export function* clearItemFromCart({ payload: { itemId, token } }: any) {
    try {
        const cartData = yield call(clearItemFromCartApi, itemId, token);
        yield put(clearItemFromCartSuccess(cartData.newCart));
    } catch (error) {
        yield put(clearItemFromCartFailure(error.message));
    }
}

export function* clearAllCart({ payload: { token } }: any) {
    try {
        yield call(clearCartApi, token);
        yield put(clearCartSuccess());
    } catch (error) {
        yield put(clearCartFailure(error.message));
    }
}

export function* onFetchCartStart() {
    yield takeLatest(CartActionTypes.FETCH_CART_START, fetchCartAsync);
}

export function* onSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onAddToCartStart() {
    yield takeLatest(CartActionTypes.ADD_ITEM_START, addToCart);
}

export function* onRemoveFromCartStart() {
    yield takeLatest(CartActionTypes.REMOVE_ITEM_START, removeFromCart);
}

export function* onClearItemFromCartStart() {
    yield takeLatest(CartActionTypes.CLEAR_ITEM_START, clearItemFromCart);
}

export function* onClearCartStart() {
    yield takeLatest(CartActionTypes.CLEAR_CART_START, clearAllCart);
}

export function* cartSagas() {
    yield all([
        call(onFetchCartStart),
        call(onSignOutSuccess),
        call(onAddToCartStart),
        call(onRemoveFromCartStart),
        call(onClearItemFromCartStart),
        call(onClearCartStart),
    ]);
}
