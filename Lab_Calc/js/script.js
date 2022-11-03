function createCalculatorWithHistory() {
    const container = document.createElement('div');
    container.classList.add('container');
    const calculator = document.createElement('div');
    calculator.classList.add('calculator');
    const calc_title = document.createElement('div');
    calc_title.classList.add('title');
    calc_title.innerText = 'Simple calculator';
    const display = document.createElement('div');
    display.classList.add('display');
    calculator.append(calc_title, display);
    const plus = document.createElement('div');
    plus.innerText = '+';
    plus.classList.add('item');
    plus.onclick = printItem;
    const clean_sign = document.createElement('div');
    clean_sign.innerText = 'C';
    clean_sign.classList.add('item', 'clean');
    clean_sign.onclick = clean;
    const backspace_sign = document.createElement('div');
    backspace_sign.innerText = '\u21D0';
    backspace_sign.classList.add('item' , 'backspace');
    backspace_sign.onclick = backspace;
    const equal_sign = document.createElement('div');
    equal_sign.classList.add('item', 'equal');
    equal_sign.onclick = equal;
    const equal_span = document.createElement('span');
    equal_span.innerText = '=';
    equal_sign.append(equal_span);
    const minus = document.createElement('div');
    minus.innerText = '-';
    minus.classList.add('item');
    minus.onclick = printItem;
    const one = document.createElement('div');
    one.innerText = '1';
    one.classList.add('item', 'digit');
    one.onclick = printItem;
    const two = document.createElement('div');
    two.innerText = '2';
    two.classList.add('item', 'digit');
    two.onclick = printItem;
    const three = document.createElement('div');
    three.innerText = '3';
    three.classList.add('item', 'digit');
    three.onclick = printItem;
    const multiply = document.createElement('div');
    multiply.innerText = "×";
    multiply.classList.add('item');
    multiply.onclick = printItem;
    const four = document.createElement('div');
    four.innerText = '4';
    four.classList.add('item', 'digit');
    four.onclick = printItem;
    const five = document.createElement('div');
    five.innerText = '5';
    five.classList.add('item', 'digit');
    five.onclick = printItem;
    const six = document.createElement('div');
    six.innerText = '6';
    six.classList.add('item', 'digit');
    six.onclick = printItem;
    const divide = document.createElement('div');
    divide.innerText = '/';
    divide.classList.add('item');
    divide.onclick = printItem;
    const seven = document.createElement('div');
    seven.innerText = '7';
    seven.classList.add('item', 'digit');
    seven.onclick = printItem;
    const eight = document.createElement('div');
    eight.innerText = '8';
    eight.classList.add('item', 'digit');
    eight.onclick = printItem;
    const nine = document.createElement('div');
    nine.innerText = '9';
    nine.classList.add('item', 'digit');
    nine.onclick = printItem;
    const openBracket = document.createElement('div');
    openBracket.innerText = '(';
    openBracket.classList.add('item');
    openBracket.onclick = printItem;
    const closeBracket = document.createElement('div');
    closeBracket.innerText = ')';
    closeBracket.classList.add('item');
    closeBracket.onclick = printItem;
    const zero = document.createElement('div');
    zero.innerText = '0';
    zero.classList.add('item', 'digit');
    zero.onclick = printItem;
    const point = document.createElement('div');
    point.innerText = '.';
    point.classList.add('item');
    point.onclick = printItem;
    calculator.append(
        plus, clean_sign, backspace_sign, equal_sign,
        minus, one, two, three,
        multiply, four, five, six,
        divide, seven, eight, nine,
        openBracket, closeBracket, zero, point
    );
    const history = document.createElement('div');
    history.classList.add('history');
    const history_title = document.createElement('div');
    history_title.classList.add('title');
    history_title.innerText = 'History';
    history.append(history_title);
    container.append(calculator, history);
    document.body.append(container);
}
const mathOperators = ['+', '-', '/', '×'];
function printItem() {
    const sign = this.innerText;
    const display = document.querySelector('.display');
    const lastChar =
        display.textContent.charAt(display.textContent.length - 1);
    if (mathOperators.includes(sign) &&
        mathOperators.includes(lastChar)) {
        display.textContent = display.textContent.slice(0, -1) + sign;
    } else if (display.textContent === 'Error') {
        display.textContent = sign;
    } else if (!(lastChar === '.' && sign === '.')) {
        display.textContent =
            display.textContent.replaceAll('+.', '+0.');
        display.textContent =
            display.textContent.replaceAll('-.', '-0.');
        display.textContent =
            display.textContent.replaceAll('/.', '/0.');
        display.textContent =
            display.textContent.replaceAll('×.', '×0.');
        if (display.textContent.charAt(0) === '.') {
            display.textContent =display.textContent.replace('.', '0.');
        }
        display.textContent += sign;
    }
}
function clean() {
    document.querySelector('.display').textContent = '';
}
function backspace() {
    const display = document.querySelector('.display');
    display.textContent = display.textContent.slice(0, -1);
}
function equal() {
    const display = document.querySelector('.display');
    let expression = display.textContent;
    if (expression.charAt(expression.length - 1) === '.') {
        expression = expression.slice(0, -1);
    }
    let result;
    try {
        result = eval(expression.replaceAll('×', '*'));
    } catch (e) {
        result = 'Error';
    }
    display.textContent = result;
    addEntryToHistory(expression, result);
}
function addEntryToHistory(expression, result) {
    const newEntry = document.createElement('div');
    newEntry.className = 'entry';
    newEntry.textContent = expression + ' = ' + result;
    document.querySelector('.history').append(newEntry);
}
createCalculatorWithHistory();