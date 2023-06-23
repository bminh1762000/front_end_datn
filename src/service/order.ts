import { callHttpClientMethod } from '.';

import { HTTP_METHOD } from '../constants';

const getOrdersApi = async (token: string) => {
    return callHttpClientMethod('/api/orders/', HTTP_METHOD.get, null, {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });
};

const createOrderApi = async (orderInfo: any, token: string) => {
    return callHttpClientMethod('/api/orders/', HTTP_METHOD.post, orderInfo, {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });
};

export { getOrdersApi, createOrderApi };
