import { mapCloudCover } from '../CloudMapping';
import { weatherCodes } from '../../data/WeatherCode';
import WeatherSlides from '../WeatherSliders';
import getWeatherImage from '../WeatherCategory';
import { useWeatherQuery } from '../hooks/useWeatherQuery';

export default function WeatherComponent() {
  const { data, isLoading, isError } = useWeatherQuery();

  if (isError)
    return <div className="text-2xl font-bold text-white">Nicht gefunden</div>;

  if (isLoading)
    return <div className="text-2xl font-bold text-white">Laden...</div>;

  if (!data || !data.locationData || !data.weatherData) return null;

  const { locationData, weatherData } = data;

  const maxTemperature = Math.max(
    ...weatherData.hourly.temperature_2m.slice(0, 24),
  );
  const minTemperature = Math.min(
    ...weatherData.hourly.temperature_2m.slice(0, 24),
  );

  const displayName = locationData[0].name;

  const currentweatherDescription =
    weatherCodes.find((item) => item.code === weatherData.current.weather_code)
      ?.description || 'Keine Beschreibung verfügbar';

  const currentweatherCategory =
    weatherCodes.find((item) => item.code === weatherData.current.weather_code)
      ?.category || 'Keine Beschreibung verfügbar';

  const currentweatherCode =
    weatherCodes.find((item) => item.code === weatherData.current.weather_code)
      ?.code || -1;

  const currentCloud = weatherData.current.cloud_cover;
  const isDay = weatherData.current.is_day;

  const {
    description: cloudDescription,
    code: cloudCode,
    category: cloudCategory,
  } = mapCloudCover(currentCloud);

  const preciseCurrentWeatherDescription =
    weatherData.current.rain > 0 ? currentweatherDescription : cloudDescription;

  const preciseCurrentWeatherCategory =
    weatherData.current.rain > 0 ? currentweatherCategory : cloudCategory;

  const preciseCurrentWeatherCode =
    weatherData.current.rain > 0 ? currentweatherCode : cloudCode;

  const weatherImage = getWeatherImage(
    preciseCurrentWeatherCode,
    isDay,
    preciseCurrentWeatherCategory,
  );

  return (
    <>
      {data && (
        <>
          <div className="">
            <div className="bg-gradient-to-b from-white via-white  to-transparent w-[350px] h-[470px] rounded-md font-bold shadow-md shadow-black border-2 border-black p-5 flex flex-col lg:m-0 sm:my-5 justify-self-center">
              <h2 className="text-2xl">{displayName}</h2>
              <br />
              <div>
                <div>
                  <p>
                    Aktuelle Temperatur: {weatherData.current.temperature_2m}
                    °C{' '}
                  </p>
                  <p>
                    Gefühlte Temperatur:{' '}
                    {weatherData.current.apparent_temperature}
                    °C{' '}
                  </p>
                </div>
              </div>

              <br />

              <div className="flex flex-row justify-evenly ">
                <img
                  src={weatherImage}
                  alt={preciseCurrentWeatherDescription}
                  className="w-[120px] h-[120px] object-contain mb-2"
                />
                <div className="self-center">
                  <h3>Heute:</h3>
                  <p>Max: {maxTemperature}°C</p>

                  <p>Min: {minTemperature}°C</p>
                </div>
              </div>

              <br />

              <div className="flex-grow">
                <p>Wind: {weatherData.current.wind_speed_10m} km/h</p>
                <p>Luftfeuchte: {weatherData.current.relative_humidity_2m} %</p>
                <p>
                  <br />
                  Wettervorhersage: <br /> {preciseCurrentWeatherDescription}
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <WeatherSlides />
          </div>
        </>
      )}
    </>
  );
}
