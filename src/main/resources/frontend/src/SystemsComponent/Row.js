import React from 'react';

function Row(props) {
    const entities = [];
    for(let i = 0; i < props.dimension; i++)
        entities.push(<input type='text' className='ent'/>);
    return (
        <div className='row'>
            {entities} = <input type='text' className='ent'/>
        </div>
    );
}

export default Row;
