import React from 'react';
import './comments.css';
import $ from "jquery";

export default class CommentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasReply: false};
        this.style = {marginLeft: 15 + this.props.nesting * 15 + 'px'};
        if(props.nesting > 0)
            this.style.borderColor = "darkgrey";
    }

    showReplyArea = () =>
        this.setState({hasReply: true});


    render() {
        return (<>
        <div className='comment' id={this.getId()} style={this.style}>
            <img alt='avatar' onError={event => event.target.src = '/logo192.png'} src={`/api/get_photo?email=${this.props.email}`} />
            <div className='commentInf'>
                <div className='nick'>{this.props.nick}</div>
                <div className='activ'>{this.props.activity}</div>
                <div className='activ'>{this.props.age}</div>
            </div>
            <div className='commentSection'>
                <div className='commentText'>
                    {this.props.comment}
                </div>
                <div className='bottomInformation'>
                    {this.props.date} <button className='replyButton' disabled={!this.props.logged} onClick = {this.showReplyArea}>Reply</button>
                    <div className='activ'>id:#{this.getId()} {this.props.nesting > 0 ? `Reply to comment ${this.props.parentId}` : ``} </div>
                </div>
            </div>
        </div>
        {
            this.state.hasReply ?
            (<div  className='reply' style={this.style}>
                <textarea readOnly={!this.props.logged}  id='reply' className='inputRow'></textarea>
                <br/>
                <button disabled={!this.props.logged}  onClick={this.sendData}>Add</button>
                <button onClick={() => this.setState({hasReply: false})}>Cancel</button>
            </div>) : ''
        }
            </>);
    }

    sendData = () => {
        this.props.onReply($("#reply").val(), this.props.id);
        this.setState({hasReply: false});
    };

    getId = () => `comment${this.props.id}`;
}