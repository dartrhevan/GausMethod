import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import EquationsComponent from "./EquationsSolving/EquationsComponent";
import GausAndRunComponent from "./SystemsSolving/GausAndRunComponent";
import StartComponent from "./StartComponent/StartComponent";
import InterpolationComponent from "./InterpolationComponent/InterpolationComponent";
import './mobile_style.css'
import $ from 'jquery';
import LoginComponent from "./LoginComponent";
import RegistrationComponent from "./RegistrationComponent";
/*
const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Switch = ReactRouterDOM.Switch;*/



const Links = props => (
    <>
        <a href='/equations'>Equations</a>
        <a href='/systems'>Systems</a>
        <a href='/interpolation'>Interpolation</a>
        <a href='/login'>Login</a>
        <a href='/registration'>Registration</a>
    </>
);

class MobileMenu extends React.Component {
    render() {
        return (
        <div className='mobileMenu' id='mobMenu' >
            <a onClick={$('#mobMenu').animate({left: '100vw'}, {duration: 200})}>Hide</a>
            <Links />
        </div>);
    }
}

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.onMobileMenuButtonClick = this.onMobileMenuButtonClick.bind(this);
        document.onclick = event =>
        {
            if(event.target.id !== 'mobMenu' && event.target.id !== 'menuButton')
                $('#mobMenu').animate({left: '100vw'}, {duration: 200});
        }
    }

    onMobileMenuButtonClick() {
        console.log($('#mobMenu a'));
        //$('#mobMenu').css('left', '20vw');
        //$('#mobMenu').css('left', null);

        $('#mobMenu').css('width', window.outerWidth + 'vw');
        $('#mobMenu').css('height', window.outerHeight + 'vh');
        $('#mobMenu a').each(this.f);
        $('#mobMenu').animate({left: '20vw'}, {duration: 200});
    }

    f(ind) {
        $(this).css('top', 15 + (10 + this.clientHeight) * ind + 'px');
    }

    render() {
        return (
            <div id='a'>
                <nav>
                    <h3><a href='/'>Numeric Analysis</a></h3>
                    { window.outerWidth > 1020 ? <Links /> : <MobileMenu ref='mobMenu' /> }
                    <button ref='menuButton' id='menuButton' onClick={this.onMobileMenuButtonClick}>menu</button>
                </nav>
                <div className='App'>
                    <BrowserRouter>
                    <Switch>
                        <Route path="/equations" component={EquationsComponent} />
                        <Route path="/systems" component={GausAndRunComponent} />
                        <Route path='/interpolation' component={InterpolationComponent} />
                        <Route path='/login' component={LoginComponent} />
                        <Route path='/registration' component={RegistrationComponent} />
                        <Route path='/' component={StartComponent}/>
                    </Switch>
                    </BrowserRouter>
                </div>
                <footer>foot</footer>
            </div>);
    }
}
