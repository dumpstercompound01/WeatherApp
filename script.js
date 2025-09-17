const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3021;

const apiKey = "f6039798d0786cec4527239a2d4b0b3a"; 

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Weather API endpoint
app.get('/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🌸 Weather app running on http://localhost:${PORT}`);
});