import React from "react";

export const SystemSolvingResult = (props) => {
    return (
        <div className='systemSolving'>
            {props.syses.map(s =><> <SystemComponent sys={s}/> => </>)}
        </div>
    );
};

const SystemComponent = (props) => {
    return (
    <table>
        <thead></thead>
        <tbody>
            {props.sys.map(r =>
                (<tr>{r.map((e, i) => <td style={{borderLeft: i === r.length - 1 ? '1px solid black ' : 'none'}}>
                    {i === r.length - 1 ? Number(e).toFixed(3) : Number(e).toFixed(3)}</td>)}</tr>))}
        </tbody>
    </table>);
};
