import React, {useContext, useEffect, useState} from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useDispatch} from "react-redux";
import {AlertContext} from "../context/AlertContext";
import '../index.scss'
import {addItem, addProduct, updateProduct} from "../redux/productsActions";
import {IDGenerator} from "../tools/idGenerator";

export const DetailsProduct = (props) => {

    const alert = useContext(AlertContext)
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [count, setCount] = useState('')
    const [id, setId] = useState(null)
    const [more, setMore] = useState(false)
    const [isAdding, setIsAdding] = useState(false)


    useEffect(() => {
        let state = props.location.state
        if (state.add) {
            setIsAdding(true)
        } else {
            setName(state.item.name)
            setCount(state.item.count)
            setId(state.item.id)
        }
    }, [])

    const validator = () => {
        if (name.trim() !== '' && count.trim() !== '') {
            return true
        } else {
            alert.setAlertState({show: true, title: 'Пожалуйста, заполните все поля', type: 'danger'})
            return false
        }
    }

    const handleCreate = () => {
        dispatch(addProduct({name, count, id: IDGenerator()}))
        if (more) {
            setCount('')
            setName('')
        } else {
            props.history.push('/')
        }
    }

    const handleChange = () => {
        dispatch(updateProduct({name, count, id}))
        props.history.push('/')
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validator()) {
            isAdding ? handleCreate() : handleChange()
        }
    }

    return (
        <div className='add-product-container'>
            <h1>{isAdding ? 'Добавление' : 'Изменение'} товара</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Название товара</label>
                    <input type="email" className={`form-control`}
                           id="exampleInputEmail1" aria-describedby="emailHelp"
                           onChange={(e => setName(e.target.value))} value={name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Количество</label>
                    <input type="number" className={`form-control count-input`}
                           id="exampleInputPassword1"
                           onChange={e => setCount(e.target.value)} value={count}/>
                </div>
                {
                    isAdding
                    &&
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" value={more}
                               onChange={() => setMore(!more)}/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Добавить ещё один</label>
                    </div>
                }
                <button className="btn btn-success"
                        onClick={(e) => handleSubmit(e)}>{isAdding ? 'Создать' : 'Применить изменения'}</button>
                <button className="btn btn-primary ml-4"
                        onClick={() => props.history.push('/')}><ArrowBackIcon className='mr-2'/>Вернуться к таблице
                </button>
            </form>
        </div>
    );
};
