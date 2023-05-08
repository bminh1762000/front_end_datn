import React from 'react';
import { useDispatch } from 'react-redux';
import { signOutStart } from '../redux/user/user.actions';

const UserInfo = () => {
    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(signOutStart());
    };
    //   const profile = useSelector((state: StateType) => state.auth.user);
    //   const logOut = () => {
    //     dispatch({
    //       type: "@saga/Logout",
    //       payload: {
    //         logoutSuccess: (status: boolean) => {
    //           if (status) navigate("/login");
    //         },
    //       },
    //     });
    //   };
    return (
        <main>
            <section className="view_profile">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <img
                                        src={'https://bootdey.com/img/Content/avatar/avatar7.png'}
                                        alt="avatar"
                                        className="rounded-circle img-fluid avatar"
                                    />
                                    <h5 className="my-3">{`Minh VB`}</h5>
                                    <p className="text-muted mb-1">Full Stack Developer</p>
                                    <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                                    <div className="d-flex justify-content-center mb-2 ">
                                        <button
                                            type="button"
                                            className="btn btn-primary ms-1 btn-logout"
                                            onClick={logOut}
                                        >
                                            Log out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Full Name</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{`Minh VB`}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Email</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{`tunho176@gmail.com`}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Phone</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">(097) 234-5678</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Mobile</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">(098) 765-4321</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Address</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">Bay Area, San Francisco, CA</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default UserInfo;
