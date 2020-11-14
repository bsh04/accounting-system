import React from 'react';
import {CustomTable} from "../components/CustomTable";
import '../index.scss'

const Main = (props) => {
    return (
        <div className='main-container'>
            <h1>Таблица</h1>
            <div className='main-container__table'>
                <CustomTable history={props.history}/>
                <button type="button" className="btn btn-success mt-4"
                        onClick={() => props.history.push({pathname: '/add', state: {add: true}})}>Добавить товар
                </button>
            </div>
        </div>
    );
};

export default Main
