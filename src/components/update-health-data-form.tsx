import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ObjectId } from 'mongodb';
import { getUserData, updateUserData } from '../lib/mongodb';

import UpdateDynamicInputField from './component/updateDynamicInputField';
import UpdateImageUpload from './component/updateImageUpload';
import UpdateHeightWeightInput from './component/updateHeightWeightInput';

export default function UpdateHealthDataForm() {
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    if (userId) {
      fetchUserData(userId as string);
    }
  }, [userId]);

  const fetchUserData = async (id: string) => {
    const data = await getUserData(id);
    setUserData(data);
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchUserData(userId as string); // Reset form to original data
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserData(userId as string, userData);
    setIsEditing(false);
  };

  const handleChange = (field: string, value: any) => {
    setUserData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Health Data</h1>
      <form onSubmit={handleSave}>
        <UpdateImageUpload
          photo={userData.photo}
          setPhoto={(photo) => handleChange('photo', photo)}
          isEditing={isEditing}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            {isEditing ? (
              <input
                id="name"
                type="text"
                value={userData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            ) : (
              <p>{userData.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
            {isEditing ? (
              <select
                id="gender"
                value={userData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}
          </div>

          <div>
            <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">Birthdate</label>
            {isEditing ? (
              <input
                id="birthdate"
                type="date"
                value={userData.birthdate}
                onChange={(e) => handleChange('birthdate', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            ) : (
              <p>{userData.birthdate}</p>
            )}
          </div>
        </div>

        <UpdateHeightWeightInput
          height={userData.height}
          heightUnit={userData.heightUnit}
          setHeight={(height) => handleChange('height', height)}
          setHeightUnit={(heightUnit) => handleChange('heightUnit', heightUnit)}
          weight={userData.weight}
          weightUnit={userData.weightUnit}
          setWeight={(weight) => handleChange('weight', weight)}
          setWeightUnit={(weightUnit) => handleChange('weightUnit', weightUnit)}
          isEditing={isEditing}
        />

        <div className="mt-6">
          <h3 className="text-base font-semibold text-gray-700">Allergies and Sensitivities</h3>
          <UpdateDynamicInputField
            inputList={userData.allergiesAndSensitivities}
            setInputList={(list) => handleChange('allergiesAndSensitivities', list)}
            isEditing={isEditing}
          />
        </div>

        <div className="mt-6">
          <h3 className="text-base font-semibold text-gray-700">Medications</h3>
          <UpdateDynamicInputField
            inputList={userData.medications}
            setInputList={(list) => handleChange('medications', list)}
            isEditing={isEditing}
          />
        </div>

        <div className="mt-6">
          <h3 className="text-base font-semibold text-gray-700">Medical Conditions</h3>
          <UpdateDynamicInputField
            inputList={userData.medicalConditions}
            setInputList={(list) => handleChange('medicalConditions', list)}
            isEditing={isEditing}
          />
        </div>

        <div className="mt-6">
          <h3 className="text-base font-semibold text-gray-700">Nutrient Deficiencies</h3>
          <UpdateDynamicInputField
            inputList={userData.nutrientDeficiencies}
            setInputList={(list) => handleChange('nutrientDeficiencies', list)}
            isEditing={isEditing}
          />
        </div>

        <div className="mt-6">
          <h3 className="text-base font-semibold text-gray-700">Previous Surgeries or Hospitalizations</h3>
          <UpdateDynamicInputField
            inputList={userData.previousSurgeriesOrHospitalizations}
            setInputList={(list) => handleChange('previousSurgeriesOrHospitalizations', list)}
            isEditing={isEditing}
          />
        </div>

        <div className="mt-6">
          <h3 className="text-base font-semibold text-gray-700">Family History of Chronic Diseases</h3>
          <UpdateDynamicInputField
            inputList={userData.familyHistoryOfChronicDiseases}
            setInputList={(list) => handleChange('familyHistoryOfChronicDiseases', list)}
            isEditing={isEditing}
          />
        </div>

        <div className="mt-6 flex justify-end">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleCancel}
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Save
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
