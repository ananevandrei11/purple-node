const express = require("express");

const PORT = 8000;
const WEATHER_API_URL = "http://api.weatherapi.com/v1/current.json";
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

if (!WEATHER_API_KEY) {
  console.error("WEATHER_API_KEY is not set");
  process.exit(1);
}

const app = express();

app.get("/:city", async (req, res) => {
  const city = req.params.city;
  const url = new URL(WEATHER_API_URL);
  url.searchParams.append("key", WEATHER_API_KEY);
  url.searchParams.append("q", city);
  url.searchParams.append("lang", "sr");
  try {
    const weather = await fetch(url.href);
    const data = await weather.json();
    if (data.error) {
      res.status(404).send(data.error.message);
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("Failed to fetch weather data");
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on host: http://localhost:${PORT}`);
});
