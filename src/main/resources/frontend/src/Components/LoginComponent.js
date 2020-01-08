import React from 'react'
import $ from 'jquery';

export default class LoginComponent extends React.Component {
    dropPassword(event) {
        event.preventDefault();
        $.post("/api/drop_password", {email: $("#email").val()}, res => {
            alert(res);
        });
    }

    render() {
        return (
            <form align='center' className='content' method='post' action="/j_spring_security_check">
                <h2>Authorisation</h2>
                E-mail
                <br/>
                <input type='email' placeholder='email' id='email' required className='inputRow' name='email'/>
                Password
                <br/>
                <input type='password' placeholder='password' required className='inputRow' name='password'/>
                <button type='submit'>Log in</button>
                <br/>
                If do not remember your password you can drop it
                <button onClick={this.dropPassword}>Drop</button>
                <br/>
                If you do not have an account, you can create it
                <button onClick="event.preventDefault();window.location.href = '/registration'">Create</button>
            </form>
        );
    }
}