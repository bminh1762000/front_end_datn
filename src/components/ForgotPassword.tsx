import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { forgotPasswordApi, resetPasswordApi } from '../service/user';
import FormInput from './FormInput';

const EmailSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
});

const OTPSchema = Yup.object().shape({
    code: Yup.string().required('Mã xác nhận không được để trống'),
});

const ForgotPassword = ({ history }) => {
    const [step, setStep] = useState(1); // [1, 2, 3]

    const chooseSchemeValidate = () => {
        switch (step) {
            case 0:
                return EmailSchema;
            case 1:
                return OTPSchema;
        }
    };

    const formik = useFormik({
        validationSchema: chooseSchemeValidate(),
        initialValues: {
            email: '',
            code: '',
            password: '',
        },
        onSubmit: async (values) => {
            if (step === 0) {
                const res = await forgotPasswordApi(values.email ?? '');
                if (res.isSuccess) {
                    setStep(1);
                }
            }
            if (step === 1) {
                const res = await resetPasswordApi(values.password || '', values.code || '');
                if (res.error_code === 0) {
                    history.push('/login');
                }
            }
        },
    });

    const { values, errors, touched, handleChange, handleSubmit } = formik;

    return (
        <ForgotPasswordContainer>
            <div className="form-forgot-password">
                <h3 className="text-center mb-3">Đặt lại mật khẩu của bạn</h3>
                {step === 1 && (
                    <div className="d-flex flex-column align-items-center justify-content-center gap-15">
                        <FormInput
                            name="email"
                            type="email"
                            handleChange={handleChange('email')}
                            value={values.email}
                            isValid={!(!!errors.email && touched.email)}
                            error={errors.email}
                            label="Email"
                        />
                        <button
                            className="button border-0 btn-reset-password"
                            onClick={() => handleSubmit()}
                            type="button"
                        >
                            Gửi
                        </button>
                        <div className="back-to-login">
                            <FaArrowLeft />
                            <Link to="/login">Trở về trang đăng nhập</Link>
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div className="d-flex flex-column align-items-center justify-content-center gap-15">
                        <div>
                            <FormInput
                                name="code"
                                type="text"
                                handleChange={handleChange('code')}
                                value={values.code}
                                isValid={!(!!errors.code && touched.code)}
                                error={errors.code}
                                label="OPT"
                            />
                            <FormInput
                                name="password"
                                type="password"
                                handleChange={handleChange('password')}
                                value={values.password}
                                isValid={!(!!errors.password && touched.password)}
                                error={errors.password}
                                label="Email"
                            />
                        </div>

                        <button
                            className="button border-0 btn-reset-password"
                            onClick={() => handleSubmit()}
                            type="button"
                        >
                            Xác nhận
                        </button>
                        <div className="back-to-login">
                            <FaArrowLeft />
                            <Link to="/login">Trở về trang đăng nhập</Link>
                        </div>
                    </div>
                )}
            </div>
        </ForgotPasswordContainer>
    );
};

const ForgotPasswordContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 1rem;
    margin: 2rem 0 3rem 0;

    .form-forgot-password {
        max-width: 450px;

        .input-email {
            width: 100%;
            height: 40px;
            padding: 0 1rem;
            border-radius: 5px;
            border: 1px solid #dfe6e9;
        }

        .btn-reset-password {
            width: 100% !important;
            margin-top: 1rem;
            margin-bottom: 1rem;
            border-radius: 5px;
            height: 40px;
            color: #fff;
            background-color: #0984e3;
        }

        .back-to-login {
            a {
                display: inline-block;
                margin-left: 0.5rem;
                font-size: 0.925rem;
                color: #636e72;
            }
        }
    }
`;

export default ForgotPassword;
