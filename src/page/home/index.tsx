import WeatherComponent from '../../components/WeatherComponent';
import CityInput from '../../components/CityInput/index';
import { CityProvider } from '../../components/CityContext';

export default function Home() {
  return (
    <>
      <div className="text-center min-h-screen bg-bluesky w-full bg-cover bg-bottom sm:py-10 lg:p-6">
        <CityProvider>
          <CityInput />
          <div className="flex gap-x-5 justify-evenly lg:flex-row lg:mt-5 sm:mt-0 sm:flex-col ">
            <WeatherComponent />
          </div>
        </CityProvider>
      </div>
    </>
  );
}
