import React from 'react'

export default class LoginComponent extends React.Component {
    render() {
        return (
            <form align='center' className='content' method='post'action="/j_spring_security_check">
                <h2>Authorisation</h2>
                <input type='email' placeholder='email' className='inputRow' name='email'/>
                <input type='password' placeholder='password' className='inputRow' name='password'/>
                <button type='submit'>Submit</button>
            </form>
        );
    }
}