let map;
let userLocation = null;
let markers = [];
let infowindow;
let geocoder;

// Initialize Google Map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
        zoom: 12,
    });

    infowindow = new google.maps.InfoWindow();
    geocoder = new google.maps.Geocoder();
    getUserLocation();
}

// Get User Location and Show It on Map
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                console.log("User Location:", userLocation);
                map.setCenter(userLocation);

                // Place marker for user's location
                new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: "Your Location",
                    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                });

                // Get address from coordinates
                geocoder.geocode({ location: userLocation }, (results, status) => {
                    if (status === "OK" && results[0]) {
                        document.getElementById("user-region").innerText = `You are in: ${results[0].formatted_address}`;
                    } else {
                        document.getElementById("user-region").innerText = "Region not found.";
                    }
                });

            },
            (error) => {
                console.error("Geolocation Error:", error);
                alert("Please allow location access.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// Find and Plot Nearby Banks
function findBank() {
    if (!userLocation) {
        alert("Waiting for location. Try again in a few seconds.");
        return;
    }

    let bankName = document.getElementById("bankName").value.trim().toLowerCase(); // Convert input to lowercase
    if (!bankName) {
        alert("Please enter a bank name.");
        return;
    }

    console.log(`Searching for banks: "${bankName}"`);

    const service = new google.maps.places.PlacesService(map);
    const request = {
        location: userLocation,
        radius: 5000, // 5 km search radius
        keyword: bankName + " bank", // Convert input to lowercase and append "bank"
    };

    service.nearbySearch(request, (results, status) => {
        console.log("Google Places API Response:", results, "Status:", status);

        if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
            clearMarkers();

            // **Case-insensitive filtering of bank names**
            const filteredResults = results.filter(place => place.name.toLowerCase().includes(bankName));

            if (filteredResults.length > 0) {
                displayResults(filteredResults);
                plotBankMarkers(filteredResults);
            } else {
                alert(`No branches of "${bankName}" found nearby. Showing all banks.`);
                displayResults(results);
                plotBankMarkers(results);
            }
        } else {
            alert(`No branches of "${bankName}" found nearby. Try using a broader name like "Bank".`);
        }
    });
}

// Display Bank Branches in List Below Map
function displayResults(results) {
    const resultsList = document.getElementById("bankResults");
    resultsList.innerHTML = "";

    results.forEach((place) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${place.name}</strong><br>${place.vicinity}`;
        resultsList.appendChild(li);
    });
}

// Plot Banks on the Map with Clickable InfoWindows
function plotBankMarkers(results) {
    results.forEach((place) => {
        let marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name,
        });

        // Info window when clicked
        google.maps.event.addListener(marker, "click", () => {
            infowindow.setContent(`<strong>${place.name}</strong><br>${place.vicinity}`);
            infowindow.open(map, marker);
        });

        markers.push(marker);
    });
}

// Clear Previous Markers
function clearMarkers() {
    markers.forEach((marker) => marker.setMap(null));
    markers = [];
}

// Ensure the map initializes on page load
window.onload = initMap;
