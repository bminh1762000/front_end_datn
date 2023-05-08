import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';

import { paginate } from '../utils/product';
import ProductItem from './ProductItem';
import Pagination from './Pagination';
import Filter from './Filter';

import styled from 'styled-components';
import { changePage, fetchProductsStart } from '../redux/products';

const ProductList = ({ loading, page, lastPage, products, changePage, fetchProductsStart }) => {
    const [newProduct, setNewProduct] = useState([]);

    useEffect(() => {
        fetchProductsStart();
    }, []);

    useEffect(() => {
        if (products.length === 0) return;
        const newProduct = paginate(products, page);
        setNewProduct(newProduct);
    }, [products]);

    if (loading) {
        return <h1>Loading ....</h1>;
    }
    return (
        <ProductListContainer>
            <Filter />

            <ListContainer>
                <div className="list-item">
                    {newProduct.length > 0 ? (
                        newProduct.map((product) => {
                            return <ProductItem key={product._id} product={product} />;
                        })
                    ) : (
                        <p>No products</p>
                    )}
                </div>
                <Pagination page={page} lastPage={lastPage} changePage={changePage} />
            </ListContainer>
        </ProductListContainer>
    );
};

const ProductListContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
`;

const ListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .list-item {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
`;

const mapStateToProps = (state) => {
    return {
        loading: state.product.loading,
        page: state.product.page,
        products: state.product.products,
        lastPage: state.product.lastPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProductsStart: () => dispatch(fetchProductsStart()),
        changePage: (page) => dispatch(changePage(page)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
