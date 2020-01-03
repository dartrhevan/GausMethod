import React from 'react';

export default class CommentComponent extends React.Component{
    render() {
        return (
        <div className='comment'>
            {this.props.comment}
        </div>);
    }
}