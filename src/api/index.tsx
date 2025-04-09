export const fetchWeatherData = async (city: string) => {
  const locationResponse = await fetch(
    `https://nominatim.openstreetmap.org/search?city=${city}&format=json`,
  );
  if (!locationResponse.ok) throw new Error('Error');
  const locationData = await locationResponse.json();

  if (locationData.length === 0) {
    throw new Error('Nicht gefunden');
  }

  const { lat, lon } = locationData[0];
  const weatherResponse = await fetch(
    ` https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=auto&current=temperature_2m,is_day,cloud_cover,precipitation,relative_humidity_2m,apparent_temperature,weather_code,rain,snowfall,wind_speed_10m&hourly=temperature_2m,weather_code,relative_humidity_2m,rain,snowfall,wind_speed_10m,precipitation,precipitation_probability,cloud_cover,is_day,wind_speed_10m`,
  );
  if (!weatherResponse.ok) throw new Error('Error');
  const weatherData = await weatherResponse.json();

  return { locationData, weatherData };
};
