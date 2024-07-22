'use client'
import { useState } from "react";

const HealthDataForm2 = () => {
  const [fields, setFields] = useState<string[]>([""]);

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const values = [...fields];
    values[index] = event.target.value;
    setFields(values);
  };

  const handleAddField = () => {
    setFields([...fields, ""]);
  };

  const handleRemoveField = (index: number) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitted data:", fields);
    // You can handle the submission of the data here
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-12">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Health Data Form</h2>
            <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">Write a few sentences about yourself.</p>
              </div>
            {fields.map((field, index) => (
              <div key={index} className="mt-4 flex items-center">
                <input
                  type="text"
                  value={field}
                  onChange={(event) => handleInputChange(index, event)}
                  className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder={`Field ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(index)}
                  className="ml-2 p-2 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddField}
              className="mt-4 p-2 bg-blue-500 text-white rounded-md"
            >
              Add Field
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-green-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default HealthDataForm2;
