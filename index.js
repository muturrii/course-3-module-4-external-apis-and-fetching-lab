const weatherApi = "https://api.weather.gov/alerts/active?area=";

const input = document.querySelector("#state-input");
const button = document.querySelector("#fetch-alerts");
const alertsDisplay = document.querySelector("#alerts-display");
const errorMessage = document.querySelector("#error-message");


async function fetchWeatherAlerts(state) {
    const fullEndpoint = `${weatherApi}${state}`;

    try {
        const response = await fetch(fullEndpoint);

        if (!response.ok) {
            throw new Error(`HTTP Error. Status: ${response.status}`);
        }

        const data = await response.json();

        errorMessage.textContent = "";
        errorMessage.classList.add("hidden");

        displayAlerts(data);

    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
    }
}


function displayAlerts(data) {
    alertsDisplay.replaceChildren();

    const heading = document.createElement("h2");
    heading.textContent = `${data.title}: ${data.features.length}`;

    alertsDisplay.appendChild(heading);

    data.features.forEach(alert => {
        const paragraph = document.createElement("p");

        paragraph.textContent = alert.properties.headline;

        alertsDisplay.appendChild(paragraph);
    });
}

button.addEventListener("click", () => {
    const state = input.value.trim().toUpperCase();

    fetchWeatherAlerts(state);

    input.value = "";
});
