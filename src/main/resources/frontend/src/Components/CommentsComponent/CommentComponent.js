import React from 'react';
import './comments.css';
import $ from "jquery";

export default class CommentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasReply: false};
        //this.id = `comment${this.props.id}`;
        this.showReplyArea = this.showReplyArea.bind(this);
        //this.getReplyArea = this.getReplyArea.bind(this);
        this.getId = this.getId.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    showReplyArea()
    {
        this.setState({hasReply: true})
        //$(`#${this.getId()}`).append(this.getReplyArea());
    }

    render() {
        return (<>
        <div className='comment' id={this.getId()}>
            <img onError={event => event.target.src = '/logo192.png'} src={`/api/get_photo?email=${this.props.email}`} />
            <div className='commentInf'>
                <div className='nick'>{this.props.nick}</div>
                <div className='activ'>{this.props.activity}</div>
                <div className='activ'>{this.props.age}</div>
            </div>
            <div className='commentSection'>
                <div className='commentText'>
                    {this.props.comment}
                </div>
                <div className='date'>{this.props.date} <button onClick = {this.showReplyArea}>Reply</button></div>
            </div>
        </div>
        {
            this.state.hasReply ?
            (<div  className='comment' style={{marginLeft: '10px'}}>
                <textarea id='reply' className='inputRow'></textarea>
                <br/>
                {/*<input type='hidden' name='origin' value={this.props.title}/>*/}
                <button onClick={this.sendData}>Add</button>
            </div>) : ''
        }
            </>);
    }

    sendData() {
        $.post('/api/reply_comment', {comment: $("#reply").val(), origin: this.props.title, id: this.props.id});
    }

    getId() {
        return `comment${this.props.id}`;
    }
}