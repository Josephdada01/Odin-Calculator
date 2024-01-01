const calculatorDisplay = document.getElementById('calculator-display');
const numberButtons = document.querySelectorAll('button');
const equalsButton = document.querySelector('.key--equal');
const clearButton = document.querySelector('[data-usage="clear"]');
const decimalButton = document.querySelector('[data-usage="decimal"]');
const signToggleButton = document.querySelector('[data-usage="plus-or-minus"]');

// Add event listeners to number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.textContent;
        let currentDisplay = calculatorDisplay.textContent;

        if (currentDisplay === '0' || isOperator(currentDisplay)) {
            calculatorDisplay.textContent = number;
        } else {
            calculatorDisplay.textContent += number;
        }

        currentDisplay = calculatorDisplay.textContent;
        const lastCharacter = currentDisplay[currentDisplay.length - 1];

        if (!isOperator(lastCharacter)) {
            const MAX_DISPLAY_LENGTH = 12; // Define your maximum display length
            if (currentDisplay.length > MAX_DISPLAY_LENGTH) {
                calculatorDisplay.textContent = parseFloat(currentDisplay).toExponential(MAX_DISPLAY_LENGTH - 5);
            }
        }
    });
});

// Function to evaluate mathematical expressions using Function constructor
function evaluateExpression(expression) {
    try {
        const evaluatedResult = Function('return ' + expression)();
        return evaluatedResult;
    } catch (error) {
        return 'Error';
    }
}

// Function to handle equal button click
equalsButton.addEventListener('click', () => {
    let currentExpression = calculatorDisplay.textContent;
    const regex = /(\d+\.?\d*)([+\-X/])(\d+\.?\d*)/;
    const match = currentExpression.match(regex);

    if (match) {
        const [_, num1, operator, num2] = match;
        const result = calculateResult(parseFloat(num1), operator, parseFloat(num2));
        if (result !== undefined) {
            calculatorDisplay.textContent = result.toString();
        } else {
            calculatorDisplay.textContent = 'Error';
        }
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
            return num2 !== 0 ? num1 / num2 : undefined;
        case '%':
            return (num1 * num2) / 100;
        default:
            return undefined;
    }
}

// Add event listener to clear button
clearButton.addEventListener('click', () => {
    calculatorDisplay.textContent = '0'; // Reset display to '0'
});

// Add event listener to decimal button
decimalButton.addEventListener('click', () => {
    const currentDisplay = calculatorDisplay.textContent;

    if (!currentDisplay.includes('.')) {
        calculatorDisplay.textContent += '.';
    }
});

// Add event listener to sign toggle button
signToggleButton.addEventListener('click', () => {
    let currentDisplay = calculatorDisplay.textContent;

    if (!isOperator(currentDisplay)) {
        const number = parseFloat(currentDisplay);
        calculatorDisplay.textContent = (-number).toString();
    }
});

// Helper function to check if a character is an operator
function isOperator(char) {
    return ['+', '-', 'X', '/', '%'].includes(char);
}