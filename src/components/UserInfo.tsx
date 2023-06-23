import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signOutStart } from '../redux/user/user.actions';
import Orders from './Orders';
import InfoForm from './InfoForm';

import './UserInfo.scss';

const ROOT = 'user-info';

const UserInfo = () => {
    const [tab, setTab] = useState('info');
    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(signOutStart());
    };

    const tabConfig = [
        {
            id: 'info',
            title: 'Thông tin tài khoản',
            content: <InfoForm />,
            action: () => setTab('info'),
        },
        {
            id: 'order',
            title: 'Đơn hàng',
            content: <Orders />,
            action: () => setTab('order'),
        },
        {
            id: 'logout',
            title: 'Đăng xuất',
            action: () => logOut(),
        },
    ];

    const renderTab = () => {
        return tabConfig.map((item) => {
            return (
                <button
                    onClick={item.action}
                    key={item.id}
                    className={`${ROOT}__btn-tab ${tab === item.id ? ' active' : ''}`}
                    type="button"
                >
                    {item.title}
                </button>
            );
        });
    };

    const renderTabContent = () => {
        return tabConfig.map((item) => {
            return tab == item.id ? <div key={item.id}>{item.content} </div> : null;
        });
    };

    return (
        <main>
            <section className={ROOT}>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className={`${ROOT}__sidebar`}>{renderTab()}</div>
                        </div>
                        <div className="col-lg-8">{renderTabContent()}</div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default UserInfo;
