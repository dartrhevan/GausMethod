import React from 'react';
import './comments.css';

export default class CommentComponent extends React.Component{
    render() {
        return (
        <div className='comment'>
            <div className='commentInf'>
                <div className='nick'>{this.props.nick}</div>
                <div className='activ'>{this.props.activity}</div>
                <div className='date'>{this.props.date}</div>
            </div>
            <div className='commentText'>
                {this.props.comment}
            </div>
        </div>);
    }
}