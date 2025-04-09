import { createContext, useState, ReactNode } from 'react';

interface CityContextType {
  city: string;
  setCity: (value: string) => void;
}
const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [city, setCity] = useState<string>('');

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};

export { CityContext };
