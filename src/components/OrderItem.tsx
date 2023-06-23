import React from 'react';

import './OrderItem.scss';

const ROOT = 'order-item';

const STATUS = {
    Pending: 'Đang chờ xử lý',
    Shipping: 'Đang giao hàng',
    Delivered: 'Đã giao hàng',
    Canceled: 'Đã hủy',
};

const OrderItem = ({ order }) => {
    const totalPrice = order.products
        .map(({ product, quantity }) => product.price * quantity)
        .reduce((a, b) => a + b, 0);
    const formatPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(totalPrice);

    return (
        <div className={ROOT}>
            <div className={`${ROOT}__header`}>
                <div className={`${ROOT}__header__title`}>Sản phẩm</div>
                <div className={`${ROOT}__header__title`}>Số tiền</div>
            </div>
            {order.products.map(({ product, quantity }) => {
                const price = product.price * quantity;
                const formatPrice = new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                }).format(price);

                return (
                    <div className={`${ROOT}__body`} key={product._id}>
                        <div className={`${ROOT}__body__title`}>{product.title}</div>
                        <div className={`${ROOT}__body__title total-price`}>{formatPrice}</div>
                    </div>
                );
            })}
            <div className={`${ROOT}__footer`}>
                <div className={`${ROOT}__footer__title mr-1`}>Địa chỉ:</div>
                <div className={`${ROOT}__footer__title`}>{order.address}</div>
            </div>
            <div className={`${ROOT}__footer`}>
                <div className={`${ROOT}__footer__title mr-1`}>Số điện thoại:</div>
                <div className={`${ROOT}__footer__title`}>0{order.phone}</div>
            </div>
            <div className={`${ROOT}__footer`}>
                <div className={`${ROOT}__footer__title mr-1`}>Email:</div>
                <div className={`${ROOT}__footer__title`}>{order.email}</div>
            </div>
            <div className={`${ROOT}__footer`}>
                <div className={`${ROOT}__footer__title mr-1`}>Tổng tiền:</div>
                <div className={`${ROOT}__footer__title total-price`}>{formatPrice}</div>
            </div>
            <div className={`${ROOT}__footer`}>
                <div className={`${ROOT}__footer__title mr-1`}>Trạng thái:</div>
                <div className={`${ROOT}__footer__title`}>{STATUS[order.status]}</div>
            </div>
        </div>
    );
};

export default OrderItem;
