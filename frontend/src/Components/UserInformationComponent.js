/* eslint-disable no-extra-bind */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import $ from 'jquery';

import {FileUploadComponent} from "./FileUploadComponent";
import {But} from "./LoginComponent";
import DropImageComponent from "./DropImageComponent";

export default class UserInformationComponent extends React.Component {
    constructor() {
        super();
        this.state = {user: {   }};
        this.componentDidMount = this.componentDidMount.bind(this);
    }


    onSubmit(event) {
        if($('#password').val() !== $('#passwordConf').val()) {
            event.preventDefault();
            alert("Password and its confirm aren't equal");
        }
    }

    async componentDidMount() {
        $("input").on('input', event => {
            this.toggleSubmit();
        });
        //$('#newPassBlock').hide();
        await $.get('/api/get_user_data', this.initUser);
    }

    toggleSubmit = () =>
    {
        const check = ((i, e) =>
        {
            if(!this.state.user.hasOwnProperty(e.name))
                return false;
            let g = this.state.user[e.name], f = e.value;
            return f !== g;
        }).bind(this);
        let a = $('#newPassBlock').css('display') !== 'none' || $('input').is(check) || $("#file").val() || $("#file").prop('files').length > 0;
        $("#submit").attr("disabled", !a);
    };

    initUser = (data) =>
    {
        const obj = JSON.parse(data);
        if(obj.error || !obj)
            console.log(obj.error);
        else
        {
            this.setState({user: obj});
            $('input').each((i, e) => {
                if(obj.hasOwnProperty(e.name))
                    e.value = obj[e.name];
            });
            $("#photo").attr('src', `/api/get_photo?email=${obj.email}`);
        }
    };

    passCh = (event) => {
        event.preventDefault();
        $('#newPassBlock').toggle(500, this.toggleSubmit);
        $('#passch').text( $('#passch').text() === 'hide' ? 'Change password' : 'hide');

    };

    render() {
        return (
            <form align='center' className='content' method='post' enctype="multipart/form-data" action='/api/edit_user_data' onSubmit={this.onSubmit}>
                <h2>Information about you</h2>
                E-mail
                <br/>
                <input type='email' id='email'  placeholder='email' required className='inputRow' name='email'/>
                NickName
                <br/>
                <input type='text'  placeholder='nickname' required className='inputRow' name='nickname'/>
                Activity
                <br/>
                <input type='text' placeholder='activity' className='inputRow' name='activity'/>
                Photo
                <br/>
                <img onDragOver={e => e.preventDefault()} id="photo" onError={event => event.target.src = '/logo192.png'} src='/logo192.png'/>
                <DropImageComponent toggleSubmit={this.toggleSubmit.bind(this)} />
                <br/>
                Change photo
                <FileUploadComponent />
                <br/>
                Age
                <br/>
                <input type='number'  placeholder='age' className='inputRow' name='age'/>
                <But text={'Change password'} width='220' id='passch' onClick={this.passCh} />
                <div id='newPassBlock'>
                    New password
                    <br/>
                    <input type='password' placeholder='password' id='password' className='inputRow' name='newPassword'/>
                    New password confirm
                    <br/>
                    <input type='password'  id='passwordConf' placeholder='password confirm' className='inputRow'/>
                </div>
                <br/>
                Current password
                <br/>
                <input type='password' placeholder='old password' name="password" required className='inputRow'/>
                <button type='submit' disabled="disabled" id='submit'>Submit</button>
            </form>
        );
    }
}