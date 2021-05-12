let displayValue;
let opResult;
let a;
let b;
let previousOpRresult;
let display = document.querySelector(".screen");
let calcButtons = Array.from(document.querySelectorAll(".calcButton"));
let equalButton = document.querySelector("#equal");
let acButton = document.querySelector("#ac");
let clearButton = document.querySelector("#clear");
let operators = ["+", "-", "/", "*"];

function endTransition(e) {
    if (e.propertyName === 'transform') {
        e.target.classList.remove('clicked');
    }
    return
}

//populate the display when a button is clicked
function populateDisplay(e) {
    let calcButton = e.target;
    calcButton.classList.add('clicked');
    if(calcButton.hasAttribute("data-num")) {
        let num = calcButton.dataset.num;
        //if there is an operation Result on the screen and the user press a number or if there is error
        // reset all variables and start fresh   
        if(display.textContent === String(opResult) || display.textContent === "Error") {
            opResult = undefined;
            previousOpRresult = undefined;
            a = undefined;
            b = undefined;
            displayValue = num;
            
        }
        else {
            displayValue === undefined ? displayValue = num : displayValue += num;
        }
        display.textContent = displayValue;
    }
    else if (calcButton.hasAttribute("data-operator")) { 
        // if there is already a value on the screen and if an operator has not been already selected
        if (displayValue !== undefined && !operators.includes(displayValue[displayValue.length - 1]) && displayValue !== "Error")  {
            let currentOperator = calcButton.dataset.operator;
            //Execute the previous operation if there is any
            let previousOp = operators.find( (operator) => {
                if (displayValue.slice(1).includes(operator)) {
                    return true
                }
            })
            if(previousOp) {
                a = Number(displayValue.slice(0, displayValue.slice(1).indexOf(previousOp) + 1));
                b = Number(displayValue.slice(String(a).length + 1));
                (operate(previousOp, a, b) === "Error" ||  isNaN(operate(previousOp, a, b))) ? previousOpRresult = "Error" : previousOpRresult =  Math.round(operate(previousOp, a, b));
                previousOpRresult === "Error" ? displayValue = previousOpRresult : displayValue = previousOpRresult + currentOperator;
            }
            else {
                displayValue += currentOperator;
            }
            display.textContent = displayValue;             
        }  
    }
}


calcButtons.forEach(calcButton => calcButton.addEventListener('transitionend', endTransition));
calcButtons.forEach(calcButton => calcButton.addEventListener( 'click', populateDisplay));


//operate when equal button is clicked
equalButton.addEventListener('click', function (){
    let operator = operators.find( (operator) => {
        if (displayValue.slice(1).includes(operator)) {
            return true
        }
    })

    if(operator && displayValue.slice(1).split(operator)[1]) {
        a = Number(displayValue.slice(0, displayValue.slice(1).indexOf(operator) + 1));
        b = Number(displayValue.slice(String(a).length + 1));
        (operate(operator, a, b) === "Error" || isNaN(operate(operator, a, b))) ? opResult = "Error" : opResult =  Math.round(operate(operator, a, b));
        displayValue = String(opResult);
        display.textContent = displayValue;

    }
})

clearButton.addEventListener('click', function() {
    if(display.textContent === String(opResult) || display.textContent === "Error" ) {
        displayValue = undefined;
        opResult = undefined;
        a = undefined;
        b = undefined;
        previousOpRresult = undefined;
        display.textContent = "";
    }
    else {
        displayValue = displayValue.slice(0, displayValue.length - 1);
        display.textContent = displayValue;
    }
})

acButton.addEventListener('click', function() {
    displayValue = undefined;
    opResult = undefined;
    a = undefined;
    b = undefined;
    previousOpRresult = undefined;
    display.textContent = "";
})



function add (a,b) {
    return a + b
}

function substract (a,b) {
    return a - b
}

function multiply (a,b) {
    return a * b
}

function divide (a,b) {
    let result;
    b === 0 ? result = "Error" : result = a / b;
    return result
}

function operate (operator, a, b) {
    let result;
    switch (operator) {
        case "+":
            result = add(a,b)
            break
        case "-":
            result = substract(a,b)
            break
        case "*":
            result = multiply(a,b)
            break
        case "/":
            result = divide(a,b)
            break
    }
    return result
}


