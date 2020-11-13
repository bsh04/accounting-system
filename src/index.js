import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {store} from './redux/store';
import {Provider} from "react-redux";
import App from './App';
import './index.scss';


ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <Router>
                <Switch>
                    <Route path="/*" component={App}/>
                </Switch>
            </Router>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
