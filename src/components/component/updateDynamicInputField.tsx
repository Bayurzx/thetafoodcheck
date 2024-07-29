import React from 'react';

interface DynamicInputFieldProps {
  inputList: string[];
  setInputList: (list: string[]) => void;
  isEditing: boolean;
}

const UpdateDynamicInputField: React.FC<DynamicInputFieldProps> = ({
  inputList,
  setInputList,
  isEditing,
}) => {
  const handleInputChange = (index: number, value: string) => {
    const newList = [...inputList];
    newList[index] = value;
    setInputList(newList);
  };

  const handleAddInput = () => {
    setInputList([...inputList, '']);
  };

  const handleRemoveInput = (index: number) => {
    const newList = inputList.filter((_, i) => i !== index);
    setInputList(newList);
  };

  return (
    <div>
      {inputList.map((item, index) => (
        <div key={index} className="flex items-center mb-2">
          {isEditing ? (
            <>
              <input
                type="text"
                value={item}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="mr-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => handleRemoveInput(index)}
                className="px-2 py-1 bg-red-600 text-white rounded-md"
              >
                Remove
              </button>
            </>
          ) : (
            <p>{item}</p>
          )}
        </div>
      ))}
      {isEditing && (
        <button
          type="button"
          onClick={handleAddInput}
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Add
        </button>
      )}
    </div>
  );
};

export default UpdateDynamicInputField;
