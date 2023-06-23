import { takeLatest, put, call, all } from 'redux-saga/effects';

import {
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    signUpSuccess,
    signUpFailure,
    checkUserSessionSuccess,
    checkUserSessionFailure,
    getUserInfoFailure,
    getUserInfoSuccess,
    getUserInfoStart,
} from './user.actions';

import { fetchCartStart } from '../cart/cart.actions';

import { loginApi, signUpApi, getUserInfoApi } from '../../service/user';

import UserActionTypes from './user.types';
import { loadingEnd, loadingStart } from '../loading/loading.actions';

function* signWithEmailPassword({ payload: { email, password } }: any) {
    try {
        yield put(loadingStart());
        const response = yield call(loginApi, email, password);
        yield localStorage.setItem('token', response.token);
        yield localStorage.setItem('userId', response.userId);
        yield put(signInSuccess({ ...response }));
        yield put(getUserInfoStart(response.token));
        yield put(fetchCartStart(response.token));
    } catch (error) {
        yield put(signInFailure(error.response.data));
    } finally {
        yield put(loadingEnd());
    }
}

function* signOut() {
    try {
        yield put(loadingStart());
        yield localStorage.removeItem('token');
        yield localStorage.removeItem('userId');
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    } finally {
        yield put(loadingEnd());
    }
}

function* signUp({ payload: { email, password, displayName } }: any) {
    try {
        yield put(loadingStart());
        const response = yield call(signUpApi, email, password, displayName);
        yield put(signUpSuccess({ email: response.email, password: response.password }));
    } catch (error) {
        yield put(signUpFailure(error));
    } finally {
        yield put(loadingEnd());
    }
}

function* getUserInfo({ payload }: any) {
    try {
        yield put(loadingStart());
        const response = yield call(getUserInfoApi, payload);
        yield put(getUserInfoSuccess(response.user));
    } catch (error) {
        yield put(getUserInfoFailure(error));
    } finally {
        yield put(loadingEnd());
    }
}

function* isUserAuth() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) {
        yield put(checkUserSessionFailure());
    } else {
        yield put(checkUserSessionSuccess({ userId, token }));
        yield put(getUserInfoStart(token));
        yield put(fetchCartStart(token));
    }
}

function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signWithEmailPassword);
}

function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signWithEmailPassword);
}

function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION_START, isUserAuth);
}

function* onGetUserInfo() {
    yield takeLatest(UserActionTypes.GET_USER_INFO_START, getUserInfo);
}

export function* userSagas() {
    yield all([
        call(onEmailSignInStart),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onCheckUserSession),
        call(onGetUserInfo),
    ]);
}
