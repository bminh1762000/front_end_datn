import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSessionStart } from './redux/user/user.actions';

import Header from './components/Header';
import { default as Spinners } from './components/Spinner';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import Loading from './components/Loading';

const HomePage = lazy(() => import('./pages/HomePage'));
const CheckoutPage = lazy(() => import('./pages/Checkout'));
const LoginPage = lazy(() => import('./pages/Login'));
const SignUpPage = lazy(() => import('./pages/SignUp'));
const ContactPage = lazy(() => import('./pages/Contact'));
const AboutPage = lazy(() => import('./pages/About'));
const ProductPage = lazy(() => import('./pages/Product'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPassword'));
const ProfilePage = lazy(() => import('./pages/Profile'));

import './App.scss';

const App = ({ currentUser, checkUserSession, loading }) => {
    useEffect(() => {
        checkUserSession();
    }, [checkUserSession]);

    return (
        <div className="App">
            {loading && <Loading />}
            <Header />
            <div className="main">
                <Suspense fallback={<Spinners />}>
                    <Switch>
                        <Route exact path="/" component={HomePage} />

                        <Route exact path="/contact" component={ContactPage} />
                        <PrivateRoute exact path="/checkout" isAuthenticated={currentUser} component={CheckoutPage} />
                        <Route exact path="/about" component={AboutPage} />
                        <Route path="/products" component={ProductPage} />
                        <Route exact path="/login" render={() => (currentUser ? <Redirect to="/" /> : <LoginPage />)} />
                        <PrivateRoute path="/profile" isAuthenticated={currentUser} component={ProfilePage} />
                        <Route exact path="/signup" component={SignUpPage} />
                        <Route exact path="/forgot-password" component={ForgotPasswordPage} />
                        <Route component={HomePage} />
                    </Switch>
                </Suspense>
            </div>
            <Footer />
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    loading: (state) => state.loading.loading,
});

const mapDispatchToProps = (dispatch) => ({
    checkUserSession: () => dispatch(checkUserSessionStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
