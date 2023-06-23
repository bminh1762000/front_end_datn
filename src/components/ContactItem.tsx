import React from 'react';

import FormInput from './FormInput';
import Button from './Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import styled from 'styled-components';

const ContactItem = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
        onSubmit: (values) => {
            if (!values) {
                return;
            }
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            subject: Yup.string().required('Required'),
        }),
    });

    const { values, errors, touched, handleChange, handleSubmit } = formik;

    return (
        <ContactFormContainer>
            <h1>Liên hệ với chúng tôi</h1>
            <form>
                <FormInput
                    name="name"
                    type="text"
                    handleChange={handleChange('name')}
                    value={values.name}
                    label="Tên"
                    isValid={!(!!errors.name && touched.name)}
                />
                <FormInput
                    name="email"
                    type="email"
                    handleChange={handleChange('email')}
                    value={values.email}
                    label="Email"
                    isValid={!(!!errors.email && touched.email)}
                />
                <FormInput
                    name="subject"
                    type="text"
                    handleChange={handleChange('subject')}
                    value={values.subject}
                    label="Tiêu đề"
                    isValid={!(!!errors.subject && touched.subject)}
                />
                <MessageContainer>
                    <label htmlFor="message">Nội dung</label>
                    <textarea name="message" value={values.message} onChange={handleChange('message')} rows={5} />
                </MessageContainer>
                <ButtonSubmitContainer>
                    <Button type="button" onClick={handleSubmit}>
                        Send Email
                    </Button>
                </ButtonSubmitContainer>
            </form>
        </ContactFormContainer>
    );
};

const ContactFormContainer = styled.div`
    width: 450px;
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 35px;
        margin: 5px 0;
    }

    p {
        font-size: 20px;
    }
`;

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    label {
        margin-bottom: 10px;
    }
`;

const ButtonSubmitContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export default ContactItem;
