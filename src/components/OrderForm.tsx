import React from 'react';
import { useFormik } from 'formik';
import FormInput from './FormInput';
import { selectorCartItems } from '../redux/cart/cart.selectors';
import { selectTokenId } from '../redux/user/user.selectors';
import CustomButton from './CustomButton';
import { createOrderStart } from '../redux/order/order.actions';
import { OrderSchema } from '../utils/validation/order';

import './OrderForm.scss';
import { connect } from 'react-redux';
import { formatPrice } from '../utils/product';

const OrderForm = ({ cartItems, createOrder, history, tokenId }) => {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            address: '',
            phone: '',
            email: '',
        },
        validationSchema: OrderSchema,
        onSubmit: async (values) => {
            await createOrder({ products: cartItems, ...values }, tokenId);
            history.push('/orders');
        },
    });

    const { errors, values, submitForm, setValues, touched } = formik;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = () => {
        submitForm();
    };

    const totalPrice = cartItems.reduce((acc, cartItem) => {
        return acc + cartItem.product.price * cartItem.quantity;
    }, 0);

    return (
        <div className={`checkout_area section-padding-80`}>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="checkout_details_area mt-50 clearfix">
                            <div className="cart-page-heading mb-30">
                                <h5>Địa chỉ giao hàng</h5>
                            </div>

                            <div>
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <FormInput
                                            name="name"
                                            type="text"
                                            value={values.name}
                                            handleChange={handleChange}
                                            label="Tên"
                                            isRequired
                                            isValid={!(!!errors.name && touched.name)}
                                            error={errors.name}
                                        />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <FormInput
                                            name="address"
                                            type="text"
                                            value={values.address}
                                            handleChange={handleChange}
                                            label="Địa chỉ"
                                            isRequired
                                            isValid={!(!!errors.address && touched.address)}
                                            error={errors.address}
                                        />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <FormInput
                                            name="phone"
                                            type="text"
                                            value={values.phone}
                                            handleChange={handleChange}
                                            label="Số điện thoại"
                                            isRequired
                                            isValid={!(!!errors.phone && touched.phone)}
                                            error={errors.phone}
                                        />
                                    </div>
                                    <div className="col-12 mb-4">
                                        <FormInput
                                            name="email"
                                            type="email"
                                            value={values.email}
                                            handleChange={handleChange}
                                            label="Email"
                                            isRequired
                                            isValid={!(!!errors.email && touched.email)}
                                            error={errors.email}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-5 ml-lg-auto">
                        <div className="order-details-confirmation">
                            <div className="cart-page-heading">
                                <h5>Đơn hàng của bạn</h5>
                            </div>

                            <ul className="order-details-form mb-4">
                                <li>
                                    <span>Sản phẩm</span> <span>Số tiền</span>
                                </li>
                                {cartItems.map((cartItem) => {
                                    const price = cartItem.product.price * cartItem.quantity;
                                    const formattedPrice = formatPrice(price);

                                    return (
                                        <li key={cartItem._id}>
                                            <span>{cartItem.product.title}</span> <span>{formattedPrice}</span>
                                        </li>
                                    );
                                })}
                                <li>
                                    <span>Tổng cộng</span> <span>{formatPrice(totalPrice)}</span>
                                </li>
                            </ul>

                            <CustomButton className="btn essence-btn" type="button" onClick={handleSubmit}>
                                Đặt hàng
                            </CustomButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        cartItems: selectorCartItems(state),
        tokenId: selectTokenId(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    createOrder: (order, token) => dispatch(createOrderStart({ order, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
