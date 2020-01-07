import React from 'react'
import $ from 'jquery';

export default class UserInformationComponent extends React.Component {
    constructor() {
        super();
        this.state = {user: {   }};
        this.initUser = this.initUser.bind(this);
        this.passCh = this.passCh.bind(this);
        this.toggleSubmit = this.toggleSubmit.bind(this);
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
            /*if(!this.state.user.hasOwnProperty(event.target.name))
                this.state.user[event.target.name] = event.target.value;*/
            this.toggleSubmit();
        });
        //$('#newPassBlock').hide();
        await $.get('/api/get_user_data', this.initUser);
    }

    toggleSubmit()
    {
        const check = ((i, e) =>
        {
            if(!this.state.user.hasOwnProperty(e.name))
                return false;
            let g = this.state.user[e.name], f = e.value;
            return f != g;
        }).bind(this);
        let a = $('#newPassBlock').css('display') !== 'none' || $('input').is(check);
        $("#submit").attr("disabled", !a);//.disabled = !a;// ? 'disabled' : '';
    }

    initUser(data)
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
            //$('#email').val(obj.email);
        }
    }

    passCh(event) {
        event.preventDefault();
        $('#newPassBlock').toggle(500, this.toggleSubmit);
        $('#passch').text( $('#passch').text() === 'hide' ? 'Change password' : 'hide');

    }

    render() {
        return (
            <form align='center' className='content' method='post' action='/api/edit_user_data' onSubmit={this.onSubmit}>
                <h2>Information about you</h2>
                E-mail
                <br/>
                <input type='email' id='email' /*value={this.state.user.email}*/ placeholder='email' required className='inputRow' name='email'/>
                NickName
                <br/>
                <input type='text' /*value={this.state.user.nickname}*/ placeholder='nickname' required className='inputRow' name='nickname'/>
                Activity
                <br/>
                <input type='text' /*value={this.state.user.activity}*/ placeholder='activity' className='inputRow' name='activity'/>
                Description
                <br/>
                <input type='text' /*value={this.state.user.description}*/ placeholder='description' className='inputRow' name='description'/>
                Age
                <br/>
                <input type='number' /*value={this.state.user.age}*/ placeholder='age' className='inputRow' name='age'/>
                <button id='passch' onClick={this.passCh}>Change password</button>
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