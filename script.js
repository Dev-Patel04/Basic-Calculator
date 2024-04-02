// Initialize variables for the running total, current input buffer, and the last operation
let runningTotal = 0;
let buffer = "0";
let previousOperator;

// Grab the screen element for displaying output
const screen = document.querySelector('.screen');

// Function to handle button click events
function buttonClick(value){
    if(isNaN(value)){ // If the button clicked is not a number, handle it as a symbol
        handleSymbol(value);
    }else{ // Otherwise, handle it as a number
        handleNumber(value);
    }
    // Update the screen with the current buffer value
    screen.innerText = buffer;
}

// Function to handle symbols (operations and controls)
function handleSymbol(symbol){
    switch(symbol){
        case 'C': // Reset all values to initial state
            buffer = '0';
            runningTotal = 0;
            break;
        case '=': // Calculate the result based on the previous operator
            if(previousOperator == null){ // If there's no previous operator, do nothing
                return;
            }
            flushOperation(parseInt(buffer)); // Perform the calculation
            previousOperator = null;
            buffer = runningTotal.toString(); // Update buffer to show result
            runningTotal = 0; // Reset runningTotal
            break;

        case '←': // Handle backspace
            if(buffer.length === 1){
                buffer = '0'; // Reset buffer if only one digit
            }else{
                buffer = buffer.substring(0, buffer.length - 1); // Remove last character
            }
            break;

        // Handle mathematical operations by setting the previous operator
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

// Function to handle mathematical operations
function handleMath(symbol){
    if(buffer === '0'){ // If buffer is '0', do nothing
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer; // If no running total, current number becomes running total
    }else{
        flushOperation(intBuffer); // Otherwise, perform the operation
    }
    previousOperator = symbol; // Set the previous operator for next calculation
    buffer = '0'; // Reset buffer

}

// Perform the calculation based on the previous operator and current number
function flushOperation(intBuffer){
    switch(previousOperator){
        case '+': runningTotal += intBuffer; break;
        case '−': runningTotal -= intBuffer; break;
        case '×': runningTotal *= intBuffer; break;
        case '÷': runningTotal /= intBuffer; break;
    }
}

// Function to handle number input
function handleNumber(numberString){
    if(buffer === "0"){
        buffer = numberString; // Replace buffer if it's just '0'
    }else{
        buffer += numberString; // Append number to buffer
    }
}

// Initialize calculator by adding click event listener to calculator buttons
function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){buttonClick(event.target.innerText);})
}

// Call init to set up the calculator
init();
