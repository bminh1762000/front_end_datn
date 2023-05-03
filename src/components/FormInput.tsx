import React from 'react';
import styled from 'styled-components';

type Props = {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    placeholder?: string;
    isValid?: boolean;
    error?: string;
    isRequired?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormInput = ({ handleChange, label, placeholder, ...props }: Props) => (
    <GroupContainer>
        <FormInputLabel className="input-label">
            {label} {props.isRequired && <span className="required">*</span>}
        </FormInputLabel>
        <FormInputContainer
            onChange={handleChange}
            {...props}
            className={props.isValid ? '' : 'noValid'}
            placeholder={placeholder || label || ''}
        />
        {!props.isValid && props.error && <div className="text-danger">{props.error}</div>}
    </GroupContainer>
);

const subColor = 'grey';

const GroupContainer = styled.div`
    margin: 15px 0;
    .text-danger {
        margin-top: 5px;
    }
`;

const FormInputContainer = styled.input`
    background: transparent;
    color: ${subColor};
    height: 40px;
    padding: 10px 10px 10px 5px;
    display: inline-block;
    width: 100%;
    border-radius: 0.25rem;
    border: 1px solid ${subColor};

    &.noValid {
        border: 1px solid #ed4c67;
    }
`;

const FormInputLabel = styled.label`
    color: ${subColor};
    font-size: 16px;

    .required {
        color: red;
    }
`;

export default FormInput;
