import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';
import productReducer from './products';
import loadingReducer from './loading/loading.reducer';
import orderReducer from './order/order.reducer';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['cart'],
};

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer,
    product: productReducer,
    loading: loadingReducer,
    order: orderReducer,
});

export default persistReducer(persistConfig, rootReducer);
