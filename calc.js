// JavaScript code
const calculatorDisplay = document.getElementById('calculator-display'); // Selecting the calculator display

// Selecting all the buttons
const buttons = document.querySelectorAll('button');

// Adding click event listener to all buttons
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Get the text content of the clicked button
        const buttonText = button.textContent;

        // Check if the displayed content is '0' or an operator and update the display accordingly
        if (calculatorDisplay.textContent === '0' || isNaN(calculatorDisplay.textContent)) {
            calculatorDisplay.textContent = buttonText;
        } else {
            calculatorDisplay.textContent += buttonText;
        }
    });
});
