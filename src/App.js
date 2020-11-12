import React from "react";
import {Header} from "./components/header";
import {Main} from "./pages/Main";
import {BrowserRouter as Router, Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {DetailsProduct} from "./pages/DetailsProduct";

function App(props) {
    return (
        <div>
            <Router>
                <Header/>
                <div className='container'>
                    <Switch>
                        <Route path='/' exact component={Main}/>
                        <Route path='/add' exact component={DetailsProduct}/>
                        <Route path='/edit' exact component={DetailsProduct}/>
                        <Redirect from='/*' to='/'/>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
