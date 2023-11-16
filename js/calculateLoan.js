// calculateLoan.js

function calculateLoan() {
    // Read inputs
    let loanAmount = parseFloat(document.getElementById('loanAmount').value);
    let interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
    let loanTerm = parseInt(document.getElementById('loanTerm').value);
    let startYear = parseInt(document.getElementById('startYear').value);

    // Validate inputs
    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm) || isNaN(startYear)) {
        alert('Please enter valid numerical values.');
        return;
    }

    // Calculate monthly payment
    let monthlyRate = Math.pow(1 + interestRate, loanTerm * 12);
    let monthlyPayment = (loanAmount * monthlyRate * interestRate) / (monthlyRate - 1);

    // Generate and display amortization schedule
    let results = document.getElementById('results');
    results.innerHTML = '<h3>Amortization Schedule</h3>';
    results.innerHTML += '<table border="1">';
    results.innerHTML += '<tr><th>Year</th><th>Month</th><th>Interest</th><th>Principal</th><th>Balance</th></tr>';

    let loanBalance = loanAmount;

    for (let year = 0; year < 10; year++) {
        for (let month = 1; month <= 12; month++) {
            let monthNumber = year * 12 + month;
            let monthlyInterest = loanBalance * interestRate;
            let principalPaid = monthlyPayment - monthlyInterest;
            loanBalance -= principalPaid;

            results.innerHTML += `<tr><td>${startYear + year}</td><td>${monthNumber}</td><td>${monthlyInterest.toFixed(2)}</td><td>${principalPaid.toFixed(2)}</td><td>${loanBalance.toFixed(2)}</td></tr>`;
        }
    }

    results.innerHTML += '</table>';
}
