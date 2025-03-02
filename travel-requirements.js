async function fetchTravelCosts() {
    let country = document.getElementById("countryInput").value.trim().toLowerCase();

    if (!country) {
        alert("Please enter a valid country name.");
        return;
    }

    // Format country name correctly (replace spaces with hyphens)
    country = country.replace(/\s+/g, '-'); 

    const url = `https://www.livingcost.org/api/v1/country?country=${country}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            alert("Country not found. Try another one.");
            return;
        }

        const prices = data.categories;

        document.getElementById("water-cost").innerText = `$${prices.water.toFixed(2)}`;
        document.getElementById("food-cost").innerText = `$${prices.restaurant.toFixed(2)}`;
        document.getElementById("accommodation-cost").innerText = `$${prices.hotel.toFixed(2)}`;
        document.getElementById("transport-cost").innerText = `$${prices.transport.toFixed(2)}`;
        document.getElementById("internet-cost").innerText = `$${prices.internet.toFixed(2)}`;
        document.getElementById("extra-budget").innerText = `$${(prices.hotel + prices.food + prices.transport) * 0.2}`;

        // Estimate total daily budget
        document.getElementById("budget-traveler").innerText = `$${(prices.food + prices.transport + 5).toFixed(2)}`;
        document.getElementById("midrange-traveler").innerText = `$${(prices.hotel + prices.food + prices.transport).toFixed(2)}`;
        document.getElementById("luxury-traveler").innerText = `$${(prices.hotel * 2 + prices.food * 2 + prices.transport * 2).toFixed(2)}`;

    } catch (error) {
        console.error("Error fetching travel costs:", error);
        alert("Failed to load travel cost data.");
    }
}
