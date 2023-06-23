import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectorCartItems, selectCartTotal } from '../redux/cart/cart.selectors';
import CheckoutItem from '../components/CheckoutItem';

import styled from 'styled-components';
import { formatPrice } from '../utils/product';
import Button from '../components/Button';

const CheckoutPage = ({ cartItems, total, history }) => (
    <CheckoutPageContainer>
        <CheckoutHeaderContainer>
            <HeaderBlockContainer>
                <span>Sản phẩm</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Mô tả</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Số lượng</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Giá</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Xoá</span>
            </HeaderBlockContainer>
        </CheckoutHeaderContainer>
        {cartItems.map((cartItem) => (
            <CheckoutItem key={cartItem._id} cartItem={cartItem} />
        ))}
        <TotalSection>Tổng tiền: {formatPrice(total)}</TotalSection>
        <Button onClick={() => history.push('/place-order')} className="btn-checkout">
            <span>Thanh toán</span>
        </Button>
    </CheckoutPageContainer>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectorCartItems,
    total: selectCartTotal,
});

const CheckoutPageContainer = styled.div`
    width: 55%;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px auto 0;

    @media screen and (max-width: 800px) {
        width: 90%;
    }

    .btn-checkout {
        margin-left: auto;
    }
`;

const CheckoutHeaderContainer = styled.div`
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid darkgrey;
`;

const HeaderBlockContainer = styled.div`
    text-transform: capitalize;
    width: 22%;
    padding: 0 10px;

    &:last-child {
        width: 7%;
    }

    @media screen and (max-width: 800px) {
        width: 20%;
        padding: 0;

        &:last-child {
            width: 12%;
        }
    }
`;

const TotalSection = styled.div`
    margin-top: 30px;
    margin-left: auto;
    font-size: 16px;
`;

export default connect(mapStateToProps)(CheckoutPage);
