const API_KEY = "8a6c784e18c961c9382e41dd"; // Replace with your actual API key
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;


async function convertCurrency() {
    let amount = document.getElementById("amount").value;
    let fromCurrency = document.getElementById("fromCurrency").value.toUpperCase();
    let toCurrency = document.getElementById("toCurrency").value.toUpperCase();

    if (!amount || isNaN(amount) || !fromCurrency || !toCurrency) {
        document.getElementById("conversionResult").textContent = "Please enter valid details.";
        return;
    }

    try {
        let response = await fetch(`${API_URL}${fromCurrency}`);
        let data = await response.json();

        if (data.result === "success" && data.conversion_rates[toCurrency]) {
            let conversionRate = data.conversion_rates[toCurrency];
            let convertedAmount = (amount * conversionRate).toFixed(2);
            document.getElementById("conversionResult").textContent = 
                `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        } else {
            document.getElementById("conversionResult").textContent = "Invalid currency code.";
        }
    } catch (error) {
        document.getElementById("conversionResult").textContent = "API Error. Try again later.";
    }
}
