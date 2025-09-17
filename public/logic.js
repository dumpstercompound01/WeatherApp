const btn = document.getElementById('getWeather');
const cityInput = document.getElementById('city');
const resultDiv = document.getElementById('result');

btn.addEventListener('click', async () => {
  const city = cityInput.value.trim();
  if (!city) {
    resultDiv.textContent = 'Please enter a city name! 🌷';
    return;
  }

  resultDiv.textContent = 'Loading... 🌈';
  
  try {
    const res = await fetch(`/weather/${encodeURIComponent(city)}`);
    
    if (!res.ok) {
      console.error(`Error: ${res.status} - ${res.statusText}`);
      throw new Error('City not found or server error.');
    }
    
    const data = await res.json();
    
    if (data.cod && data.cod !== 200) {
      throw new Error(data.message || 'Unknown error from weather API');
    }
    
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    
    resultDiv.innerHTML = `
      <img src="${icon}" alt="weather icon" class="icon" />
      <div class="temp">${Math.round(data.main.temp)}°C</div>
      <div class="desc">${data.weather[0].description}</div>
      <div>🌸 ${data.name}, ${data.sys.country} 🌸</div>
    `;
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    resultDiv.textContent = 'Oops! City not found. Try again! 💖';
  }

});
