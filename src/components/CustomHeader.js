import React from 'react';
import {Link} from "react-router-dom";

export const CustomHeader = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to='/'>Учет товаров</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to='/'>Главная</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={{pathname: '/add', state: {add: true}}}>Добавить</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={{pathname: '/generate', state: {add: true}}}>Сгенерировать</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};