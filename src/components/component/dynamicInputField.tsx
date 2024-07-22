import React from 'react';

interface DynamicInputFieldProps {
  label: string;
  fields: string[];
  setFields: React.Dispatch<React.SetStateAction<string[]>>;
  idPrefix: string;
}

const DynamicInputField: React.FC<DynamicInputFieldProps> = ({ label, fields, setFields, idPrefix }) => {
  const handleAddField = () => {
    setFields([...fields, '']);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newArray = [...fields];
    newArray[index] = e.target.value;
    setFields(newArray);
  };

  const handleRemoveField = (index: number) => {
    const newArray = [...fields];
    newArray.splice(index, 1);
    setFields(newArray);
  };

  return (
    <div className="sm:col-span-1 mt-6 mb-6">
      <label htmlFor={idPrefix} className="block text-md font-medium leading-6 text-gray-900 dark:text-gray-100">
        {label}
      </label>
      {fields?.map((field, index) => (
        <div key={index} className="flex items-center mt-3 mb-3">
          <input
            id={`${idPrefix}-${index}`}
            name={`${idPrefix}-${index}`}
            type="text"
            value={field}
            onChange={(e) => handleChange(e, index)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6 dark:bg-gray-800"
          />
          <button
            type="button"
            onClick={() => handleRemoveField(index)}
            className="mx-5 rounded-md bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddField}
        className="mt-2 rounded-md bg-green-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      >
        Add {label}
      </button>
    </div>
  );
};

export default DynamicInputField;
