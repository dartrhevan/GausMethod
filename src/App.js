import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import GausAndRunComponent from "./GausAndRunComponent";/*
const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Switch = ReactRouterDOM.Switch;*/

export default class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id='a'>
                <nav>Nav</nav>
                <div className='App'>
                    <BrowserRouter>
                    <Switch>
                        <Route path="/sle" component={GausAndRunComponent} />
                    </Switch>
                    </BrowserRouter>
                </div>
                <footer>foot</footer>
            </div>);
    }
}
