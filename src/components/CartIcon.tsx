import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FiShoppingCart } from 'react-icons/fi';

import { toggleCartHidden } from '../redux/cart/cart.actions';
import { selectCartItemsCount } from '../redux/cart/cart.selectors';
import styled from 'styled-components';

const CartIcon = ({ toggleCartHidden, count }) => (
    <CartIconContainer onClick={toggleCartHidden}>
        <FiShoppingCart size={20} />
        {count > 0 && <ItemCountContainer>{count}</ItemCountContainer>}
    </CartIconContainer>
);

const CartIconContainer = styled.div`
    width: 45px;
    height: 45px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-right: 10px;
`;

const ItemCountContainer = styled.span`
    position: absolute;
    font-size: 12px;
    font-weight: bold;
    right: 1px;
    color: red;
    padding: 5px;
    top: -2px;
`;

const mapDispatchToProps = (dispatch) => ({
    toggleCartHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = createStructuredSelector({
    count: selectCartItemsCount,
});
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
