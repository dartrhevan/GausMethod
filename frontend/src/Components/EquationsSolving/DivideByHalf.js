function f(x) {
    const fun = document.getElementById('fun');
    return eval(fun.value.replace('x', '('+x+')'));
}

function d(x) {
    return (f(x + Number.MIN_VALUE) - f(x)) / Number.MIN_VALUE;
}

function d2(x){
    return (d(x + Number.MIN_VALUE) - f(x)) / Number.MIN_VALUE;
}

export function calcDivideByHalf() {
    const delta = document.getElementById('delta');
    const beg = document.getElementById('beg');
    const end = document.getElementById('end');
    const res = document.getElementById('res');
    let d = Number.parseFloat(delta.value), a = Number.parseFloat(beg.value), b = Number.parseFloat(end.value), middle = 0.0;
    while (Math.abs(a - b) > d && Math.abs(f(a) - f(b)) > d) {
        middle = (a + b) / 2;
        let fa = f(a);
        let fb = f(b);
        let fm = f(middle);
        if (fa * fm < 0)
            b = middle;
        else if (fb * fm < 0)
            a = middle;
        else
        {
            res.innerHTML = middle;
            break;
        }
    }
    middle = (a + b) / 2;
    res.innerHTML = middle;
}

function getX(x){
    return x - f(x) / d(x);
}

export function calcNewton() {
    const delta = document.getElementById('delta');
    const beg = document.getElementById('beg');
    const end = document.getElementById('end');
    const res = document.getElementById('res');
    let d = Number.parseFloat(delta.value), a = Number.parseFloat(beg.value), b = Number.parseFloat(end.value), x = f(a)*d2(a) > 0 ? a : b;
    while (Math.abs(x - getX(x)) > d) {
        x = getX(x);
        let fa = f(a);
        let fb = f(b);
        let fm = f(x);
        if (fa * fm < 0)
            b = x;
        else if (fb * fm < 0)
            a = x;
        else
        {
            res.innerHTML = x;
            break;
        }
    }
    x = getX(x);
    res.innerHTML = x;
}
