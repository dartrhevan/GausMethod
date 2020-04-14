import React from "react";

export const SystemSolvingResult = (props) => {
    return (
        <div className='systemSolving'>
            {props.syses.map((s,i) =><> <SystemComponent key={s[i]} sys={s}/> {i === props.syses.length - 1 ? '' : '=>'} </>)}
        </div>
    );
};

const SystemComponent = (props) => {
    return (
    <table className='matrix'>
        <thead></thead>
        <tbody>
            {props.sys.map(r =>
                (<tr key={r}>{r.map((e, i) => <td key={e} style={{borderLeft: i === r.length - 1 ? '1px solid black ' : 'none'}}>
                    {i === r.length - 1 ? Number(e).toFixed(3) : Number(e).toFixed(3)}</td>)}</tr>))}
        </tbody>
    </table>);
};
