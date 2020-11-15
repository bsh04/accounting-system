import React, {useState} from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {AlertContext} from "./context/AlertContext";
import {CustomAlert} from "./components/CustomAlert";
import {CustomHeader} from "./components/CustomHeader";
import {Loading} from "./components/Loading";

const Main = React.lazy(() => import('./pages/Main'));
const DetailsProduct = React.lazy(() => import('./pages/DetailsProduct'));
const Generate = React.lazy(() => import('./pages/Generate'));

function App() {

    const [alert, setAlert] = useState({show: false, title: ''})

    return (
        <AlertContext.Provider value={{
            alertState: () => alert, // Получение состояния алерта
            setAlertState: ({show, title}) => setAlert({show: show, title: title}), // изменение состония алерта
        }}>
            <CustomAlert isShow={alert.show} type={alert.type} title={alert.title}/>
            <Router>
                <CustomHeader/>
                <div className='container'>
                    <React.Suspense fallback={<Loading/>}>
                    <Switch>
                        <Route path='/' exact render={props => <Main {...props}/>}/>
                        <Route path='/add' exact render={props => <DetailsProduct {...props}/>}/>
                        <Route path='/edit' exact render={props => <DetailsProduct {...props}/>} />
                        <Route path='/generate' exact render={props => <Generate {...props}/>} />
                        <Redirect from='/*' to='/'/>
                    </Switch>
                    </React.Suspense>
                </div>
            </Router>
        </AlertContext.Provider>
    );
}

export default App;
