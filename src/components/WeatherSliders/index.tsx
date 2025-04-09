import Slider from 'react-slick';
import { useWeatherQuery } from '../hooks/useWeatherQuery';
import { weatherCodes } from '../../data/WeatherCode';
import { mapCloudCover } from '../CloudMapping';
import getWeatherImage from '../WeatherCategory';

export default function WeatherSlides() {
  const { data } = useWeatherQuery();
  if (!data?.weatherData || !data?.locationData) return null;

  const { weatherData } = data;
  const timezone = weatherData.timezone;
  const date = new Date();
  const currentHour = date.getHours();

  const convertToLocalTime = (time: string, timezone: string) => {
    const date = new Date(time);
    if (isNaN(date.getTime())) {
      return 'Ungültige Zeit';
    }

    return date.toLocaleString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const currentIndex = weatherData.hourly.time.findIndex((hour: string) => {
    const hourOfDay = new Date(hour).getHours();
    return hourOfDay >= currentHour + 1;
  });

  if (currentIndex === -1) return <div>Kein Index gefunden</div>;

  const hoursToShow = weatherData.hourly.time.slice(
    currentIndex,
    currentIndex + 6,
  );
  if (!hoursToShow.length) return <div>Keine Daten gefunden.</div>;

  const prevArrow = (
    <img className="slick-prev" src="/src/assets/svg/leftarrow.png" alt="" />
  );

  const nextArrow = (
    <img className="slick-next" src="/src/assets/svg/rightarrow.png" alt="" />
  );

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    draggable: false,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 2, draggable: false },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          draggable: true,
        },
      },
    ],
  };

  return (
    <div className="max-w-[550px] justify-self-center h-full bg-gradient-to-b sm:pb-10 lg:pb-0 from-white via-transparent to-sky-300 border-2 border-black shadow-md shadow-black rounded-md  relative">
      <div className="flex items-center justify-center bg-gradient-to-br from- via-white to-sky-200 border-b-2 border-black h-[45px] rounded-md">
        <h2 className="text-2xl font-bold text-black">
          In den nächsten 6 Stunden
        </h2>
      </div>

      <div className="sm:max-w-[350px] md:max-w-[500px] mx-auto">
        <Slider {...settings}>
          {hoursToShow.map((time: string, i: number) => {
            const index = currentIndex + i;
            const weatherCode = weatherData.hourly.weather_code[index];
            const cloudCover = weatherData.hourly.cloud_cover[index];
            const weatherDescription =
              weatherCodes.find((item) => item.code === weatherCode)
                ?.description || 'Keine Beschreibung verfügbar';
            const weatherCategory =
              weatherCodes.find((item) => item.code === weatherCode)
                ?.category || 'Keine Beschreibung verfügbar';

            const preciseWeatherDescription =
              weatherData.hourly.rain[index] > 0
                ? weatherDescription
                : mapCloudCover(cloudCover)?.description;

            const preciseWeatherCategory =
              weatherData.hourly.rain[index] > 0
                ? weatherCategory
                : mapCloudCover(cloudCover)?.category;

            const weatherImage = getWeatherImage(
              weatherData.hourly.rain[index] > 0
                ? weatherCode
                : mapCloudCover(cloudCover)?.code,
              weatherData.current.is_day,
              preciseWeatherCategory,
            );

            return (
              <div
                key={time}
                className="slick-slide text-center bg-gradient-to-b from-white via-white to-transparent border-2 border-black rounded-lg shadow-md shadow-black font-bold min-h-[390px]"
              >
                <p>Uhrzeit: {convertToLocalTime(time, timezone)} </p>
                <p>Temperatur: {weatherData.hourly.temperature_2m[index]}°C</p>
                <img
                  src={weatherImage}
                  alt={preciseWeatherDescription}
                  className="w-full h-[120px] object-contain my-2"
                />
                <div>
                  <p>Wind: {weatherData.hourly.wind_speed_10m[index]} km/h</p>
                  <p>
                    Niederschlag:{' '}
                    {weatherData.hourly.precipitation_probability[index]}%
                  </p>
                  <br />
                  <p>
                    Wettervorhersage: <br /> {preciseWeatherDescription}
                  </p>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
      <img
        src="/src/assets/svg/handright.png"
        alt=""
        className="absolute bottom-2 w-10 h-10 right-5 sm:block md:hidden"
      />
      <img
        src="/src/assets/svg/handleft.png"
        alt=""
        className="absolute bottom-2 w-10 h-10 left-5 sm:block md:hidden"
      />
    </div>
  );
}
