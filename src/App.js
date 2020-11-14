import React, {useState} from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {DetailsProduct} from "./pages/DetailsProduct";
import {Generate} from "./pages/Generate";
import {AlertContext} from "./context/AlertContext";
import {CustomAlert} from "./components/CustomAlert";
import {CustomHeader} from "./components/CustomHeader";
import {Main} from "./pages/Main";

function App() {

    const [alert, setAlert] = useState({show: false, title: ''})

    return (
        <AlertContext.Provider value={{
            alertState: () => alert,
            setAlertState: ({show, title}) => setAlert({show: show, title: title}),
        }}>
            <CustomAlert isShow={alert.show} type={alert.type} title={alert.title}/>
            <Router>
                <CustomHeader/>
                <div className='container'>
                    <Switch>
                        <Route path='/' exact component={Main}/>
                        <Route path='/add' exact component={DetailsProduct}/>
                        <Route path='/edit' exact component={DetailsProduct}/>
                        <Route path='/generate' exact component={Generate}/>
                        <Redirect from='/*' to='/'/>
                    </Switch>
                </div>
            </Router>
        </AlertContext.Provider>
    );
}

export default App;
