// JavaScript code
//const calculatorDisplay = document.getElementById('calculator-display'); // Selecting the calculator display

// Selecting all the buttons
//const buttons = document.querySelectorAll('button');

// Adding click event listener to all buttons
//buttons.forEach(button => {
    //button.addEventListener('click', function() {
        // Get the text content of the clicked button
        //const buttonText = button.textContent;

        // Check if the displayed content is '0' or an operator and update the display accordingly
        //if (calculatorDisplay.textContent === '0' || isNaN(calculatorDisplay.textContent)) {
            //calculatorDisplay.textContent = buttonText;
        //} else {
            //calculatorDisplay.textContent += buttonText;
        //}
    //});
//});
// to ensure the keys are working
//const calculator = document.querySelector('.flex-container');

//calculator.addEventListener('click', e => {
    //if (e.target.matches('button')) {
        //const key = e.target;
        //const usage = key.dataset.usage;

        //if (!usage) {
            //console.log('number keys');
        //} else if (usage === 'add' || usage === 'sub' || usage === 'multiply' ||
                   //usage === 'divide' || usage === 'percentage' || usage === 'plus-or-minus') {
            //console.log('operator keys');
        //} else if (usage === 'clear') {
            //console.log('clear key');
        //} else if (usage === 'sum-up') {
            //console.log('equal key');
        //} else if (usage === 'decimal') {
            //console.log('decimal key')
        //}
    //}
//});

// To ensure the key display on the screen

const calculatorDisplay = document.getElementById('calculator-display');
const numberButtons = document.querySelectorAll('.number-btn');

// Add event listeners to number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.textContent;
        // Get the current content of the display
        let currentDisplay = calculatorDisplay.textContent;

        // If the display is '0' or an operator is clicked, replace the content
        if (currentDisplay === '0' || isOperator(currentDisplay)) {
            calculatorDisplay.textContent = number;
        } else {
            // Otherwise, append the number to the existing display content
            calculatorDisplay.textContent += number;
        }
        currentDisplay = calculatorDisplay.textContent;
        const lastCharacter = currentDisplay[currentDisplay.length - 1];
        
        // Check if the last character is an operator, if not, evaluate the expression
        if (!isOperator(lastCharacter)) {
            const result = evaluateExpression(currentDisplay);
            calculatorDisplay.textContent = result.toString();
        }
    });
});

function evaluateExpression(expression) {
    try {
        // Replace 'X' with '*' for multiplication and evaluate the expression
        const evaluatedResult = eval(expression.replace(/X/g, '*'));
        return evaluatedResult;
    } catch (error) {
        return 'Error';
    }
}

function updateDisplayWithOperator(operator) {
    let currentDisplay = calculatorDisplay.textContent;
    
    // If the last character is an operator, replace it with the new operator
    if (isOperator(currentDisplay[currentDisplay.length - 1])) {
        calculatorDisplay.textContent = currentDisplay.slice(0, -1) + operator;
    } else {
        calculatorDisplay.textContent += operator;
    }
}

// Helper function to check if a character is an operator
function isOperator(char) {
    return ['+', '-', 'X', '/', '%'].includes(char);
}

const equalsButton = document.querySelector('.key--equal');

// Add event listener to equals button
equalsButton.addEventListener('click', () => {
    let currentExpression = calculatorDisplay.textContent;

    // Split the expression to extract numbers and operator
    const [num1, operator, num2] = currentExpression.split(/(?=[+\-X/])/);

    if (num1 && operator && num2) {
        const result = calculateResult(parseFloat(num1), operator, parseFloat(num2));
        calculatorDisplay.textContent = result.toString();
    }
});

// Function to perform calculation based on operator and numbers
function calculateResult(num1, operator, num2) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case 'X':
            return num1 * num2;
        case '/':
            return num2 !== 0 ? num1 / num2 : 'Error: Division by zero';
        case '%':
            return (num1 * num2) / 100;
        default:
            return 'Error: Invalid operation';
    }
}

const clearButton = document.querySelector('[data-usage="clear"]');

// Add event listener to clear button
clearButton.addEventListener('click', () => {
    calculatorDisplay.textContent = '0'; // Reset display to '0'
    currentOperator = null; // Reset stored operator
});

const decimalButton = document.querySelector('[data-usage="decimal"]');
const signToggleButton = document.querySelector('[data-usage="plus-or-minus"]');

// Add event listener to decimal button
decimalButton.addEventListener('click', () => {
    const currentDisplay = calculatorDisplay.textContent;

    // Check if the current display already contains a decimal point
    if (!currentDisplay.includes('.')) {
        calculatorDisplay.textContent += '.';
    }
});

// Add event listener to sign toggle button
signToggleButton.addEventListener('click', () => {
    let currentDisplay = calculatorDisplay.textContent;

    // Check if the current display is a number (not an operator)
    if (!isOperator(currentDisplay)) {
        const number = parseFloat(currentDisplay);
        calculatorDisplay.textContent = (-number).toString();
    }
});
