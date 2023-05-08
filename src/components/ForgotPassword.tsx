import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
    return (
        <ForgotPasswordContainer>
            <div className="form-forgot-password">
                <h3 className="text-center mb-3">Đặt lại mật khẩu của bạn</h3>
                <p className="text-center mt-2 mb-3">Chúng tôi sẽ gửi cho bạn một email để đặt lại mật khẩu của bạn</p>
                <div className="d-flex flex-column align-items-center justify-content-center gap-15">
                    <input type="email" name="email" placeholder="Email" className="input-email" />
                    <button className="button border-0 btn-reset-password">Gửi</button>
                    <div className="back-to-login">
                        <FaArrowLeft />
                        <Link to="/login">Trở về trang đăng nhập</Link>
                    </div>
                </div>
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
