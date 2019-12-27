import React from 'react'
import $ from 'jquery';

export default class UserInformationComponent extends React.Component {
    constructor() {
        super();
        this.state = {user: {   }};
        this.initUser = this.initUser.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }


    onSubmit(event) {
        if($('#password').val() !== $('#passwordConf').val()) {
            event.preventDefault();
            alert("Password and its confirm aren't equal");
        }
    }

    async componentDidMount() {
        const check = ((i, e) =>
        {
            if(!this.state.user.hasOwnProperty(e.name))
                return false;
            return e.value !== this.state.oldUser[e.name];
        }).bind(this);
        $("input").on('input', event => {
            if(!this.state.user.hasOwnProperty(event.target.name))
                this.state.user[event.target.name] = event.target.value;
            let a = $('input').is(check);
            $("#submit").disabled = !a;
        });
        await $.get('/api/get_user_data', this.initUser);
    }

    initUser(data)
    {
        const obj = JSON.parse(data);
        if(obj.error || !obj)
            console.log(obj.error);
        else
        {
            this.setState({user: obj, oldUser: obj});
        }
    }

    render() {
        return (
            <form align='center' className='content' method='post' action='/api/edit_user_data' onSubmit={this.onSubmit}>
                <h2>Information about you</h2>
                E-mail
                <br/>
                <input type='email' value={this.state.user.email} readOnly='false' placeholder='email' required className='inputRow' name='email'/>
                NickName
                <br/>
                <input type='text' value={this.state.user.nickname} placeholder='nickname' required className='inputRow' name='nickname'/>
                Activity
                <br/>
                <input type='text' value={this.state.user.activity} placeholder='activity' className='inputRow' name='activity'/>
                Description
                <br/>
                <input type='text' value={this.state.user.description} placeholder='description' className='inputRow' name='description'/>
                Age
                <br/>
                <input type='number' value={this.state.user.age} placeholder='age' className='inputRow' name='age'/>
                New password
                <br/>
                <input type='password' placeholder='password' id='password' className='inputRow' name='newPassword'/>
                New password confirm
                <br/>
                <input type='password'  id='passwordConf' placeholder='password confirm' className='inputRow'/>
                Old password
                <br/>
                <input type='password' placeholder='old password' name="password" required className='inputRow'/>
                <button type='submit' disabled="disabled" id='submit'>Submit</button>
            </form>
        );
    }
}