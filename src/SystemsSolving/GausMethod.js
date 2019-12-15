
function output(sys) {//вывод результата
    let resString = 'Результат: (';
    for(let i = 0 ; i < sys.length; i++)
    {
        resString+= sys[i][sys.length];
        if(i !== sys.length - 1)
            resString+= ', ';
    }
    resString += ')';
    const res = document.getElementById('res');
    res.innerHTML = resString;
    alert(resString);
}

function getRowArray(row) {
    const res = [];

    for(let ent of row)
        res.push(Number.parseFloat(ent.value));

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

function calc() {

    function directMove(sys) { //прямой проход

        function validateAndCorrect(sys) {

            function swapRows(row1, row2) {
                for(let i = 0; i < row1.length; i++) {
                    const temp = row1[i];
                    row1[i] = row2[i];
                    row2[i] = temp;
                }
            }

            for(let j = 1; j < sys.length; j++) {
                const row = sys.find(e => {
                    for(let i = 0; i < j; i++)
                        if(e[i] != 0)
                            return false;
                        return true;
                });
                if(row !== sys[j])
                    swapRows(row, sys[j]);
            }
        }

        for(let i = 0; i < sys.length - 1; i++) {
            if(sys[i][i] === 0) continue;
            for(let j = i + 1; j < sys.length; j++) {
                const coef = sys[j][i] / sys[i][i];
                for(let k = 0; k < sys[j].length; k++)
                    sys[j][k] = (sys[j][k] - sys[i][k] * coef).toFixed(15);
            }
        }
        validateAndCorrect(sys);
        console.log(sys);
    }

    function reverseMove(sys) {//обратный проход
        for(let i = sys.length - 1; i >= 0 ; i--) {
            sys[i][sys.length] /= sys[i][i];
            sys[i][i] = 1;
            for(let j = i - 1; j >= 0; j--) {
                const coef = sys[j][i]  / sys[i][i];
                for(let k = sys.length; k >=0 ; k--) {
                    sys[j][k] = (sys[j][k] - sys[i][k] * coef).toFixed(15);
                }
            }
        }
        console.log(sys);
    }

    function gausMethod(sys) {
        directMove(sys);
        reverseMove(sys);
    }

    const sys = getSystem();
    gausMethod(sys);
    output(sys);
}

function autofill() {
    let sys = getSystem();
    let i = 0;
    let j = 0;
    const arr = [10 , -4 , 0 , 0 , 8 , 1 , 2 , -0.2 , 0 , 5.5 , 0 , 1 , -7 , 1 , 2 , 0 , 0 , -2 , 5 , -1];
    for (let row of document.getElementsByClassName('row')) {
        let vard = row.getElementsByClassName('ent');
        for (let ent of vard) {
            ent.value = arr[i * (sys.length) + i + j].toString();
            j++;
        }
    }
    i++;
}
function runcalc() {
    function runMethod(sys) {
        const us = [];
        const vs = [];
        const xs = [];
        const getA = i => (i === 0 ? 0 : sys[i][i - 1]); //alfa
        const getB = i => sys[i][i];     //beta
        const getC = i => ((i === sys.length - 1 ) ? 0 : sys[i][i + 1]); //y
        const getD = i => sys[i][sys[i].length - 1]; //delta
        function calcCoefficients() {
            us[0] = -getC(0) / getB(0);
            vs[0] = getD(0) / getB(0);
            for(let i = 1; i < sys.length; i++) {
                us[i] =  -getC(i) / (getA(i) * us[i - 1] + getB(i));
                vs[i] = (getD(i) - getA(i) * vs[i - 1]) / (getA(i) * us[i - 1] + getB(i));
            }
        }
        function calcAnswer(i) {
            if(i === sys.length - 1)
                xs[i] = vs[i];//(a*q-d)/(b - a*p);
            else
                xs[i] = us[i]*xs[i+1] + vs[i];
            if(i !== 0)
            calcAnswer(i-1)
        }
        calcCoefficients();
        calcAnswer(sys.length - 1);
        console.log("u:" + us);
        console.log("v:" + vs);
        function check() {
            let res = '';
            const getR = i => getD(i) - getA(i) * ( i > 0 ? xs[i - 1] : 0) - getB(i) * xs[i] - getC(i)*( i < xs.length - 1 ? xs[i + 1] : 0);
            for(let j = 0; j < xs.length; ++j)
                res += `Невязка для ${j}: ${getR(j)}\n`
            return res;
        }
        alert(runOutput(xs, check()));
    }

    const sys = getSystem();
    runMethod(sys);

    //output(sys);

}
function runOutput(xs, check) {
    let string = '';
    for(let a = 0; a < xs.length; a++)
            string += xs[a] + ', ';
    string += '\n' + check;
    return string;
}

module.exports = {
    calc,
    runcalc,
    autofill,
};
