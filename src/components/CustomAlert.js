import React, {useContext, useEffect, useState} from 'react';
import '../index.scss'
import {AlertContext} from "../context/AlertContext";
import CloseIcon from '@material-ui/icons/Close';

export const CustomAlert = ({isShow, title}) => {

    const state = useContext(AlertContext)

    return (
        <div className={`custom-alert-container custom-alert-container${isShow ? '__show' : '__close'}`}>
            <div className={`custom-alert custom-alert${isShow ? '__show' : '__close'}`}>
                <strong>Внимание!</strong>
                <p>{title}</p>
                <CloseIcon className='icon-close'
                           onClick={() => state.setAlertState({show: false, title: ''})}/>
            </div>
        </div>
    )
};
