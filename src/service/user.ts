import { callHttpClientMethod } from '.';

import { HTTP_METHOD } from '../constants';

const loginApi = async (email: string, password: string) => {
    return callHttpClientMethod('/api/auth/login', HTTP_METHOD.post, {
        email,
        password,
    });
};

const signUpApi = async (email: string, password: string, name: string) => {
    return callHttpClientMethod('/api/auth/signup', HTTP_METHOD.post, {
        email,
        password,
        name,
    });
};

const getUserInfoApi = async (token) => {
    return callHttpClientMethod('/api/users/get-info', HTTP_METHOD.get, null, {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });
};

const forgotPasswordApi = async (email: string) => {
    return callHttpClientMethod('/api/auth/forgot-password', HTTP_METHOD.post, {
        email,
    });
};

const resetPasswordApi = async (password: string, otp: string) => {
    return callHttpClientMethod('/api/auth/reset-password', HTTP_METHOD.post, {
        password,
        otp,
    });
};

const updateUserInfoApi = async (token: string, name: any) => {
    return callHttpClientMethod(
        '/api/users/update-info',
        HTTP_METHOD.post,
        { name: name },
        {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }
    );
};

export { loginApi, signUpApi, getUserInfoApi, forgotPasswordApi, resetPasswordApi, updateUserInfoApi };
