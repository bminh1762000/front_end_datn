import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';

import { paginate } from '../utils/product';
import ProductItem from './ProductItem';
import Pagination from './Pagination';
import Filter from './Filter';

import styled from 'styled-components';
import { changePage, fetchProductsStart } from '../redux/products';

const ProductList = ({ loading, page, lastPage, products, filter, changePage, fetchProductsStart }) => {
    const [newProduct, setNewProduct] = useState([]);
    const [_lastPage, _setLastPage] = useState(lastPage);

    const filterProducts = (products, filter, page) => {
        let newProducts = products.slice();
        const { category, price, shipping, search, sort } = filter;
        if (category !== 'all') {
            newProducts = newProducts.filter((p) => p.category === category);
        }
        if (shipping) {
            newProducts = newProducts.filter((p) => p.ship === shipping);
        }
        if (price !== 'all') {
            newProducts = newProducts.filter((p) => {
                if (Number(price) === 0) {
                    return Number(p.price) < 15000000 && Number(p.price) >= 10000000;
                } else if (Number(price) === 15000000) {
                    return Number(p.price) < 20000000 && Number(p.price) >= 15000000;
                } else {
                    return Number(p.price) >= 20000000;
                }
            });
        }
        if (search !== '') {
            newProducts = newProducts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
        }
        if (sort === 'asc') {
            newProducts = newProducts.sort((a, b) => Number(a.price) - Number(b.price));
        }
        if (sort === 'desc') {
            newProducts = newProducts.sort((a, b) => Number(b.price) - Number(a.price));
        }
        const newProduct = paginate(newProducts, page);
        return { newProduct, newProducts };
    };

    useEffect(() => {
        fetchProductsStart();
    }, []);

    useEffect(() => {
        if (products.length === 0) return;
        const { newProduct } = filterProducts(products, filter, page);
        setNewProduct(newProduct);
    }, [page, products.length]);

    useEffect(() => {
        if (products.length === 0) return;
        const { newProduct, newProducts } = filterProducts(products, filter, 1);
        changePage(1);
        _setLastPage(Math.ceil(newProducts.length / 4));
        setNewProduct(newProduct);
    }, [filter, products.length]);

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
                <Pagination page={page} lastPage={_lastPage} changePage={changePage} />
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
        lastPage: Math.ceil(state.product.products?.length / 4),
        filter: state.product.filter,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProductsStart: () => dispatch(fetchProductsStart()),
        changePage: (page) => dispatch(changePage(page)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
