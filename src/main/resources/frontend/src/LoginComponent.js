import React from 'react'

export default class LoginComponent extends React.Component {
    render() {
        return (
            <form align='center' className='content' method='post' action="/j_spring_security_check">
                <h2>Authorisation</h2>
                E-mail
                <br/>
                <input type='email' placeholder='email' required className='inputRow' name='email'/>
                Password
                <br/>
                <input type='password' placeholder='password' required className='inputRow' name='password'/>
                <button type='submit'>Log in</button>
                <br/>
                If you do not have an account, you can create it
                <br/>
                <button onClick="event.preventDefault();window.location.href = '/registration'">Create</button>
            </form>
        );
    }
}