import React, { useState } from 'react';

interface HeightWeightInputProps {
  height: string;
  setHeight: React.Dispatch<React.SetStateAction<string>>;
  heightUnit: string;
  setHeightUnit: React.Dispatch<React.SetStateAction<string>>;
  weight: string;
  setWeight: React.Dispatch<React.SetStateAction<string>>;
  weightUnit: string;
  setWeightUnit: React.Dispatch<React.SetStateAction<string>>;
}

const HeightWeightInput: React.FC<HeightWeightInputProps> = ({
  height,
  setHeight,
  heightUnit,
  setHeightUnit,
  weight,
  setWeight,
  weightUnit,
  setWeightUnit
}) => {
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const handleHeightUnitChange = () => {
    if (heightUnit === 'cm') {
      setHeightUnit('inches');
      setHeight((prevHeight) => (parseFloat(prevHeight) / 2.54).toFixed(2));
    } else {
      setHeightUnit('cm');
      setHeight((prevHeight) => (parseFloat(prevHeight) * 2.54).toFixed(2));
    }
  };

  const handleWeightUnitChange = () => {
    if (weightUnit === 'kg') {
      setWeightUnit('lbs');
      setWeight((prevWeight) => (parseFloat(prevWeight) * 2.20462).toFixed(2));
    } else {
      setWeightUnit('kg');
      setWeight((prevWeight) => (parseFloat(prevWeight) / 2.20462).toFixed(2));
    }
  };

  return (
    <div className="flex space-x-4 mt-6 mb-6">
      <div className="flex items-center space-x-2">
        <label htmlFor="height" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
          Height
        </label>
        <input
          id="height"
          name="height"
          type="text"
          value={height}
          onChange={handleHeightChange}
          className="block w-24 rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6 dark:bg-gray-800"
        />
        <button
          type="button"
          onClick={handleHeightUnitChange}
          className="rounded-md bg-gray-200 px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
        >
          {heightUnit === 'cm' ? 'cm' : 'in'}
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
          Weight
        </label>
        <input
          id="weight"
          name="weight"
          type="text"
          value={weight}
          onChange={handleWeightChange}
          className="block w-24 rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6 dark:bg-gray-800"
        />
        <button
          type="button"
          onClick={handleWeightUnitChange}
          className="rounded-md bg-gray-200 px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
        >
          {weightUnit === 'kg' ? 'kg' : 'lbs'}
        </button>
      </div>
    </div>
  );
};

export default HeightWeightInput;
