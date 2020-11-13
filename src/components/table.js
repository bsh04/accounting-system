import React, {useEffect, useState} from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "./pagination";

export const Table = ({history}) => {

    const dispatch = useDispatch()

    const initState = useSelector(value => value)

    const [products, setProducts] = useState(initState)

    const [searchValue, setSearchValue] = useState('')
    const [productNumber, setProductNumber] = useState(0)
    const [selectPage, setSelectPage] = useState(1)

    const handleSelectPage = page => {
        setSelectPage(page)
        let state = searchValue.trim() !== '' ? products : initState
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
            setProducts(initState.slice(0, productNumber))
            handleSelectPage(page ?? selectPage)
        } else {
            setProducts(initState)
        }
    }

    const handleSearch = () => {
        let arr = []
        let isFindings = false
        if (searchValue.trim()) {
            for (let i = 0; i < initState.length; i++) {
                if (String(initState[i].name).includes(searchValue)) {
                    arr.push({
                        name: initState[i].name,
                        count: initState[i].count,
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
    }, [initState])


    useEffect(() => {
        handleSearch()
    }, [searchValue])

    useEffect(() => {
        setSelectPage(1)
        checkSelected(1)
    }, [productNumber])

    const renderItems = () => {
        return products.map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{productNumber * (selectPage - 1) + index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.count}</td>
                    <td>
                        <button type="button" className="btn btn-success"
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
                        <a className="dropdown-item" onClick={() => setProductNumber(5)}>5</a>
                        <a className="dropdown-item" onClick={() => setProductNumber(10)}>10</a>
                        <a className="dropdown-item" onClick={() => setProductNumber(25)}>25</a>
                        <a className="dropdown-item" onClick={() => setProductNumber(0)}>Все</a>
                    </div>
                </div>
            </div>
            {
                products.length !== 0
                    ?
                    <table className="table w-100">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Товар</th>
                            <th scope="col">Количество</th>
                            <th scope="col">Управление</th>
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
                numberOfPages={productNumber !== 0 && Math.ceil(searchValue ? products.length / productNumber : initState.length / productNumber)}
                onPageSelect={(page) => handleSelectPage(page)}
            />
        </div>
    );
};
