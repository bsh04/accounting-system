import React, {useContext, useEffect, useState} from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "./Pagination";

export const CustomTable = ({history}) => {

    const dispatch = useDispatch()


    const store = useSelector(value => value)

    const initStateNumber = Number(store.offset)
    const initStateProducts = store.products

    const [products, setProducts] = useState(initStateProducts)
    const [productNumber, setProductNumber] = useState(initStateNumber)
    const [searchValue, setSearchValue] = useState('')
    const [selectPage, setSelectPage] = useState(1)

    const handleSelectPage = page => {
        setSelectPage(page)
        let state = searchValue.trim() !== '' ? products : initStateProducts
        if (page === 1) {
            setProducts(productNumber === 0 ? state : state.slice(0, productNumber))
        } else if (page) {
            let newState = state.slice((page - 1) * productNumber, (page - 1) * productNumber - 1 + productNumber + 1)
            if (newState.length !== 0) {
                setProducts(newState)
            } else {
                handleSelectPage(selectPage - 1)
            }
        }
        history.push(`?page=${page}`)
    }

    const checkSelected = (page = null) => {
        if (productNumber !== 0) {
            setProducts(initStateProducts.slice(0, productNumber))
            handleSelectPage(page ?? selectPage)
        } else {
            setProducts(initStateProducts)
        }
    }

    const handleSearch = () => {
        let arr = []
        let isFindings = false
        if (searchValue.trim()) {
            for (let i = 0; i < initStateProducts.length; i++) {
                if (String(initStateProducts[i].name).includes(searchValue)) {
                    arr.push({
                        name: initStateProducts[i].name,
                        count: initStateProducts[i].count,
                        index: i
                    })
                    isFindings = true
                }
            }
            if (!isFindings) setProducts([])
            setProducts(arr)
            setSelectPage(1)
        } else {
            checkSelected()
        }
    }

    useEffect(() => {
        checkSelected()
        if (searchValue !== '') handleSearch()
    }, [initStateProducts])

    useEffect(() => {
        handleSearch()
    }, [searchValue])

    useEffect(() => {
        setProductNumber(initStateNumber)
        setSelectPage(1)
        checkSelected(1)
    }, [productNumber, store])

    const renderItems = () => {
        return products.map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{productNumber * (selectPage - 1) + index + 1}</th>
                    <td>{item.name}</td>
                    <td className='text-center'>{item.count}</td>
                    <td className='justify-content-center d-flex'>
                        <button type="button" className="btn btn-success mr-2"
                                onClick={() => history.push({pathname: '/edit', state: {item, index, add: false}})}>
                            <EditIcon/>
                        </button>
                        <button type="button" className="btn btn-danger"
                                onClick={() => {
                                    dispatch({
                                        type: 'DELETE_PRODUCT',
                                        payload: searchValue !== '' ? item.index : productNumber * (selectPage - 1) + index
                                    })
                                }}
                        >
                            <DeleteIcon/></button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div>
            <div className='table-container'>
                <div className="input-group flex-nowrap w-50">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="addon-wrapping"><SearchIcon/></span>
                    </div>
                    <input type="text" className="form-control" placeholder="Поиск по названию товара"
                           aria-label="Username"
                           aria-describedby="addon-wrapping" value={searchValue}
                           onChange={e => setSearchValue(e.target.value)}/>
                </div>
                <div className="dropdown d-flex align-items-center">
                    <p className='m-0 pr-3'>Товаров на странице</p>
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {productNumber === 0 ? 'Все' : productNumber}
                    </button>
                    <div className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" onClick={() => dispatch({type: 'UPDATE_OFFSET', payload: 5})}>5</a>
                        <a className="dropdown-item" onClick={() => dispatch({type: 'UPDATE_OFFSET', payload: 10})}>10</a>
                        <a className="dropdown-item" onClick={() => dispatch({type: 'UPDATE_OFFSET', payload: 25})}>25</a>
                        <a className="dropdown-item" onClick={() => dispatch({type: 'UPDATE_OFFSET', payload: 0})}>Все</a>
                    </div>
                </div>
            </div>
            {
                products.length !== 0
                    ?
                    <table className="table w-100 table-head">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col" className='table-head__index'>#</th>
                            <th scope="col">Товар</th>
                            <th scope="col" className='text-center'>Количество</th>
                            <th scope="col" className='text-center'>Управление</th>
                        </tr>
                        </thead>
                        <tbody>
                        {renderItems()}
                        </tbody>
                    </table>
                    :
                    <p>{searchValue.trim() ? 'Результаты поиска пусты' : 'Пока что нет даннных'}</p>
            }
            <Pagination
                initialPage={selectPage}
                numberOfPages={productNumber !== 0 && Math.ceil(searchValue ? products.length / productNumber : initStateProducts.length / productNumber)}
                onPageSelect={(page) => handleSelectPage(page)}
            />
        </div>
    );
};
