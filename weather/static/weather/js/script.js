async function getWeather() {
    const city = document.getElementById('city').value;

    const response = await fetch('/weather/get_weather/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': getCookie('csrftoken')  // Handle CSRF token
        },
        body: `city=${encodeURIComponent(city)}`
    });

    const data = await response.json();

    if (data.error) {
        document.getElementById('weather-info').innerHTML = 'City not found.';
    } else {
        document.getElementById('weather-info').innerHTML = `
            <p><strong>City:</strong> ${data.city}, ${data.country}</p>
            <p><strong>Temperature:</strong> ${data.temperature}°C</p>
            <p><strong>Humidity:</strong> ${data.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind_speed} m/s</p>
            <p><strong>Description:</strong> ${data.description}</p>
            <p><strong>Pressure:</strong> ${data.pressure} hPa</p>
            <p><strong>Cloud Coverage:</strong> ${data.clouds}%</p>
            <p><strong>Sunrise:</strong> ${new Date(data.sunrise * 1000).toLocaleTimeString()}</p>
            <p><strong>Sunset:</strong> ${new Date(data.sunset * 1000).toLocaleTimeString()}</p>
        `;
    }
}

// Helper function to get the CSRF token (used for AJAX requests)
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
