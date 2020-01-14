import React from 'react'
import $ from 'jquery';

import {FileUploadComponent} from "./FileUploadComponent";

export default class LoginComponent extends React.Component {
    onSubmit(event) {
        if($('#password').val() !== $('#passwordConf').val()) {
            event.preventDefault();
            alert("Password and its confirm aren't equal");
        }
    }

    render() {
        return (
            <form align='center' className='content' method='post' enctype="multipart/form-data" onSubmit={this.onSubmit}>
                <h2>Registration</h2>
                E-mail
                <br/>
                <input type='email' placeholder='email' required className='inputRow' name='email'/>
                NickName
                <br/>
                <input type='text' placeholder='nickname' required className='inputRow' name='nickname'/>
                Activity
                <br/>
                <input type='text' placeholder='activity' className='inputRow' name='activity'/>
                <br/>
                <FileUploadComponent/>
                <img alt='photo' id='newPhoto' width='100' src='/logo192.png' height='100'/>
                <br/>
                Age
                <br/>
                <input type='number' placeholder='age' className='inputRow' value='0' name='age'/>
                Password
                <br/>
                <input type='password' placeholder='password' required className='inputRow' id='password' name='password'/>
                Password confirm
                <br/>
                <input type='password' placeholder='password confirm' id='passwordConf' required className='inputRow'/>
                <br/>
                <button type='submit'>Submit</button>
            </form>
        );
    }
}