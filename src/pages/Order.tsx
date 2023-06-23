import React from 'react';
import styled from 'styled-components';

import OrderForm from '../components/OrderForm';

const Order = ({ history }) => {
    return (
        <OrderContainer>
            <OrderForm history={history} />
        </OrderContainer>
    );
};

export default Order;

const OrderContainer = styled.div`
    width: 100%;
`;
