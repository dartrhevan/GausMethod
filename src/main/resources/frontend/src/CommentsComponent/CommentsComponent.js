import React from  'react';
import './comments.css';
import CommentComponent from "./CommentComponent";

export default class CommentsComponent extends React.Component {
    constructor() {
        super();
        this.state = {comments: []};
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() {
        console.log(this.props.title);
        this.ws = new WebSocket(`ws://${window.location.host}/comments`);
        this.ws.onopen = ev => {this.ws.send(this.props.title)};
        const onMes = mes => {
            console.log(mes.data);
            this.setState({comments: JSON.parse(mes.data)});
        };
        this.ws.onmessage = onMes.bind(this);
    }

    render() {
        return (
        <>
            <p>Comments</p>
            {this.state.comments.map(c => <CommentComponent comment={c}/>)}
        <form method='post' action='/api/add_comment' className='commentSection content'>
            <textarea name='comment' className='inputRow'></textarea>
            <br/>
            <input type='hidden' name='origin' value='Systems'/>
            <button>Add</button>
        </form>
        </>);
    }
}