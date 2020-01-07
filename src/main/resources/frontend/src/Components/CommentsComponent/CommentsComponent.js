import React from  'react';
import './comments.css';
import CommentComponent from "./CommentComponent";

export default class CommentsComponent extends React.Component {
    constructor() {
        super();
        this.state = {comments: []};
        //this.componentDidMount = this.componentDidMount.bind(this);

        this.ws = new WebSocket(`ws://${window.location.host}/comments`);
        this.ws.onopen = ev => {this.ws.send(this.props.title)};
        const onMes = mes => {
            console.log(mes.data);
            this.setState({comments: JSON.parse(mes.data)});
        };
        this.ws.onmessage = onMes.bind(this);
    }
    /*
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
*/
    render() {
        return (
        <form method='post' action='/api/add_comment' id='commentSection' className='content'>
            <p align='center'><b>Comments</b></p>
            {this.state.comments.map(c => <CommentComponent comment={c.comment} date={c.date} nick={c.author.nickname} activity={c.author.activity}/>)}
            <textarea name='comment' className='inputRow'></textarea>
            <br/>
            <input type='hidden' name='origin' value='Systems'/>
            <button>Add</button>
        </form>);
    }
}