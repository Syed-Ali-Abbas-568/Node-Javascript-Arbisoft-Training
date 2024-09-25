const weatherForm = document.getElementById('weatherForm');
const resultDiv = document.getElementById('result');

const createWeatherTable = (hourlyData) => {
    const tableRows = hourlyData.slice(0, 24).map(hour => {
        const date = new Date(hour.dt * 1000);
        return `
            <tr>
                <td>${date.toLocaleTimeString()}</td>
                <td>${hour.temp.toFixed(1)}</td>
                <td>${hour.weather[0].description}</td>
                <td>${hour.humidity}</td>
            </tr>
        `;
    }).join('');

    return `
        <h2>Hourly Weather Data</h2>
        <table>
            <tr>
                <th>Time</th>
                <th>Temperature (°C)</th>
                <th>Description</th>
                <th>Humidity (%)</th>
            </tr>
            ${tableRows}
        </table>
    `;
};

const createAlerts = (alerts) => {
    if (!alerts || alerts.length === 0) return '';

    const alertHtml = alerts.map(alert => `
        <div class="alert">
            <h3>${alert.event}</h3>
            <p>${alert.description}</p>
            <p>From: ${new Date(alert.start * 1000).toLocaleString()}</p>
            <p>To: ${new Date(alert.end * 1000).toLocaleString()}</p>
        </div>
    `).join('');

    return `
        <h2>Weather Alerts</h2>
        ${alertHtml}
    `;
};

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const lat = document.getElementById('lat').value;
    const lon = document.getElementById('lon').value;

    try {
        const response = await axios.post('/weather', { lat: lat, lon: lon });
        const data = response.data;
        
        const weatherTable = createWeatherTable(data.hourly);
        const alertsHtml = createAlerts(data.alerts);

        resultDiv.innerHTML = weatherTable + alertsHtml;
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = '<p>Error fetching weather data. Please try again.</p>';
    }
});