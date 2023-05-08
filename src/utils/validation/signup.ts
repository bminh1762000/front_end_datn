import * as Yup from 'yup';

export const signupSchema = Yup.object().shape({
    email: Yup.string().email('Giá trị không phải là một email').required('Trường bắt buộc.'),
    displayName: Yup.string().required('Trường bắt buộc.').max(20, 'Giá trị quá dài'),
    password: Yup.string().required('Trường bắt buộc.').min(8, 'Giá trị quá ngắn'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng.')
        .required('Trường bắt buộc.'),
});
