import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Giá trị không phải là một email').required('Trường bắt buộc.'),
    password: Yup.string().required('Trường bắt buộc.'),
});
