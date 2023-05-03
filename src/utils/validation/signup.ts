import * as Yup from 'yup';

export const signupSchema = Yup.object().shape({
    email: Yup.string().email('This field is not a email').required('The field is required.'),
    displayName: Yup.string().required('The field is required.').max(20, 'The field is too long.'),
    password: Yup.string().required('The field is required.').min(8, 'The field is too short.'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('The field is required.'),
});
