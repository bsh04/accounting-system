import React, {useContext, useEffect, useState} from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import {useDispatch} from "react-redux";
import {AlertContext} from "../context/AlertContext";
import {addProduct, updateProduct} from "../redux/actions/productsActions";
import {IDGenerator} from "../tools/idGenerator";
import '../index.scss'

const DetailsProduct = (props) => {

    const alert = useContext(AlertContext)
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [count, setCount] = useState('')
    const [id, setId] = useState(null)
    const [more, setMore] = useState(false)
    const [isAdding, setIsAdding] = useState(false)

    // Определение типа формы (добавление / редактирование)
    useEffect(() => {
        let state = props.location.state
        if (state.add) {
            setIsAdding(true)
        } else {
            setName(state.item.name)
            setCount(state.item.count)
            setId(state.item.id)
        }
    }, [props.location.state])

    // Валидатор формы
    const validator = () => {
        if (name.trim() !== '' && count.trim() !== '') {
            return true
        } else {
            alert.setAlertState({show: true, title: 'Пожалуйста, заполните все поля', type: 'danger'})
            return false
        }
    }

    // Обработчик создания продукта
    const handleCreate = () => {
        dispatch(addProduct({name, count, id: IDGenerator()})) // Рандомный ID
        if (more) {
            setCount('')
            setName('')
        } else {
            props.history.push('/')
        }
    }

    // Обработчик изменения продукта
    const handleChange = () => {
        dispatch(updateProduct({name, count, id}))
        props.history.push('/')
    }

    // Обработчик запроса
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
                    <label htmlFor="name">Название товара</label>
                    <input type="text" className={`form-control`}
                           id="name"
                           maxLength={30}
                           onChange={(e => setName(e.target.value))} value={name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="count">Количество</label>
                    <input type="number" className={`form-control count-input`}
                           id="count"
                           onChange={e => setCount(e.target.value)} value={count}/>
                </div>
                {
                    isAdding
                    &&
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="more" value={more}
                               onChange={() => setMore(!more)}/>
                        <label className="form-check-label" htmlFor="more">Добавить ещё один</label>
                    </div>
                }
                <button className="btn btn-success"
                        onClick={(e) => handleSubmit(e)}>
                    {
                        isAdding
                            ?
                            <AddIcon className='mr-2'/>
                            :
                            <CheckIcon className='mr-2'/>
                    }
                    {isAdding ? 'Создать' : 'Применить изменения'}</button>
                <button className="btn btn-primary"
                        onClick={() => props.history.push('/')}><ArrowBackIcon className='mr-2'/>Вернуться к таблице
                </button>
            </form>
        </div>
    );
};

export default DetailsProduct
