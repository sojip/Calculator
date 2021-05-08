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
    return a / b
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


let displayValue;
let opResult;
let a;
let b;
let previousOpRresult;
let display = document.querySelector(".screen");
let calcButtons = document.querySelectorAll(".calcButton");
let equalButton = document.querySelector("#equal");
let acButton = document.querySelector("#ac");
let clearButton = document.querySelector("#clear");
let operators = ["+", "-", "/", "*"];

function endTransition(e) {
    if (e.propertyName === 'transform') {
        this.classList.remove('clicked')
    }
}

//make calcButtons grow when clicked
calcButtons.forEach( (calcButton) => {
    calcButton.addEventListener( 'click', function(e) {
        calcButton.classList.add('clicked');
        populateDisplay(calcButton)
    })
    calcButton.addEventListener('transitionend', endTransition)
})

//populate the display when a button is clicked
function populateDisplay(calcButton) {
    if(calcButton.hasAttribute("data-num")) {
        let num = calcButton.dataset.num;
        //if there is an operation Result on the screen and the user presss a number
        // reset all variables and start fresh   
        if(String(opResult) === display.textContent) {
            opResult = undefined;
            a = undefined;
            b = undefined;
            displayValue = num;
            display.textContent = displayValue;
        }
        else {
            displayValue === undefined ? displayValue = num : displayValue += num;
            display.textContent = displayValue;
        }
        
    }
    if (calcButton.hasAttribute("data-operator")) {
        // if there is already a value on the screen and not an operator
        if (displayValue !== undefined && !operators.includes(displayValue[displayValue.length - 1]))  {
            let currentOperator = calcButton.dataset.operator;
            //Execute the previous operation if there is any
            let previousOp = operators.find( (operator) => {
                if (displayValue.includes(operator)) {
                    return true
                }
            })
            if(previousOp) {

                if (previousOpRresult < 0 && displayValue.length > String(previousOpRresult).length) {
                    a = previousOpRresult;
                    b = Math.abs(Number(displayValue.slice(String(a).length)));
                    let operator = displayValue.slice(String(a).length).split(b)[0];
                    previousOpRresult = operate(operator, a ,b);
                }
                else {
                    a = Number(displayValue.split(previousOp)[0]);
                    b = Number(displayValue.split(previousOp)[1].split(currentOperator)[0]);
                    previousOpRresult = operate(previousOp, a ,b);
                }

                displayValue = previousOpRresult + currentOperator;
                display.textContent = displayValue;
            }
            else {
                displayValue += currentOperator;
                display.textContent = displayValue;
            }            
        }  
    }
}


//operate when equal button is clicked
equalButton.addEventListener('click', function (){
    let operator = operators.find( (operator) => {
        if (displayValue.includes(operator)) {
            return true
        }
    })
    if(operator && displayValue.split(operator)[1]) {
        a = Number(displayValue.split(operator)[0]);
        b = Number(displayValue.split(operator)[1]);
        opResult = operate(operator, a, b);
        displayValue = String(opResult);
        display.textContent = displayValue;

}})

clearButton.addEventListener('click', function() {
    if(String(opResult) === display.textContent) {
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


