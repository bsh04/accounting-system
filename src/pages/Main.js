import React from 'react';
import '../index.scss'
import {CustomTable} from "../components/CustomTable";
import {useSelector} from "react-redux";

export const Main = (props) => {

    return (
        <div className='main-container'>
            <h1>Таблица</h1>
            <div className='main-container__table'>
                <CustomTable history={props.history}/>
                <button type="button" className="btn btn-success mt-4"
                        onClick={() => props.history.push({pathname: '/add', state: {add: true}})}>Добавить продукт
                </button>
            </div>
        </div>
    );
};
