import React from 'react';
import { connect } from 'react-redux';

import FormInput from './FormInput';
import CustomButton from './CustomButton';

import { emailSignInStart } from '../redux/user/user.actions';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchema } from '../utils/validation/login';

const SignIn = ({ emailSignInStart }) => {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            emailSignInStart({ email: values.email, password: values.password });
        },
    });

    const { errors, values, submitForm, setValues, touched } = formik;

    const handleSubmit = () => {
        submitForm();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <SignInContainer>
            <h2>I already have an account</h2>

            <div className="form-login">
                <FormInput
                    name="email"
                    type="email"
                    value={values.email}
                    handleChange={handleChange}
                    label="Email"
                    isValid={!(!!errors.email && touched.email)}
                    error={errors.email}
                />
                <FormInput
                    name="password"
                    type="password"
                    value={values.password}
                    handleChange={handleChange}
                    label="Password"
                    isValid={!(!!errors.password && touched.password)}
                    error={errors.password}
                />
                <div className="forgot-password">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
                <ButtonsContainer>
                    <CustomButton type="button" onClick={handleSubmit}>
                        Sign in
                    </CustomButton>
                </ButtonsContainer>
                <div className="section-signup">
                    <span>{`Don't have an account yet? `}</span>
                    <Link to="/signup" className="signup">
                        Sign up
                    </Link>
                </div>
            </div>
        </SignInContainer>
    );
};

const SignInContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    .form-login {
        width: 100%;
        .forgot-password {
            margin-bottom: 20px;
        }
    }

    h2 {
        margin: 10px 0;
    }

    .section-signup {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 20px;
        .signup {
            margin-left: 5px;
            color: #4285f4;
        }
    }
`;

const ButtonsContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;

    button {
        width: 100%;
        border-radius: 0.2rem;
    }
`;

const mapDispatchToProps = (dispatch) => ({
    emailSignInStart: (emailAndPassword) => dispatch(emailSignInStart(emailAndPassword)),
});

export default connect(null, mapDispatchToProps)(SignIn);
