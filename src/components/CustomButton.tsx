import React from 'react';

import styled, { css } from 'styled-components';

const CustomButton = ({ children, ...props }) => <CustomButtonContainer {...props}>{children}</CustomButtonContainer>;

const buttonStyles = css`
    background-color: #f1c40f;
    color: #fff;
    border: none;
    boder-radius: 0.25rem;

    &:hover {
        opacity: 0.9;
    }
`;

const googleSignInButtonStyles = css`
    background-color: #4285f4;
    color: white;
    border: none;

    &:hover {
        background-color: #357ae8;
        border: none;
    }
`;

const getButtonStyles = (props) => {
    if (props.isGoogleSignIn) {
        return googleSignInButtonStyles;
    }

    return buttonStyles;
};

const CustomButtonContainer = styled.button`
    min-width: 165px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 15px;
    display: flex;
    justify-content: center;
    ${getButtonStyles};
`;

export default CustomButton;
