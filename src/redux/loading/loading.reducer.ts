import LoadingActionTypes from './loading.types';

const INITIAL_STATE = {
    loading: false,
};

const loadingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LoadingActionTypes.LOADING_START:
            return {
                ...state,
                loading: true,
            };
        case LoadingActionTypes.LOADING_END:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default loadingReducer;
