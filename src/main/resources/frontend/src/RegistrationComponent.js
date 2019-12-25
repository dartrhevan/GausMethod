import React from 'react'

export default class LoginComponent extends React.Component {
    render() {
        return (
            <form align='center' className='content' method='post'>
                <h2>Registration</h2>
                E-mail
                <br/>
                <input type='email' placeholder='email' required className='inputRow' name='email'/>
                Password
                <br/>
                <input type='password' placeholder='password' required className='inputRow' name='password'/>
                NickName
                <br/>
                <input type='text' placeholder='age' required className='inputRow' name='nickname'/>
                Activity
                <br/>
                <input type='text' placeholder='age' className='inputRow' name='activity'/>
                Description
                <br/>
                <input type='text' placeholder='age' className='inputRow' name='description'/>
                Age
                <br/>
                <input type='number' placeholder='age' className='inputRow' name='age'/>
                <button type='submit'>Submit</button>
            </form>
        );
    }
}