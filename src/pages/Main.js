import React, {useEffect, useState} from 'react';
import {CustomTable} from "../components/CustomTable";
import AddIcon from '@material-ui/icons/Add';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import {exportToCSV} from "../tools/CSVExport";
import {useSelector} from "react-redux";
import '../index.scss'

const Main = (props) => {

    // Это всё для экспорта данных
    const store = useSelector(state => state.products)
    const [products, setProducts] = useState(store.products)

    useEffect(() => {
        setProducts(store.products)
    }, [store])

    return (
        <div className='main-container'>
            <h1>Таблица</h1>
            <div className='main-container__table'>
                <CustomTable history={props.history}/>
                <div className='d-flex justify-content-between'>
                    <button type="button" className="btn btn-success mt-4"
                            onClick={() => props.history.push({pathname: '/add', state: {add: true}})}><AddIcon
                        className='mr-2'/>Добавить товар
                    </button>
                    {
                        products.length !== 0
                        &&
                        <button type="button" className="btn btn-info mt-4" onClick={() => exportToCSV(products, 'table')}>
                            <UnarchiveIcon className='mr-2'/>Экспорт
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Main
