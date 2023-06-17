import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import { updateFilter } from '../redux/products';
import { signOutStart } from '../redux/user/user.actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import CartIcon from './CartIcon';
import CartDropdown from './CartDropdown';
import { FaBuffer as Logo } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';

const isActive = (history, path) => {
    return history.location.pathname === path ? { color: '#f1c40f' } : { color: '#2c3e50' };
};

type Props = {
    history: any;
    user: any;
    changeFilter: () => void;
    hidden: boolean;
};

const Header = ({ history, user, hidden, changeFilter }: Props) => {
    const [searchText, setSearchText] = useState('');
    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo size={30} />
            </LogoContainer>
            <OptionsContainer>
                <>
                    <OptionLink to="/" style={isActive(history, '/')}>
                        Trang chủ
                    </OptionLink>
                    <OptionLink to="/products" style={isActive(history, '/products')}>
                        Sản phẩm
                    </OptionLink>
                    <OptionLink to="/about" style={isActive(history, '/about')}>
                        Giới thiệu
                    </OptionLink>
                    {user.userId ? (
                        <OptionLink to="/profile">
                            <FiUser size={20} />
                        </OptionLink>
                    ) : (
                        <OptionLink to="/login" style={isActive(history, '/login')}>
                            Đăng nhập
                        </OptionLink>
                    )}
                    <CartIcon />
                    {hidden ? null : <CartDropdown />}
                </>
                <SearchContainer>
                    <form>
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Search"
                            name="search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    history.push(`/products`);
                                    changeFilter();
                                }
                            }}
                        />
                    </form>
                </SearchContainer>
            </OptionsContainer>
        </HeaderContainer>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
    hidden: state.cart.hidden,
});

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(signOutStart()),
    changeFilter: (e) => dispatch(updateFilter(e.target.value)),
});

const HeaderContainer = styled.div`
    height: 65px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const LogoContainer = styled(Link)`
    width: 3rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    & img {
        width: 50px;
        height: 50px;
    }

    @media screen and (max-width: 768px) {
        width: 3.5rem;
    }
`;

const OptionsContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
`;

const OptionLink = styled(Link)`
    font-size: 0.95rem;
    margin: 0 1.25rem;
    cursor: pointer;
    &:hover {
        text-decoration: none;
    }

    @media screen and (max-width: 768px) {
        font-size: 0.775rem;
        padding: 0;
        margin: 0 1rem;
    }
`;

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;

    .search-input {
        border-radius: 0.2rem;
        border: 1px solid #bdc3c7;
        padding: 0.2rem 0.5rem 0.2rem 0.5rem;
    }
`;

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(Header);
