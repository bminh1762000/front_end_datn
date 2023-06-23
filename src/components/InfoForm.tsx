import React from 'react';
import { useFormik } from 'formik';
import FormInput from './FormInput';
import { connect } from 'react-redux';
import { updateUserInfoApi } from '../service/user';
import { loadingStart, loadingEnd } from '../redux/loading/loading.actions';

const ROOT = 'info-form';

const InfoForm = ({ userInfo, token, loadingStart, loadingEnd }) => {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: userInfo.name,
            email: userInfo.email,
        },
        onSubmit: async (values) => {
            loadingStart();
            await updateUserInfoApi(token, values.name).finally(() => {
                loadingEnd();
            });
        },
    });

    const { values, handleChange, handleSubmit } = formik;
    return (
        <div className={ROOT}>
            <h2>Thông tin tài khoản</h2>
            <FormInput
                label="Họ và tên"
                name="name"
                type="text"
                placeholder="Nhập họ và tên"
                value={values.name}
                handleChange={handleChange('name')}
                isValid={true}
            />
            <FormInput
                label="Email"
                name="email"
                type="email"
                placeholder="Nhập email"
                value={values.email}
                handleChange={handleChange('email')}
                isValid={true}
                disabled={true}
            />
            <button className="btn btn-primary" type="button" onClick={() => handleSubmit()}>
                Cập nhật
            </button>
        </div>
    );
};

const mapStateToProps = (state) => ({
    userInfo: state.user.info,
    token: state.user.token,
});

const mapDispatchToProps = (dispatch) => ({
    loadingStart: () => dispatch(loadingStart()),
    loadingEnd: () => dispatch(loadingEnd()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoForm);
