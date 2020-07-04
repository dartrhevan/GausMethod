import React from  'react';
import './comments.css';
import $ from 'jquery';
import CommentComponent from "./CommentComponent";
import LoadingWheel from "./LoadingWheel";

export default class CommentsComponent extends React.PureComponent {
    constructor() {
        super();
        this.state = {comments: null};
        const wsUrl = `${window.location.protocol === "https:" ? 'wss': 'ws'}://${window.location.host}/comments`;
        //this.ws = new WebSocket();
        this.ws.onopen = ev => {this.ws.send(this.props.title)};
        const onMes = mes => {
            console.log(mes.data);
            this.setState({comments: JSON.parse(mes.data)});
        };
        this.ws.onmessage = onMes.bind(this);
    }

    sendData() {
        const data = {comment: $("#comment").val(), origin: this.props.title};
        //$.post('/api/add_comment', );
    }

    render() {
        return (
        <div id='commentSection' className='content'>
            <p align='center'><b>Comments</b></p>
            {this.state.comments ? this.state.comments.map(c => <Comment logged={this.props.isLogged} parentId={c.parentId} key={c.id} replies={c.replies}
                                                                         title = {this.props.title} nesting={c.nesting} id={c.id} email = {c.author.email}
                                                                         comment={c.comment} date={c.date} nick={c.author.nickname} age={c.author.age} activity={c.author.activity}/>) : <LoadingWheel/> }
            <textarea readOnly={!this.props.isLogged} id='comment' className='inputRow'></textarea>
            <br/>
            <button disabled={!this.props.isLogged} onClick={this.sendData}>Add</button>
        </div>);
    }
}

const Comment = props => (<>
    <CommentComponent key={props.id} logged={props.logged} parentId={props.parentId} title = {props.title} nesting={props.nesting} id={props.id} email = {props.email} comment={props.comment} date={props.date} nick={props.nick} age={props.age} activity={props.activity}/>
    {props.replies.map(r => <Comment logged={props.logged} key={r.id} parentId={r.parentId} replies={r.replies} title = {props.title} nesting={r.nesting} id={r.id} email = {r.author.email} comment={r.comment} date={r.date} nick={r.author.nickname} age={r.author.age} activity={r.author.activity}/>)}
</>);

Comment.defaultProps = {replies: []};
