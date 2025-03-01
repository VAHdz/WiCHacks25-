const API_KEY = "8a6c784e18c961c9382e41dd"; // Your API key
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

// Get elements
const chatbotToggle = document.getElementById("chatbotToggle");
const chatContainer = document.getElementById("chatContainer");
const closeChatbot = document.getElementById("closeChatbot");

// Show chatbot when clicked
chatbotToggle.addEventListener("click", () => {
    chatContainer.style.display = "flex"; // Show chatbot
});

// Close chatbot
closeChatbot.addEventListener("click", () => {
    chatContainer.style.display = "none"; // Hide chatbot
});

// Function to add messages to chat
function addMessage(text, sender) {
    let messageDiv = document.createElement("p");
    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageDiv.textContent = text;
    document.getElementById("chat-box").appendChild(messageDiv);
}

// Function to handle user input
function sendMessage() {
    let userInput = document.getElementById("userInput");
    let message = userInput.value.trim();
    
    if (message === "") return;

    // Add user message to chat
    addMessage(message, "user");

    // Process user request
    setTimeout(() => {
        processMessage(message);
    }, 500);

    userInput.value = ""; // Clear input field
}

// Function to process user messages
function processMessage(input) {
    const regex = /(\d+\.?\d*)\s*([a-zA-Z]{3})\s*to\s*([a-zA-Z]{3})/i;
    const match = input.match(regex);

    if (match) {
        let amount = parseFloat(match[1]);
        let fromCurrency = match[2].toUpperCase();
        let toCurrency = match[3].toUpperCase();
        fetchConversionRate(fromCurrency, toCurrency, amount);
    } else {
        addMessage("Please use the format: '100 USD to INR'", "bot");
    }
}

// Function to fetch exchange rate
async function fetchConversionRate(fromCurrency, toCurrency, amount) {
    try {
        let response = await fetch(`${API_URL}${fromCurrency}`);
        let data = await response.json();

        if (data.result === "success" && data.conversion_rates[toCurrency]) {
            let convertedAmount = (amount * data.conversion_rates[toCurrency]).toFixed(2);
            addMessage(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`, "bot");
        } else {
            addMessage("Invalid currency code.", "bot");
        }
    } catch (error) {
        addMessage("API Error. Try again later.", "bot");
    }
}

// Function to allow sending messages by pressing Enter
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
