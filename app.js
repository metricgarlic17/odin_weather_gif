const weather_api = "38642U4QLEY8HKFWH8MVKS6DU";
const GIPHY_KEY = "PpMXOZtwr4BgJktphXt3GRjIhzCUow4d";

// Search function

const searchForm = document.getElementById("searchForm");
const locationInput = document.getElementById("locationInput");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const location = locationInput.value.trim();

  if (location === "") return;

  showLoading();

  weatherResult.innerHTML = "";

  try {
    const data = await fetchLocation(location, getUnitGroup());
    const cleaned = processWeatherData(data);
    await renderWeather(cleaned);
  } catch (err) {
    weatherResult.innerHTML = `<p>Error: ${err.message}</p>`;
    console.log(`Error: `, err.message);
  } finally {
    hideLoading();
  }
});

let lastLocation = "";

// Fetching data from the API

const fetchLocation = async (location, unitGroup) => {
  const encodedLocation = encodeURIComponent(location);

  const url =
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/` +
    `${encodedLocation}?key=${weather_api}&unitGroup=${unitGroup}&contentType=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed ${response.status}`);
  }
  return response.json();
};

// Destructuring the given weather data

const processWeatherData = (data) => {
  const today = data.days[0];

  return {
    address: data.resolvedAddress,
    timezone: data.timezone,

    today: {
      date: today.datetime,
      temp: today.temp,
      tempMax: today.tempmax,
      tempMin: today.tempmin,
      conditions: today.conditions,
      description: today.description,
      icon: today.icon,
    },
  };
};

// Showing the weather result

const weatherResult = document.getElementById("weatherResult");
const renderWeather = async (weather) => {
  const unit = getUnitSymbol();

  applyTheme(weather.today.icon);
  weatherResult.innerHTML = `
    <h2>${weather.address}</h2>
    <p>Date: ${weather.today.date}</p>
    <p>Temperature: ${weather.today.temp}${unit}</p>
    <p>High: ${weather.today.tempMax}${unit}</p>
    <p>Low: ${weather.today.tempMin}${unit}</p>
    <p>Conditions: ${weather.today.conditions}</p>
    <p>Description: ${weather.today.description}</p>
  `;

  gifBox.innerHTML = "";

  const query = getGifQuery(weather.today.icon);

  try {
    const gifUrl = await fetchGifUrl(query);
    renderGif(gifUrl, query);
  } catch (err) {
    gifBox.innerHTML = `<p>(No GIF: ${err.message})</p>`;
  }
};

// UnitToggle function

const unitToggle = document.getElementById("unitToggle");

const getUnitGroup = () => (unitToggle.checked ? "us" : "metric");
const getUnitSymbol = () => (unitToggle.checked ? "°F" : "°C");

unitToggle.addEventListener("change", async () => {
  if (!lastLocation) return;

  showLoading();

  try {
    const data = await fetchLocation(lastLocation, getUnitGroup());
    const cleaned = processWeatherData(data);
    await renderWeather(cleaned);
  } catch (err) {
    weatherResult.innerHTML = `<p>Error: ${err.message}</p>`;
    document.body.className = "default";
  } finally {
    hideLoading();
  }
});

// Theme changing based on weather

const applyTheme = (icon) => {
  document.body.className = "default";

  if (icon.includes("rain")) document.body.className = "rain";
  else if (icon.includes("snow")) document.body.className = "snow";
  else if (icon.includes("cloud")) document.body.className = "cloudy";
  else if (icon.includes("clear")) document.body.className = "clear";
};

const loadingEl = document.getElementById("loading");

const showLoading = () => {
  loadingEl.style.display = "block";
};

const hideLoading = () => {
  loadingEl.style.display = "none";
};

const gifBox = document.getElementById("gifBox");
const getGifQuery = (icon) => {
  if (icon.includes("rain")) return "pixel rainy weather";
  if (icon.includes("snow")) return "pixel snow weather";
  if (icon.includes("cloud")) return "pixel cloud weather";
  if (icon.includes("clear")) return "pixel sunny weather";
  return "weather";
};

const fetchGifUrl = async (query) => {
  const encoded = encodeURIComponent(query);

  const url =
    `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}` +
    `&q=${encoded}&limit=1&rating=g`;

  const response = await fetch(url);

  if (!response.ok) throw new Error(`Giphy request failed ${response.status}`);

  const json = await response.json();
  const first = json.data[0];
  if (!first) throw new Error("No GIF found for that weather.");

  return first.images.fixed_width.url; // safe, not too huge
};

const renderGif = (gifUrl, altText) => {
  gifBox.innerHTML = `<img src="${gifUrl}" alt="${altText}"/>`;
};
