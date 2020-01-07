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
//import CommentsComponent from "./CommentsComponent/CommentsComponent";

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
      <a className='sign' href='/logout'>Logout</a>
  </>) :
  (<>
      <a className='sign' href='/login'>Login</a>
      <a className='sign' href='/registration'>Registration</a>
  </>
);

class MobileMenu extends React.Component {
    onHide() {
        $('#mobMenu').animate({left: '100vw'}, {duration: 200});
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
        super(props);
        this.onMobileMenuButtonClick = this.onMobileMenuButtonClick.bind(this);
        document.onclick = event =>
        {
            if(event.target.id !== 'mobMenu' && event.target.id !== 'menuButton')
                $('#mobMenu').animate({left: '100vw'}, {duration: 200});
        };
        this.state = {width: document.body.offsetWidth, user: null};
        const resize = event => {
            this.setState({width: document.body.offsetWidth, user: this.state.user});
        };
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
        if(obj.error || !obj.user)
            console.log(obj.error);
        else
        {
            console.log(obj.user);
            this.setState({width: this.state.width, user: obj.user})
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

    render() {
        console.log(this.state.user);
        return (
            <div id='a'>
                <nav>
                    <h3><a href='/'>Numeric Analysis</a></h3>
                    {
                        ((this.state.width > 1003) ? <Links user={this.state.user} /> : <MobileMenu user={this.state.user} ref='mobMenu' />)
                    }
                    <button ref='menuButton' id='menuButton' onClick={this.onMobileMenuButtonClick}>menu</button>
                </nav>
                <div className='App'>
                    <BrowserRouter>
                    <Switch>
                        <Route path="/equations" component={EquationsComponent} />
                        <Route path="/systems" component={SystemsComponent} />
                        <Route path='/interpolation' component={InterpolationComponent} />
                        <Route path='/login' component={LoginComponent} />
                        <Route path='/registration' component={RegistrationComponent} />
                        <Route path='/user-information' component={UserInformationComponent} />
                        <Route path='/' component={StartComponent}/>
                    </Switch>
                    </BrowserRouter>
                </div>
                <footer>foot</footer>
            </div>);
    }
}

