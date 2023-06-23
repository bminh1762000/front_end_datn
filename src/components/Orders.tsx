import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectTokenId } from '../redux/user/user.selectors';
import { selectOrders } from '../redux/order/order.selector';
import { fetchOrdersStart } from '../redux/order/order.actions';
import OrderItem from './OrderItem';

import './Order.scss';

const ROOT = 'orders';

const Orders = ({ orders, tokenId, fetchOrdersStart }) => {
    useEffect(() => {
        fetchOrdersStart(tokenId);
    }, []);

    return (
        <div className={ROOT}>
            <div className={`${ROOT}__header`}>Danh sách đơn hàng</div>
            <div className={`${ROOT}__body`}>
                {orders.map((order) => {
                    return <OrderItem key={order._id} order={order} />;
                })}
            </div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    tokenId: selectTokenId,
    orders: selectOrders,
});

const mapDispatchToProps = (dispatch) => ({
    fetchOrdersStart: (token) => dispatch(fetchOrdersStart(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
