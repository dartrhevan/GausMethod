import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import EquationsComponent from "./EquationsSolving/EquationsComponent";
import GausAndRunComponent from "./SystemsSolving/GausAndRunComponent";
import StartComponent from "./StartComponent/StartComponent";
import InterpolationComponent from "./InterpolationComponent/InterpolationComponent";
import './mobile_style.css'
import $ from 'jquery';
/*
const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Switch = ReactRouterDOM.Switch;*/

class MobileMenu extends React.Component {
    render() {
        return (
        <div className='mobileMenu' id='mobMenu' >
            <a href='/es'>Equations</a>
            <a href='/sle'>Systems</a>
            <a href='/interpolation'>Interpolation</a>
        </div>);
    }
/*
    onMenuClick(event) {
        event.preventDefault()
    }
*/
}

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.onMobileMenuButtonClick = this.onMobileMenuButtonClick.bind(this);
        document.onclick = event =>
        {
            if(event.target.id !== 'mobMenu' && event.target.id !== 'menuButton')
                $('#mobMenu').css('left', '100vw');
        }
    }

    onMobileMenuButtonClick() {
        //event.preventDefault();
        console.log($('#mobMenu a'));
        //const a = $('#mobMenu').animate([{left: '100vw'}, {left: '20vw'}], {duration: 200});
            //this.refs.mobMenu.animate([{left: '100vw'/*this.refs.mobMenu.style.left*/}, {left: '20vw'}], {duration: 200});
        //a.onfinish = () => {};
        $('#mobMenu').css('left', '20vw');
        $('#mobMenu').css('width', window.outerWidth + 'vw');
        $('#mobMenu').css('height', window.outerHeight + 'vh');
        $('#mobMenu a').each(/*ind =>
            $(this).css('top', /*50 + 50 * ind +* '100px')*/ this.f);
    }

    f(ind) {
        $(this).css('top', 50 + 50 * ind + 'px');
    }

    render() {
        return (
            <div id='a'>
                <nav>
                    <h3><a href='/'>Numeric Analysis</a></h3>
                    <a href='/es'>Equations</a>
                    <a href='/sle'>Systems</a>
                    <a href='/interpolation'>Interpolation</a>
                    <button ref='menuButton' id='menuButton' onClick={this.onMobileMenuButtonClick}>menu</button>
                    <MobileMenu ref='mobMenu' />
                    {/*this.refs.menuButton && this.refs.menuButton.style.display !== 'none' ? <MobileMenu ref={n => this.mobMenu = n} but={this.refs.menuButton} /> : ''*/}
                </nav>
                <div className='App'>
                    <BrowserRouter>
                    <Switch>
                        <Route path="/es" component={EquationsComponent} />
                        <Route path="/sle" component={GausAndRunComponent} />
                        <Route path='/interpolation' component={InterpolationComponent} />
                        <Route path='/' component={StartComponent}/>
                    </Switch>
                    </BrowserRouter>
                </div>
                <footer>foot</footer>
            </div>);
    }
}
