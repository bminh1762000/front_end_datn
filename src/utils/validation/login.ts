import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string().email('This field is not a email').required('The field is required.'),
    password: Yup.string().required('The field is required.'),
});
