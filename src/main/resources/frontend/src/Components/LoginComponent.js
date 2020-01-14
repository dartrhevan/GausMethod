import React from 'react'
import $ from 'jquery';

export const But = props =>
    <span style={{width: props.width +'px', maxWidth: props.width + 'px'}} className='But'><button onClick={props.onClick} id={props.id}>{props.text}</button></span>;
export default class LoginComponent extends React.Component {
    dropPassword(event) {
        event.preventDefault();
        $.post("/api/drop_password", {email: $("#email").val()}, res => {
            alert(res);
        });
    }
    constructor() {
        super();
    }
    render() {
        return (
            <form align='center' className='content' method='post' action="/j_spring_security_check">
                <h2>Authorisation</h2>
                {window.location.search.indexOf("error") !== -1 ? <><span className='error'>*Such user has not been found, please check your data</span><br/></> : ""}
                E-mail
                <br/>
                <input type='email' placeholder='email' id='email' required className='inputRow' name='email'/>
                Password
                <br/>
                <input type='password' placeholder='password' required className='inputRow' name='password'/>
                <br/>
                Remember Me:<input type="checkbox" name="remember-me" />
                <br/>
                <button type='submit'>Log in</button>
                <br/>
                If do not remember your password you can drop it
                <But onClick={this.dropPassword} text='Drop'/>
                <br/>
                If you do not have an account, you can create it
                <But onClick="event.preventDefault();window.location.href = '/registration'" text='Create'/>
            </form>
        );
    }
}