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
    let result = document.getElementById('result');
    result.innerHTML = `<h3>Monthly Payment: ${monthlyPayment.toFixed(2)}</h3>`;

    for (let year = 0; year < loanTerm; year++) {
        result.innerHTML += `<h4>Year ${startYear + year}</h4>`;
        result.innerHTML += '<table border="1">';
        result.innerHTML += '<tr><th>Month</th><th>Balance</th><th>Interest Paid</th><th>Principal Paid</th></tr>';

        for (let month = 1; month <= 12; month++) {
            let monthNumber = year * 12 + month;
            let monthlyInterest = loanAmount * interestRate;
            let principalPaid = monthlyPayment - monthlyInterest;
            loanAmount -= principalPaid;

            result.innerHTML += `<tr><td>${monthNumber}</td><td>${loanAmount.toFixed(2)}</td><td>${monthlyInterest.toFixed(2)}</td><td>${principalPaid.toFixed(2)}</td></tr>`;
        }

        result.innerHTML += '</table>';
    }
}
