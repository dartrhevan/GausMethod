/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import EquationsComponent from "./Components/EquationsSolving/EquationsComponent";
import SystemsComponent from "./Components/SystemsComponent/SystemsComponent";
import StartComponent from "./Components/StartComponent/StartComponent";
import InterpolationComponent from "./Components/InterpolationComponent";
import './mobile_style.css'
import $ from 'jquery';
import LoginComponent from "./Components/LoginComponent";
import RegistrationComponent from "./Components/RegistrationComponent";
import UserInformationComponent from "./Components/UserInformationComponent";

const Links = props => (
    <>
        <a href='/equations'>Equations</a>
        <a href='/systems'>Systems</a>
        <a href='/interpolation'>Interpolation</a>
        <Signs user={props.user}/>
    </>
);

const Signs = props => props.user ?
  (<>
      <a className='sign' href='/user-information'>{props.user}</a>
      <a className='sign' onClick={sessionStorage.removeItem('user')} href='/logout'>Logout</a>
  </>) :
  (<>
      <a className='sign' href='/login'>Login</a>
      <a className='sign' href='/registration'>Registration</a>
  </>
);

class MobileMenu extends React.Component {
    onHide() {
        $('#mobMenu').animate({left: '110vw'}, {duration: 200});
    }
    render() {
        return (
        <div className='mobileMenu' id='mobMenu' >
            <a onClick={this.onHide}>Hide</a>
            <Links user = {this.props.user}/>
        </div>);
    }
}

export default class App extends React.Component {

    constructor(props) {
        /**
         * screen.width. Определяет ширину экрана (монитора).
         screen.height. Определяет высоту экрана (монитора).
         * @param props
         */
        super(props);
        this.onMobileMenuButtonClick = this.onMobileMenuButtonClick.bind(this);
        document.onclick = event =>
        {
            if(event.target.id !== 'mobMenu' && event.target.id !== 'menuButton')
                $('#mobMenu').animate({left: '110vw'}, {duration: 200});
        };
        this.state = {width: document.body.offsetWidth, user: JSON.parse(sessionStorage.getItem('user'))};
        const resize = event => this.setState({width: document.body.offsetWidth, user: this.state.user});
        window.onresize = resize.bind(this);
        document.body.addEventListener("resize", resize.bind(this));
        document.addEventListener("resize", resize.bind(this));
        this.initUser = this.initUser.bind(this);
    }


    componentDidMount() {
        $.get('/api/get_user_name', this.initUser);
    }

    initUser(data) {
        const obj = JSON.parse(data);
        if(obj.error || !obj.user) {
            console.log(obj.error);
            sessionStorage.removeItem('user');
            this.setState({width: this.state.width, user: null});
        }
        else
        {
            console.log(obj.user);
            this.setState({width: this.state.width, user: obj.user});
            sessionStorage.setItem('user', JSON.stringify(obj.user));
        }
    }

    onMobileMenuButtonClick() {
        console.log($('#mobMenu a'));
        $('#mobMenu').css('width', window.outerWidth + 'vw');
        $('#mobMenu').css('height', window.outerHeight + 'vh');
        $('#mobMenu a').each(this.f);
        $('#mobMenu').animate({left: '20vw'}, {duration: 200});
    }

    f(ind) {
        $(this).css('top', 15 + (10 + this.clientHeight) * ind + 'px');
    }
//1003
    render() {
        return (
            <div id='a'>
                <nav>
                    <h3><a href='/'>Numerical Analysis</a></h3>
                    {
                        ((this.state.width > 1003) ? <Links user={this.state.user} /> : <MobileMenu user={this.state.user} ref='mobMenu' />)
                    }
                    <button ref='menuButton' id='menuButton' onClick={this.onMobileMenuButtonClick}>menu</button>
                </nav>
                <div className='App'>
                    <BrowserRouter>
                    <Switch>
                        <Route path="/equations" render={props => <EquationsComponent isLogged={this.state.user !== null} />}/>
                        <Route path="/systems" render={props => <SystemsComponent isLogged={this.state.user !== null} />} />
                        <Route path='/interpolation' render={props => <InterpolationComponent isLogged={this.state.user !== null} />}  />
                        <Route path='/login' component={LoginComponent} />
                        <Route path='/registration' component={RegistrationComponent} />
                        <Route path='/user-information' component={UserInformationComponent} />
                        <Route path='/' component={StartComponent}/>
                    </Switch>
                    </BrowserRouter>
                </div>
                <footer>Powered by <a href='https://github.com/dartrhevan'>dartrhevan</a> and <a href='https://github.com/Nordennavic'>Nordennavic</a></footer>
            </div>);
    }
}

