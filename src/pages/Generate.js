import React, {useContext, useState} from 'react';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import randomWords from 'random-words';
import {useDispatch} from "react-redux";
import {AlertContext} from "../context/AlertContext";
import {IDGenerator} from "../tools/idGenerator";
import {generateProducts} from "../redux/actions/productsActions";
import {MAX_COUNT_PRODUCT_GENERATE} from '../tools/constants'

const Generate = (props) => {

    const [count, setCount] = useState('')
    const dispatch = useDispatch()
    const alert = useContext(AlertContext)

    // Обработчик создания новых товаров
    const handleCreate = e => {
        e.preventDefault()
        let arr = []
        if (count <= MAX_COUNT_PRODUCT_GENERATE && Number(count) !== 0 && count !== '') {
            for (let i = 0; i < count; i++) {
                arr.push({
                    id: IDGenerator(), // Рандомный ID
                    name: randomWords(),
                    count: (Math.random() * 100).toFixed()
                })
            }

            dispatch(generateProducts(arr))
            props.history.push('/')
        } else {
            alert.setAlertState({
                show: true,
                title: `Введите корректное значение (от 1 до ${MAX_COUNT_PRODUCT_GENERATE})`
            })
        }
    }

    return (
        <div className='add-product-container'>
            <h1>Сгенерировать товары</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="number">Количество</label>
                    <input type="number" className={`form-control count-input`}
                           id="number"
                           placeholder={`Допустимое значение от 1 до ${MAX_COUNT_PRODUCT_GENERATE}`}
                           onChange={e => setCount(e.target.value)} value={count}/>
                    <small id="emailHelp" className="form-text text-muted"><strong>Внимание!</strong> Все данные из
                        таблицы удалятся</small>
                </div>
                <button className="btn btn-success"
                        onClick={(e) => handleCreate(e)}>Создать
                </button>
                <button className="btn btn-primary ml-4"
                        onClick={() => props.history.push('/')}><ArrowBackIcon className='mr-2'/>Вернуться к таблице
                </button>
            </form>
        </div>
    );
};

export default Generate