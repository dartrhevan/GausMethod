
function getRowArray(row) {
    const res = [];
    for(let ent of row){
        res.push(Number.parseFloat(ent.value));
    }
    return res;
}

function getSystem() {
    const res = [];
    for(let row of document.getElementsByClassName('row')) {
        res.push(getRowArray(row.getElementsByClassName('ent')));
    }
    console.log(res);
    return res;
}

function swapRows(row1, row2) {
    for(let i = 0; i < row1.length; i++)
    {
        const temp = row1[i];
        row1[i] = row2[i];
        row2[i] = temp;
    }
}

function validateAndCorrect(sys) {
    for(let j = 1; j < sys.length; j++) {
        const ind = sys.indexOf((e) => e[j - 1] === 0);
        if(ind !== j)
            swapRows(sys[ind], sys[j]);
    }
}

function directMove(sys) { //прямой проход(пока не доделал)
    //let flag = null;
    for(let i = 0; i < sys.length - 1; i++) {
        for(let j = i + 1; j < sys.length; j++) {
            if(sys[j][i] === 0) continue;
            const coef = sys[j][i] / sys[i][i];
            for(let k = 0; k < sys[j].length; k++)
                    sys[j][k] = sys[j][k] - sys[i][k] * coef;
            //if(i < sys.length - 1 && sys[j][i + 1] === 0) flag = j;
        }
        /*if(flag) {
            swapRows(sys[flag], sys[flag + 1]);
            flag = null;
        }*/
    }
    //validateAndCorrect(sys);
    console.log(sys);
}

function reverseMove(sys) {//обратный проход (можешь заняться этим)
    //TODO
}

function calc() {
    let sys = getSystem();
    directMove(sys);
    reverseMove(sys);
}

export default calc;
