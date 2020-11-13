import React from 'react';
import '../index.scss'
import {Table} from "../components/table";
import {useSelector} from "react-redux";

export const Main = (props) => {

    return (
        <div className='main-container'>
            <h1>Таблица</h1>
            <div className='main-container__table'>
                <Table history={props.history}/>
                <button type="button" className="btn btn-success"
                        onClick={() => props.history.push({pathname: '/add', state: {add: true}})}>Добавить продукт
                </button>
            </div>
        </div>
    );
};
