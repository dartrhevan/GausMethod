import React from  'react';
import './comments.css';
import $ from 'jquery';
import CommentComponent from "./CommentComponent";
import LoadingWheel from "./LoadingWheel";
import Sock from "sockjs-client";
import Stomp from 'stompjs';
import getWSURL from "../../getWSURL";

export default class CommentsComponent extends React.PureComponent {
    constructor() {
        super();
        this.state = {comments: null};
        const wsUrl = getWSURL('ws');//`${window.location.protocol === "https:" ? 'wss': 'ws'}://${window.location.host}/ws`;
        const onMes = data =>
            this.setState({comments: JSON.parse(data)});

        const socket = new Sock(wsUrl);

        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, frame => {
            this.stompClient.subscribe('/client/comments', onMes.bind(this));
            this.stompClient.send('/ws-api/get/' + this.props.title);
        });
    }

    sendData() {
        const data = {comment: $("#comment").val(), origin: this.props.title};
        this.stompClient.send("/ws-api/comment", {}, JSON.stringify(data));
    }

    onReply = (comment, id) =>
        this.stompClient.send("/ws-api/reply", {}, JSON.stringify({comment, origin: this.props.title, id}));

    render() {
        return (
        <div id='commentSection' className='content'>
            <p align='center'><b>Comments</b></p>
            {this.state.comments ? this.state.comments.map(c =>
                <Comment logged={this.props.isLogged} parentId={c.parentId} key={c.id} replies={c.replies}
                         title = {this.props.title} nesting={c.nesting} id={c.id} email = {c.author.email}
                         comment={c.comment} date={c.date} nick={c.author.nickname} age={c.author.age}
                         activity={c.author.activity} onReply={this.onReply}/>) : <LoadingWheel/> }
            <textarea readOnly={!this.props.isLogged} id='comment' className='inputRow'></textarea>
            <br/>
            <button disabled={!this.props.isLogged} onClick={this.sendData}>Add</button>
        </div>);
    }
}

const Comment = props => (<>
    <CommentComponent key={props.id} onReply={props.onReply} logged={props.logged} parentId={props.parentId} title = {props.title} nesting={props.nesting} id={props.id} email = {props.email} comment={props.comment} date={props.date} nick={props.nick} age={props.age} activity={props.activity}/>
    {props.replies.map(r => <Comment onReply={props.onReply} logged={props.logged} key={r.id} parentId={r.parentId} replies={r.replies} title = {props.title} nesting={r.nesting} id={r.id} email = {r.author.email} comment={r.comment} date={r.date} nick={r.author.nickname} age={r.author.age} activity={r.author.activity}/>)}
</>);

Comment.defaultProps = {replies: []};
