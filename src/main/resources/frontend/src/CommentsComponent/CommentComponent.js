import React from 'react';
import './comments.css';

export default class CommentComponent extends React.Component{
    render() {
        return (
        <div className='comment'>
            <div className='commentInf'>
                <span className='nick'>{this.props.nick}</span>
                <span className='activ'>{this.props.activity}</span>
                <span className='date'>{this.props.date}</span>
            </div>
            <div className='commentText'>
                {this.props.comment}
            </div>
        </div>);
    }
}