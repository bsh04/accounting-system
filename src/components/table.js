import React, {useEffect, useState} from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import {useDispatch, useSelector} from "react-redux";

export const Table = ({history}) => {

    const dispatch = useDispatch()

    const initState = useSelector(value => value)

    const [products, setProducts] = useState(initState)

    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        setProducts(initState)
    }, [initState])

    useEffect(() => {
        let arr = []
        let isFindings = false
        if (searchValue.trim()) {
            for (let i = 0; i < products.length; i++) {
                if (String(products[i].name).includes(searchValue)) {
                    arr.push(products[i])
                    setProducts(arr)
                    isFindings = true
                }
            }
            if (!isFindings) setProducts([])
        } else {
            setProducts(initState)
        }
    }, [searchValue])

    const renderItems = () => {
        return products.map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.count}</td>
                    <td>
                        <button type="button" className="btn btn-success"
                                onClick={() => history.push({pathname: '/edit', state: {item, index, add: false}})}>
                            <EditIcon/>
                        </button>
                        <button type="button" className="btn btn-danger"
                                onClick={() => dispatch({type: 'DELETE_PRODUCT', payload: index})}>
                            <DeleteIcon/></button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div>
            <div className="input-group flex-nowrap pb-4">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="addon-wrapping"><SearchIcon/></span>
                </div>
                <input type="text" className="form-control" placeholder="Поиск по названию товара"
                       aria-label="Username"
                       aria-describedby="addon-wrapping" value={searchValue}
                       onChange={e => setSearchValue(e.target.value)}/>
            </div>
            {
                products.length !== 0
                    ?
                    <table className="table">
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

        </div>
    );
};
