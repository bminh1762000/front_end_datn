import React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { formatPrice } from '../utils/product';
import { updateFilter } from '../redux/products';

type Props = {
    filters: {
        price: string | number;
        category: string;
        shipping: boolean;
        sort: string;
    };
    changeFilter: () => void;
};

const Filter = (props: Props) => {
    const {
        filters: { price, category, shipping, sort },
        changeFilter,
    } = props;
    return (
        <SectionContainer>
            <FilterForm>
                <div className="form-group">
                    <label htmlFor="category">Hãng</label>
                    <select
                        className="form-control"
                        name="category"
                        id="category"
                        onChange={changeFilter}
                        value={category}
                    >
                        <option value="all">All</option>
                        <option value="hp">HP</option>
                        <option value="lenovo">Lenovo</option>
                        <option value="dell">Dell</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Sắp xếp</label>
                    <select className="form-control" name="sort" id="sort" onChange={changeFilter} value={sort}>
                        <option value="asc">Tăng dần</option>
                        <option value="desc">Giảm dần</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="checkbox" name="shipping" id="shipping" checked={shipping} onChange={changeFilter} />
                    <label htmlFor="shipping">Free ship</label>
                </div>
                <PriceGroup>
                    <p>Price</p>
                    <label>
                        <input
                            type="radio"
                            name="price"
                            id="all"
                            value="all"
                            checked={price === 'all'}
                            onChange={changeFilter}
                        />
                        All
                    </label>
                    <label>
                        <input type="radio" name="price" value="0" checked={price === 0} onChange={changeFilter} />
                        {`${formatPrice(1000000)} - ${formatPrice(15000000)}`}
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="price"
                            value="15000000"
                            checked={price === 15000000}
                            onChange={changeFilter}
                        />
                        {`${formatPrice(15000000)} - ${formatPrice(20000000)}`}
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="price"
                            value="20000000"
                            checked={price === 20000000}
                            onChange={changeFilter}
                        />
                        {`${formatPrice(20000000)} trở lên`}
                    </label>
                </PriceGroup>
            </FilterForm>
        </SectionContainer>
    );
};

const SectionContainer = styled.section`
    width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 1rem;
    margin: 2rem 0 3rem 0;
`;

const FilterForm = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;

    .form-group {
        width: 100%;
    }

    input {
        display: inline-block;
        margin-right: 1rem;
    }
`;

const PriceGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const mapStateToProps = (state) => {
    return {
        filters: state.product.filter,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeFilter: (e) => {
            let filterValue;
            const { name, value, type } = e.target;
            if (type === 'checkbox') {
                filterValue = e.target.checked;
            } else if (type === 'radio') {
                filterValue = value === 'all' ? value : parseInt(value);
            } else {
                filterValue = value;
            }
            dispatch(updateFilter({ name, value: filterValue }));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
