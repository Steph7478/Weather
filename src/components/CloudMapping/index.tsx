import { weatherCodes } from '../../data/WeatherCode';

const cloudMapping = [
  { min: 0, max: 10, code: 0 },
  { min: 11, max: 49, code: 1 },
  { min: 50, max: 79, code: 1 },
  { min: 80, max: 100, code: 1 },
];
function mapCloudCover(cloudCover: number) {
  const range = cloudMapping.find(
    (range) => cloudCover >= range.min && cloudCover <= range.max,
  );
  if (!range)
    return { description: 'Unbekannt', code: -1, category: 'Unbekannt' };

  
  const weatherInfo = weatherCodes.find((item) => item.code === range.code);

  return {
    description: weatherInfo ? weatherInfo.description : 'Unbekannt',
    category: weatherInfo ? weatherInfo.category : 'Unbekannt',
    code: weatherInfo ? weatherInfo.code : -1,
  };
}

export { cloudMapping, mapCloudCover };
