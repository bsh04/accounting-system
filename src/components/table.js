import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export const Table = ({items, history}) => {

    const handleRemove = (index) => {
        let arr = items.filter((_, i) => i !== index)
        localStorage.setItem('products', JSON.stringify(arr))
    }

    const renderItems = () => {
        return items.map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.count}</td>
                    <td>
                        <button type="button" className="btn btn-success"
                                onClick={() => history.push({pathname: '/edit', state: {item, index, add: false}})}><EditIcon/>
                        </button>
                        <button type="button" className="btn btn-danger" onClick={() => handleRemove(index)}>
                            <DeleteIcon/></button>
                    </td>
                </tr>
            )
        })
    }

    return (
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
    );
};
