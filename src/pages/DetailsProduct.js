import React, {useEffect, useState} from 'react';
import '../index.scss'
import {Alert} from "../components/alert";

export const DetailsProduct = (props) => {

    const [name, setName] = useState('')
    const [count, setCount] = useState('')
    const [more, setMore] = useState(false)
    const [isCreate, setIsCreate] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [error, setError] = useState(false)
    // const [openAlert, setOpenAlert] = useState(false)

    useEffect(() => {
        let state = props.location.state
        if (state.add) {
            setIsAdding(true)
        } else {
            setName(state.item.name)
            setCount(state.item.count)
        }
    }, [])


    const validator = () => {
        if (name.trim() !== '' && count.trim() !== '') {
            if (!count.match(/^\d+$/)) {
                alert('У вас буквы в поле для чисел')
                return false
            } else {
                console.log('number')
                return true
            }
        } else {
            alert('пустых полей не должно быть')
            return false
        }
    }

    const handleCreate = () => {
        let store = localStorage.getItem('products')
        if (store) {
            let arr = JSON.parse(store)
            arr.push({name: name, count: count})
            localStorage.setItem('products', JSON.stringify(arr))
        } else {
            localStorage.setItem('products', JSON.stringify([{name: name, count: count}]))
        }
        if (more) {
            setCount('')
            setName('')
        } else {
            props.history.push('/')
        }
    }

    const handleChange = () => {
        let store = localStorage.getItem('products')
        let newStore = JSON.parse(store)

        newStore[props.location.state.index].count = count
        newStore[props.location.state.index].name = name

        localStorage.setItem('products', JSON.stringify(newStore))
        props.history.push('/')
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        // setOpenAlert(true)
        // setIsCreate(true)
        if (validator()) {
            isAdding ? handleCreate() : handleChange()
        }
    }

    return (
        <div className='add-product-container'>
            <h1>{isAdding ? 'Добавление' : 'Изменение'} товара</h1>
            <form>
                {/*<Alert isShow={openAlert} title={'Ошибочка...'}/>*/}
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
                <button className="btn btn-primary"
                        onClick={(e) => handleSubmit(e)}>{isAdding ? 'Создать' : 'Применить изменения'}</button>
            </form>
        </div>
    );
};
