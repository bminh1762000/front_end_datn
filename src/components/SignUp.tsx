import React from 'react';
import { connect } from 'react-redux';

import FormInput from './FormInput';
import CustomButton from './CustomButton';

import { signUpStart } from '../redux/user/user.actions';
import styled from 'styled-components';
import { useFormik } from 'formik';
import { signupSchema } from '../utils/validation/signup';

const SignUp = ({ signUpStart }) => {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: signupSchema,
        onSubmit: async (values) => {
            await signUpStart({
                email: values.email,
                password: values.password,
                displayName: values.displayName,
            });
        },
    });

    const { errors, values, submitForm, setValues, touched } = formik;
    const handleSubmit = async (event) => {
        event.preventDefault();
        submitForm();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setValues({ ...values, [name]: value });
    };

    return (
        <SignUpContainer>
            <h2>Tôi chưa có tài khoản</h2>
            <span>Đăng ký tài khoản với email và mật khẩu</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name="displayName"
                    value={values.displayName}
                    handleChange={handleInputChange}
                    label="Tên hiển thị"
                    isValid={!(!!errors.displayName && touched.displayName)}
                    error={errors.displayName}
                    isRequired={true}
                />
                <FormInput
                    type="email"
                    name="email"
                    value={values.email}
                    handleChange={handleInputChange}
                    label="Email"
                    isValid={!(!!errors.email && touched.email)}
                    error={errors.email}
                    isRequired={true}
                />
                <FormInput
                    type="password"
                    name="password"
                    value={values.password}
                    handleChange={handleInputChange}
                    label="Mật khẩu"
                    isValid={!(!!errors.password && touched.password)}
                    error={errors.password}
                    isRequired={true}
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    handleChange={handleInputChange}
                    label="Mật khẩu xác nhận"
                    isValid={!(!!errors.confirmPassword && touched.confirmPassword)}
                    error={errors.confirmPassword}
                    isRequired={true}
                />
                <CustomButton type="submit" className="btn-signup">
                    Đăng ký
                </CustomButton>
            </form>
        </SignUpContainer>
    );
};

const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    h2 {
        margin: 10px 0;
    }

    .btn-signup {
        width: 100%;
        border-radius: 0.25rem;
        margin-top: 25px;
    }
`;

const mapDispatchToProps = (dispatch) => ({
    signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
