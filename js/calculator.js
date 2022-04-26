let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        // this is not a number (NaN)
        handleSymbol(value); 
    } else {
        // this is a number (is not NaN)
        handleNumber(value);
    }
    screen.innerText = buffer; //.substring(0, 3);
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer = buffer + value;
    }
}

function handleSymbol(value) {  
    switch (value) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            break;
        case "=":
            if (previousOperator === null) {
                // you need two numbers to do math
                return; 
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;  
            buffer = runningTotal;
            runningTotal = 0;
            break; 
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "+":
        case "−":
        case "×":
        case "÷":
            handleMath(value);
            break; 
        case ".":
            // ! in this case means "not" - --> if buffer does not include "." <--
            if (!buffer.includes(".")) {
                handleNumber(value);
            }
            break;
    } 
}

function handleMath(value) {
    if (buffer === "0") {
        // do nothing
        return;
    }

    const intBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = value;

    buffer = "0";
}

function flushOperation (intBuffer) {
    if (previousOperator === "+") {
        runningTotal = runningTotal + intBuffer;
    } else if (previousOperator === "−") {
        runningTotal = runningTotal - intBuffer;
    } else if (previousOperator === "×") {
        runningTotal = runningTotal * intBuffer;
    } else {
        runningTotal = runningTotal / intBuffer;
    }
}

function init() {
    document.querySelector(".calc-buttons")
        .addEventListener("click", function(event) {
            buttonClick(event.target.innerText);
        });
}

init();