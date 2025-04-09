import { useContext } from 'react';
import { CityContext } from '../../CityContext';

export const useCity = () => {
  const context = useContext(CityContext);

  if (context === undefined) {
    throw new Error('useCity must be used with CityProvider');
  }

  return context;
};
