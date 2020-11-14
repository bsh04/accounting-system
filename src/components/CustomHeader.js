import React from 'react';
import {Link} from "react-router-dom";

export const CustomHeader = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to='/'>Учет товаров</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to='/'>Главная<span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={{pathname: '/add', state: {add: true}}}>Добавить</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={{pathname: '/generate', state: {add: true}}}>Сгенерировать</Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Выйти</button>
                </form>
            </div>
        </nav>
    );
};