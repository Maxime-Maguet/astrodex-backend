import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

//route GET avec latitude et longitude
router.get("/", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "required latitude and longitude" });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_KEY}&units=metric`
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

export default router;