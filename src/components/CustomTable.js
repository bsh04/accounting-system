import React, {useEffect, useState} from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "./Pagination";
import {removeProduct} from "../redux/actions/productsActions";
import {updateOffset} from "../redux/actions/offsetActions";
import {NUMBER_ITEMS_DISPLAYED} from '../tools/constants'

export const CustomTable = ({history}) => {

    const dispatch = useDispatch()

    const initStateProducts = useSelector(state => state.products)
    const productOffset = Number(useSelector(state => state.offset).offset)

    const [products, setProducts] = useState(initStateProducts.products)
    const [searchValue, setSearchValue] = useState('')
    const [selectPage, setSelectPage] = useState(1)
    const [searchProducts, setSearchProducts] = useState([])

    // Обработчик поиска
    const handleSearch = () => {
        let arr = []
        for (let i = 0; i < initStateProducts.products.length; i++) {
            if (String(initStateProducts.products[i].name).includes(searchValue)) {
                arr.push(initStateProducts.products[i])
            }
        }
        setSearchProducts(arr)
    }

    // Обработчик количетва отображаемых товаров на странице
    const handleCutListProduct = (page = selectPage) => {

        let state = searchValue.trim() !== '' ? searchProducts : initStateProducts.products
        if (page === 1) {
            setProducts(state.slice(0, productOffset !== 0 ? productOffset : state.length))
        } else {
            let newState = state.slice((page - 1) * productOffset, (page - 1) * productOffset - 1 + productOffset + 1)
            if (newState.length !== 0) {
                setProducts(newState)
            } else {
                handleCutListProduct(selectPage - 1)
                setSelectPage(selectPage - 1)
            }
        }
    }

    // Вызывается при поиске
    useEffect(() => {
        setSelectPage(1)
        if (searchValue.trim() === '') {
            setProducts(initStateProducts.products)
            handleCutListProduct()
        } else {
            handleSearch()
        }
    }, [searchValue])

    // Вызывается при смене страницы и при поиске
    useEffect(() => {
        handleCutListProduct()
    }, [selectPage, searchProducts])

    // Вызывается при изменении количества товаров в localStorage
    useEffect(() => {
        handleSearch()
        setProducts(initStateProducts.products)
        handleCutListProduct()
    }, [initStateProducts])

    // Вызывается при изменении "Товаров на странице"
    useEffect(() => {
        setSelectPage(1)
        handleCutListProduct(1)
    }, [productOffset])

    // Рендер варинтов "Товаров на странице"
    const renderDropdownItems = () => NUMBER_ITEMS_DISPLAYED.map((item, index) =>
        <a className="dropdown-item" key={index} onClick={() => dispatch(updateOffset(item))}>{item === 0 ? 'Все' : item}</a>
    )

    // Рендер данных таблицы
    const renderItems = () => {
        return products.map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{productOffset * (selectPage - 1) + index + 1}</th>
                    <td>{item.name}</td>
                    <td className='text-center'>{item.count}</td>
                    <td className='justify-content-center d-flex'>
                        <button type="button" className="btn btn-success mr-2"
                                onClick={() => history.push({pathname: '/edit', state: {item, add: false}})}>
                            <EditIcon/>
                        </button>
                        <button type="button" className="btn btn-danger"
                                onClick={() => {
                                    dispatch(removeProduct(item.id))
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
                <div className="input-group flex-nowrap table-container__search">
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
                        {productOffset === 0 ? 'Все' : productOffset}
                    </button>
                    <div className="dropdown-menu">
                        {renderDropdownItems()}
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
                numberOfPages={productOffset !== 0 && Math.ceil((searchValue !== '' ? searchProducts.length : initStateProducts.products.length) / productOffset)}
                onPageSelect={page => setSelectPage(page)}
            />
        </div>
    );
};
