import React from 'react';
import './comments.css';

export default class CommentComponent extends React.Component{
    render() {
        return (
        <div className='comment'>
            <div className='commentInf'>
                <b className='nick'>{this.props.nick}</b>
                <br/>
                <span className='activ'>{this.props.activity}</span>
            </div>
            <div className='commentText'>
                {this.props.comment}
            </div>
            <span className='date'>{this.props.date}</span>
        </div>);
    }
}