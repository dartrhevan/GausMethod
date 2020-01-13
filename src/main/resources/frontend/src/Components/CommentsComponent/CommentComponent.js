import React from 'react';
import './comments.css';

export default class CommentComponent extends React.Component{
    render() {
        return (
        <div className='comment'>
            <div className='commentInf'>
                <img width='100' height='100' border='1' src={`/api/get_photo?email=${this.props.email}`}/>
                <b className='nick'>{this.props.nick}</b>
                <span className='activ'>{this.props.activity}</span>
            </div>
            <div className='commentText'>
                {this.props.comment}
            </div>
            <span className='date'>{this.props.date}</span>
        </div>);
    }
}