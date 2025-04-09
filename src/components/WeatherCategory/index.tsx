import dayClear from '../../assets/svg/sun.gif';
import rain from '../../assets/svg/rain.gif';
import snow from '../../assets/svg/snow.gif';
import storm from '../../assets/svg/storm.gif';
import fog from '../../assets/svg/foggy.gif';
import nightClear from '../../assets/svg/night.gif';
import cloudyDay from '../../assets/svg/cloudyday.gif';
import cloudyNight from '../../assets/svg/cloudynight.gif';

interface CloudImageMap {
  [key: string]: string;
}

const cloudImageMap: CloudImageMap = {
  clearDay: dayClear,
  clearNight: nightClear,
  cloudyDay: cloudyDay,
  cloudyNight: cloudyNight,
  rain: rain,
  snow: snow,
  storm: storm,
  fog: fog,
};

export default function getWeatherImage(
  code: number,
  isDay: boolean,
  category: string,
): string {
  if (code === 0) {
    return isDay ? cloudImageMap.clearDay : cloudImageMap.clearNight;
  }

  if (category.includes('Wolken')) {
    return isDay ? cloudImageMap.cloudyDay : cloudImageMap.cloudyNight;
  }
  if (category.includes('Regen')) {
    return cloudImageMap.rain;
  }
  if (category.includes('Schnee')) {
    return cloudImageMap.snow;
  }
  if (category.includes('Gewitter')) {
    return cloudImageMap.storm;
  }
  if (category.includes('Nebel')) {
    return cloudImageMap.fog;
  }

  return cloudImageMap.cloud;
}
