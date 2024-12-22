// Function to get the CSRF token from the hidden input field
function getCSRFToken() {
    return document.getElementById('csrf_token').value;
}

// Function to append numbers to the calculator screen
function appendNumber(number) {
    document.getElementById('result').value += number;
}

// Function to append operators to the calculator screen
function appendOperator(operator) {
    document.getElementById('result').value += operator;
}

// Function to clear the calculator screen
function clearDisplay() {
    document.getElementById('result').value = '';
}

// Function to send the expression for calculation
async function calculateResult() {
    const expression = document.getElementById('result').value;
    
    // Get CSRF token
    const csrfToken = getCSRFToken();

    const response = await fetch('/calculator/calculate/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': csrfToken,  // Add CSRF token to headers
        },
        body: `expression=${encodeURIComponent(expression)}`,
    });

    const data = await response.json();

    if (data.result) {
        document.getElementById('result').value = data.result;
    } else {
        alert("Error in calculation.");
    }
}
