const loanForm = document.getElementById('loan-form');
const amountInput = document.getElementById('loan-amount');
const interestInput = document.getElementById('loan-interest');
const yearsInput = document.getElementById('loan-years');
const loanResults = document.getElementById('loan-results');
const monthlyResult = document.getElementById('monthly-result');
const paymentResult = document.getElementById('payment-result');
const interestResult = document.getElementById('interest-result');
const errMsg = document.getElementById('error');

function onLoanFormSubmit(e) {
    e.preventDefault();

    resetUI();
    //Validate Input
    if (amountInput.value === '' || interestInput.value === '' || yearsInput.value === '') {
        showError('Please fill in all fields!');
        return;
    }
    const principal = parseFloat(amountInput.value);
    const monthlyInterest = parseFloat(interestInput.value) / 100 / 12;
    const numberOfPayments = parseFloat(yearsInput.value) * 12;

    calculateResults(principal, monthlyInterest, numberOfPayments);
}

function calculateResults(principal, monthlyInterest, numberOfPayments) {
    const x = Math.pow(1 + monthlyInterest, numberOfPayments);
    // Get monthly payment
    const monthly = ((principal * x * monthlyInterest) / (x - 1)).toFixed(2);
    // Get total payment
    const total = (monthly * numberOfPayments).toFixed(2);
    // Get total interest
    const interest = (monthly * numberOfPayments - principal).toFixed(2);

    if (isNaN(monthly)) {
        showError('Please check your numbers');
    } else {
        addResultsToDOM(monthly, total, interest);
    }
}

function addResultsToDOM(monthly, total, interest) {
    monthlyResult.innerText = '$' + monthly;
    paymentResult.innerText = '$' + total;
    interestResult.innerText = '$' + interest;

    showSpinnerAndResults(1);
}

function showSpinnerAndResults(seconds) {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
        loanResults.style.display = 'block';
    }, seconds * 1000);
}

function showError(message) {
    errMsg.style.transform = 'translateY(-450px) translateX(-50%)';
    errMsg.innerText = message;

    setTimeout(() => {
        errMsg.style.transform = 'translateY(-1000px) translateX(-50%)';
    }, 3000);
}

function resetUI() {
    loanResults.style.display = 'none';
    monthlyResult.innerText = '';
    paymentResult.innerText = '';
    interestResult.innerText = '';
}


//Event Listeners
loanForm.addEventListener('submit', onLoanFormSubmit);