import React, { useEffect, useState } from 'react';

import Button from './Button';

import styled from 'styled-components';
import { getProductDetailApi } from '../service/product';
import { formatPrice } from '../utils/product';
import { addItemStart } from '../redux/cart/cart.actions';
import { connect } from 'react-redux';
import { loadingStart, loadingEnd } from '../redux/loading/loading.actions';

const ProductDetail = ({ match, history, addToCart, user, loadingStart, loadingEnd }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const productId = match.params.productId;
        loadingStart();
        getProductDetailApi(productId)
            .then((resData) => {
                setProduct(resData.product);
            })
            .finally(() => {
                loadingEnd();
            });
    }, []);

    if (!product) {
        return null;
    }

    return (
        <ProductDetailContainer>
            <img src={product?.imageUrl} alt="Image Products" />
            <DescriptionContainer>
                <h1 className="title">{product.title}</h1>
                <p className="price">{formatPrice(Number(product.price))}</p>
                <p className="description">
                    {product.description ||
                        `Tofu hoodie pop-up try-hard vice cornhole gluten-free keytar mlkshk
          8-bit small batch four loko letterpress. Yr cornhole hoodie tote bag
          wayfarers mustache mumblecore crucifix hell of single-origin coffee
          pinterest. Readymade la croix activated charcoal cray edison bulb.
          Woke marfa helvetica hashtag green juice keffiyeh street art locavore
          four loko brunch flexitarian. Wayfarers fanny pack pork belly
          semiotics VHS affogato mixtape tumblr glossier jianbing freegan
          kinfolk pug. Intelligentsia pug 8-bit microdosing salvia locavore 90's
          umami gastropub iceland church-key marfa readymade 3 wolf moon
          keffiyeh. Tofu seitan mlkshk, try-hard cray hella PBR&B kale chips
          bushwick umami salvia knausgaard four loko pork belly semiotics.`}
                </p>
                <Button onClick={() => (user.userId ? addToCart(product._id, user.token) : history.push('/login'))}>
                    Thêm vào giỏ hàng
                </Button>
            </DescriptionContainer>
        </ProductDetailContainer>
    );
};

const ProductDetailContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4rem;

    img {
        min-width: 22rem;
        max-width: 30rem;
        height: 100%;
    }
`;

const DescriptionContainer = styled.div`
    width: 70%;
    margin-left: 5rem;
    text-align: left;

    .title {
        margin: 2rem 0;
    }

    .price {
        font-size: 1.6rem;
        color: #e17055;
    }
    .description {
        line-height: 1.8;
        font-size: 1.1rem;
    }
`;

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    addToCart: (itemId, token) => dispatch(addItemStart({ itemId, token })),
    loadingStart: () => dispatch(loadingStart()),
    loadingEnd: () => dispatch(loadingEnd()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
