import React, {useEffect, useState} from 'react';
import '../index.scss'

export const Alert = ({isShow, title, type}) => {

    const [openAlert, setOpenAlert] = useState(false)

    useEffect(() => {
        if (isShow) {
            console.log('asd')
            setOpenAlert(true)
            timeout()
        }
        return window.clearTimeout(timeout())
    }, [isShow])

    const timeout = () => window.setTimeout(() => {
        setOpenAlert(false)
    }, 3000)

    return (
        <div className={`alert alert-${type} ${openAlert ? 'custom-alert__active' : 'custom-alert__close'}`}
             role="alert">
            {title}
        </div>
    )
};
