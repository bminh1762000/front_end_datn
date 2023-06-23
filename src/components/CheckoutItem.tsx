import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { removeItemStart, addItemStart, clearItemFromCartStart } from '../redux/cart/cart.actions';
import { selectTokenId } from '../redux/user/user.selectors';
import styled from 'styled-components';

const CheckoutItem = ({ cartItem, removeItem, addItem, clearItem, token }) => {
    const {
        product: { imageUrl, title, price, _id },
        quantity,
    } = cartItem;
    const priceItem = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    return (
        <CheckoutItemContainer>
            <ItemImageContainer>
                <img src={imageUrl} alt="items" />
            </ItemImageContainer>
            <TextContainer>{title}</TextContainer>
            <QuantityContainer>
                <div onClick={() => removeItem({ itemId: _id, token })}>&#10094;</div>
                <span>{quantity}</span>
                <div onClick={() => addItem({ itemId: _id, token })}>&#10095;</div>
            </QuantityContainer>
            <TextContainer>{priceItem}</TextContainer>
            <RemoveButtonContainer onClick={() => clearItem({ itemId: _id, token })}>&#10005;</RemoveButtonContainer>
        </CheckoutItemContainer>
    );
};

const CheckoutItemContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid grey;
    font-size: 15px;
`;

const ItemImageContainer = styled.div`
    flex: 0 0 22%;
    padding-right: 20px;

    img {
        width: 100%;
        height: 100%;
    }
`;

const TextContainer = styled.span`
    flex: 0 0 22%;
`;

const QuantityContainer = styled(TextContainer)`
    display: flex;
    flex: 0 0 22%;
    span {
        margin: 0 10px;
    }

    div {
        cursor: pointer;
    }
`;

const RemoveButtonContainer = styled.div`
    flex: 0 0 5%;
    padding-left: 12px;
    cursor: pointer;
`;

const mapStateToProps = createStructuredSelector({
    token: selectTokenId,
});

const mapDispatchToProps = (dispatch) => ({
    removeItem: (item) => dispatch(removeItemStart(item)),
    addItem: (item) => dispatch(addItemStart(item)),
    clearItem: (item) => dispatch(clearItemFromCartStart(item)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItem);
