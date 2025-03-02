// Generate a Unique Universal UPI ID
function generateUPIID() {
    const bankName = document.getElementById("bankName").value.trim();
    const accountNumber = document.getElementById("accountNumber").value.trim();

    if (bankName === "" || accountNumber === "") {
        alert("Please enter your bank name and account number.");
        return;
    }

    // Convert bank name to an abbreviation (e.g., Bank of America → BOA)
    const bankShortCode = bankName.split(" ").map(word => word[0]).join("").toLowerCase();

    // Get the last 4 digits of the account number
    const last4Digits = accountNumber.slice(-4);

    // Generate a unique 4-character alphanumeric code
    const randomCode = Math.random().toString(36).substring(2, 6);

    // Create a unique UPI ID
    const upiID = `${bankShortCode}${last4Digits}-${randomCode}@universalupi`;

    document.getElementById("upiID").value = upiID;
    alert(`Your Universal UPI ID is: ${upiID}`);
}
