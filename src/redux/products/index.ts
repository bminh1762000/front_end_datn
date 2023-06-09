export const ActionTypes = {
    FETCH_PRODUCTS_START: 'FETCH_PRODUCTS_START',
    FETCH_PRODUCTS_SUCCESS: 'FETCH_PRODUCTS_SUCCESS',
    FETCH_PRODUCTS_FAILURE: 'FETCH_PRODUCTS_FAILURE',
    GET_PRODUCT_DETAIL_START: 'GET_PRODUCT_DETAIL_START',
    GET_PRODUCT_DETAIL_SUCCESS: 'GET_PRODUCT_DETAIL_SUCCESS',
    GET_PRODUCT_DETAIL_FAILURE: 'GET_PRODUCT_DETAIL_FAILURE',
    UPDATE_FILTER: 'UPDATE_FILTER',
    CHANGE_PAGE: 'CHANGE_PAGE',
};

const INITIAL_STATE = {
    products: [],
    filter: {
        category: 'all',
        price: 'all',
        shipping: false,
        search: '',
        sort: 'asc',
    },
    page: 1,
    errorMessage: null,
    productDetail: null,
};

export const fetchProductsStart = () => ({
    type: ActionTypes.FETCH_PRODUCTS_START,
});

export const fetchProductsSuccess = (dirData) => ({
    type: ActionTypes.FETCH_PRODUCTS_SUCCESS,
    payload: dirData,
});

export const fetchProductsFailure = (errorMessage) => ({
    type: ActionTypes.FETCH_PRODUCTS_FAILURE,
    payload: errorMessage,
});

export const getProductDetailStart = () => ({
    type: ActionTypes.GET_PRODUCT_DETAIL_START,
});

export const getProductDetailSuccess = (dirData) => ({
    type: ActionTypes.GET_PRODUCT_DETAIL_SUCCESS,
    payload: dirData,
});

export const getProductDetailFailure = (errorMessage) => ({
    type: ActionTypes.GET_PRODUCT_DETAIL_FAILURE,
    payload: errorMessage,
});

export const updateFilter = (payload: { name: string; value: string }) => ({
    type: ActionTypes.UPDATE_FILTER,
    payload,
});

export const changePage = (payload: number) => ({
    type: ActionTypes.CHANGE_PAGE,
    payload,
});

const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_PRODUCTS_START:
            return {
                ...state,
                loading: true,
            };
        case ActionTypes.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                loading: false,
            };
        case ActionTypes.FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                loading: false,
            };
        case ActionTypes.UPDATE_FILTER:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.payload.name]: action.payload.value,
                },
            };
        case ActionTypes.CHANGE_PAGE:
            return {
                ...state,
                page: action.payload,
            };
        default:
            return state;
    }
};

export default productReducer;
