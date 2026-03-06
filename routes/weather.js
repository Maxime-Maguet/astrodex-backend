var express = require("express");
var router = express.Router();
const WEATHER_KEY = process.env.OPENWEATHER_API_KEY;
//route GET avec latitude et longitude
router.get("/", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    // return res.status(400).json({ error: "wrong message" }); // test erreur
    return res.status(400).json({ error: "required latitude and longitude" });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`,
    );
    const data = await response.json();

    const weather = {
      temp: data.main.temp,
      clouds: data.clouds.all,
      visibility: data.visibility,
    };

    res.json(weather);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch weather data" });
  }
});

module.exports = router;
