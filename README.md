# 🌤️ Weather App

A simple weather forecast web application built using the **Visual Crossing Weather API**.

Users can search for a city, view current weather information, toggle between Celsius and Fahrenheit, and see the page theme change based on weather conditions. The app also displays a matching weather GIF using the Giphy API.

---

## 🚀 Features

- 🔍 Search for any city
- 🌡️ Toggle between °C and °F
- 🎨 Dynamic background theme based on weather
- 🎬 Weather-related GIF display (Giphy API)
- ⏳ Loading indicator while fetching data
- ❌ Error handling for invalid locations
- 📦 Clean and structured JavaScript functions

---

## 🛠️ Built With

- HTML
- CSS
- JavaScript (ES Modules)
- Visual Crossing Weather API
- Giphy API

---

## 📂 Project Structure

```
weather-app/
│
├── index.html
├── styles.css
├── app.js
└── README.md
```

---

## ⚙️ How It Works

1. User submits a city name.
2. The app fetches weather data from Visual Crossing.
3. The JSON response is processed into a smaller usable object.
4. Weather data is displayed on the page.
5. Background theme changes based on weather conditions.
6. A related GIF is fetched from Giphy and displayed.
7. Users can toggle between Celsius and Fahrenheit.

---

## 🔑 API Keys

This project uses:

- Visual Crossing Weather API
- Giphy API

API keys are stored in `app.js`.

⚠️ Note: In real production applications, API keys should never be exposed on the frontend. For this assignment, exposing the key is acceptable.

---

## 🌍 Live Demo

GitHub Pages link:

```
https://metricgarlic17.github.io/odin_weather_gif/
```

---

## 📚 Learning Goals

This project demonstrates:

- Fetch API usage
- Async/await
- Error handling
- DOM manipulation
- Basic state management
- Working with external APIs
- Conditional rendering
- Theming with CSS classes

---

## 📌 Future Improvements

- Add hourly forecast view
- Add 7-day forecast cards
- Improve mobile layout
- Add animated loading spinner
- Store last searched location in localStorage

---

## 🧑‍💻 Author

Metricgarlic
Computing Science Student
