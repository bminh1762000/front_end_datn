import LoadingActionTypes from './loading.types';

export const loadingStart = () => ({
    type: LoadingActionTypes.LOADING_START,
});

export const loadingEnd = () => ({
    type: LoadingActionTypes.LOADING_END,
});
