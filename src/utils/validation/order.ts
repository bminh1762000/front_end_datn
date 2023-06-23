import * as Yup from 'yup';

export const OrderSchema = Yup.object().shape({
    name: Yup.string().required('Trường bắt buộc.'),
    address: Yup.string().required('Trường bắt buộc.'),
    phone: Yup.string().required('Trường bắt buộc.'),
    email: Yup.string().email('Invalid email address').required('Trường bắt buộc.'),
});
