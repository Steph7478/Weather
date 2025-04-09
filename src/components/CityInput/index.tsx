import React, { useState } from 'react';
import { useCity } from '../hooks/useCity';
import { FcSearch } from 'react-icons/fc';

export default function CityInput() {
  const { setCity } = useCity();
  const [inputValue, setInputValue] = useState<string>('');

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCity(inputValue);
    setInputValue('');
  };

  return (
    <div className="lg:pb-2 sm:pb-5">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center"
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleCityChange}
          placeholder="Schreibe den Namen der Stadt"
          className="rounded-md w-[300px] shadow-md shadow-black border-2 border-black p-2 placeholder-shown:font-bold font-bold"
        />
        <button type="submit">
          <FcSearch className="w-10 h-10 hover:scale-105" />
        </button>
      </form>
    </div>
  );
}
