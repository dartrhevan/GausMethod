
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
    return res;
}

function directMove(sys) { //прямой проход(пока не доделал)
    for(let i = 0; i < sys.length; i++) {
        for(let j = i + 1; j < sys.length; j++) {
            sys[j].forEach((e, k) => e = e * (sys[i][i] / sys[i][j]) - sys[i][k]);
        }
    }
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