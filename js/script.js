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
    //Validate Input
    if (amountInput.value === '' || interestInput.value === '' || yearsInput.value === '') {
        alert('Please fill in all fields!');
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
        alert('Please check your numbers');
        return;
    } else {
        addResultsToDOM(monthly, total, interest);
    }
}

function addResultsToDOM(monthly, total, interest) {
    monthly.innerText = '$' + monthly;
    total.innerText = '$' + total;
    interest.innerText = '$' + interest;

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

//Event Listeners
loanForm.addEventListener('submit', onLoanFormSubmit);