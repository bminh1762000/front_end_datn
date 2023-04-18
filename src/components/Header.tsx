import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { updateFilter } from '../redux/products';
import { signOutStart } from '../redux/user/user.actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import CartIcon from './CartIcon';
import { FaBuffer as Logo } from 'react-icons/fa';

const isActive = (history, path) => {
    return history.location.pathname === path ? { color: '#f1c40f' } : { color: '#2c3e50' };
};

type Props = {
    history: any;
    user: any;
    searchText: any;
    changeFilter: () => void;
    logOut: () => void;
};

const Header = ({ history, user, searchText, changeFilter, logOut }: Props) => {
    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo size={30} />
            </LogoContainer>
            <OptionsContainer>
                <>
                    <OptionLink to="/" style={isActive(history, '/')}>
                        Home
                    </OptionLink>
                    <OptionLink to="/about" style={isActive(history, '/about')}>
                        About
                    </OptionLink>
                    <OptionLink to="/products" style={isActive(history, '/products')}>
                        Products
                    </OptionLink>
                    {user.userId ? (
                        <OptionLink as="div" onClick={() => logOut()}>
                            Log out
                        </OptionLink>
                    ) : (
                        <OptionLink to="/login" style={isActive(history, '/login')}>
                            Log in
                        </OptionLink>
                    )}
                    <OptionLink to="/cart">
                        <CartIcon />
                    </OptionLink>
                </>
                <SearchContainer>
                    <form>
                        <input
                            type="text"
                            placeholder="Search"
                            name="search"
                            value={searchText}
                            onChange={changeFilter}
                        />
                    </form>
                </SearchContainer>
            </OptionsContainer>
        </HeaderContainer>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
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
`;

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(Header);
