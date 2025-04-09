import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData } from '../../../api';
import { useCity } from '../useCity';

export const useWeatherQuery = () => {
  const { city } = useCity();

  return useQuery({
    queryKey: ['weather', city],
    queryFn: () => fetchWeatherData(city),
    staleTime: Infinity,
    enabled: !!city,
    refetchInterval: 60000,
  });
};
