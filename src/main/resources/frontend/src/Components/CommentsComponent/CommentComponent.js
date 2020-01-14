import React from 'react';
import './comments.css';

export default class CommentComponent extends React.Component{
    render() {
        return (
        <div className='comment'>
            <img width='100' height='100' src={`/api/get_photo?email=${this.props.email}`} onerror="this.src = '/logo192.png'"/>
            <div className='commentInf'>
                <div className='nick'>{this.props.nick}</div>
                <div className='activ'>{this.props.activity}</div>
                <div className='activ'>{this.props.age}</div>
            </div>
            <div className='commentSection'>
                <div className='commentText'>
                    {this.props.comment}
                </div>
                <div className='date'>{this.props.date}</div>
            </div>
        </div>);
    }
}