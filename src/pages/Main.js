import React, {useEffect, useState} from 'react';
import '../index.scss'
import {Table} from "../components/table";
import {withMobileDialog} from "@material-ui/core";

export const Main = (props) => {

    const [products, setProducts] = useState([])

    useEffect(() => {

        let products = localStorage.getItem('products')

        if (products) {
            setProducts(JSON.parse(products))
        }

    }, [])


    return (
        <div className='main-container'>
            <h1>Таблица</h1>
            <div className='main-container__table'>
                {
                    products.length !== 0
                        ?
                        <Table items={products} history={props.history}/>
                        :
                        <p>В таблице пока что нет данных</p>
                }
                <button type="button" className="btn btn-success" onClick={() => props.history.push({pathname: '/add', state: {add: true}})}>Добавить продукт</button>
            </div>
        </div>
    );
};
