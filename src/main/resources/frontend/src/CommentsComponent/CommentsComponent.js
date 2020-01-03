import React from  'react';
import './comments.css';

export default class CommentsComponent extends React.Component {
    render() {
        return (
        <form method='post' action='/api/add_comment' className='commentSection content'>
            <p>Comments</p>
            <textarea name='comment' className='inputRow'></textarea>
            <br/>
            <input type='hidden' name='origin' value='Systems'/>
            <button>Add</button>
        </form>);
    }
}