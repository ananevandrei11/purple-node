const express = require("express");

const PORT = 8000;
const WEATHER_API_URL = "http://api.weatherapi.com/v1/current.json";
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const app = express();

app.get("/:city", async (req, res) => {
  const city = req.params.city;
  const url = new URL(WEATHER_API_URL);
  url.searchParams.append("key", WEATHER_API_KEY);
  url.searchParams.append("q", city);
  url.searchParams.append("lang", "sr");
  const weather = await fetch(url.href);
  const data = await weather.json();
  if (data.error) {
    res.status(404).send(data.error.message);
  }
  res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log(`Example app listening on host: http://localhost:${PORT}`);
});
