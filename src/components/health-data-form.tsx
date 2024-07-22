'use client'
import { useState, ChangeEvent, Dispatch, SetStateAction, FormEvent } from 'react';
import DynamicInputField from '@/components/component/dynamicInputField';
import HeightWeightInput from '@/components/component/heightWeightInput';
import { HiUserCircle } from 'react-icons/hi';
import ImageUpload from './component/imageUpload';

type Setter<T> = Dispatch<SetStateAction<T[]>>;

export default function HealthDataForm() {

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');

  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm'); // cm or inches
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg'); // kg or lbs
  const [photo, setPhoto] = useState<string>('');

  const [allergiesAndSensitivities, setAllergiesAndSensitivities] = useState<string[]>(['']);
  const [medications, setMedications] = useState<string[]>(['']);
  const [medicalConditions, setMedicalConditions] = useState<string[]>(['']);
  const [nutrientDeficiencies, setNutrientDeficiencies] = useState<string[]>(['']);
  const [previousSurgeriesOrHospitalizations, setPreviousSurgeriesOrHospitalizations] = useState<string[]>(['']);
  const [familyHistoryOfChronicDiseases, setFamilyHistoryOfChronicDiseases] = useState<string[]>(['']);

  const [birthdate, setBirthdate] = useState('');

  const personData = {
    name,
    gender,
    birthdate,
    height,
    heightUnit,
    weight,
    weightUnit,
    photo,
    allergiesAndSensitivities,
    medications,
    medicalConditions,
    nutrientDeficiencies,
    previousSurgeriesOrHospitalizations,
    familyHistoryOfChronicDiseases,
  }


  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdate(e.target.value);
  };

  const themeHr = () => <hr className="border-t-2 border-gray-900 dark:border-gray-100" />


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = personData;



    try {
      const response = await fetch('/api/db/insertHealthData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Data submitted successfully!');
        console.log(result);
        // Reset form or redirect as needed
      } else {
        alert('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('An error occurred while submitting the data');
    }
  };


  return (
    <div className="w-full flex justify-center py-12">
      <form className="w-full max-w-4xl px-4 lg:px-8">
        <div className="space-y-12">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">Profile</h2>

            <div className="border-b border-gray-900/10 pb-12 dark:border-gray-100">
              <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Use a permanent address where you can receive mail. Use a permanent address where you can receive mail.

              </p>

              <div className="sm:col-span-1 mt-3 mb-3">
                <label htmlFor="name" className="block text-md font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6 dark:bg-gray-800"
                    value={name}
                    onChange={(e) => setName(e.target.value)}

                  />
                </div>
              </div>
              {themeHr()}




              <ImageUpload photo={photo} setPhoto={setPhoto} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* Add similar blocks for gender, jobTitle, birthDate, height, weight */}


                {/* Repeat similar blocks for medicalConditions, medications */}

              </div>



              {themeHr()}

              {/* Gender and Birthdate input fields */}
              <div className="sm:col-span-1 mt-3 mb-6 flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6 dark:bg-gray-800"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}

                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label htmlFor="birthdate" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                    Birthdate
                  </label>
                  <input
                    id="birthdate"
                    name="birthdate"
                    type="date"
                    value={birthdate}
                    onChange={handleBirthdateChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6 dark:bg-gray-800"
                  />
                </div>
              </div>
              {themeHr()}



              <HeightWeightInput
                height={height}
                setHeight={setHeight}
                heightUnit={heightUnit}
                setHeightUnit={setHeightUnit}
                weight={weight}
                setWeight={setWeight}
                weightUnit={weightUnit}
                setWeightUnit={setWeightUnit}
              />
              {themeHr()}


              <div className='mt-6 mb-6'>

                <DynamicInputField
                  label="Allergies and Sensitivities"
                  fields={allergiesAndSensitivities}
                  setFields={setAllergiesAndSensitivities}
                  idPrefix="allergiesAndSensitivities"
                />
                {themeHr()}
              </div>


              <div className='mt-6 mb-6'>
                <DynamicInputField
                  label="Medications"
                  fields={medications}
                  setFields={setMedications}
                  idPrefix="medications"
                />
                {themeHr()}
              </div>





              <div className='mt-6 mb-6'>
                <DynamicInputField
                  label="Medical Conditions"
                  fields={medicalConditions}
                  setFields={setMedicalConditions}
                  idPrefix="medicalConditions"
                />
                {themeHr()}
              </div>

              <div className='mt-6 mb-6'>
                <DynamicInputField
                  label="Nutrient Deficiencies"
                  fields={nutrientDeficiencies}
                  setFields={setNutrientDeficiencies}
                  idPrefix="nutrientDeficiencies"
                />
                {themeHr()}
              </div>

              <div className='mt-6 mb-6'>
                <DynamicInputField
                  label="Previous Surgeries Or Hospitalizations"
                  fields={previousSurgeriesOrHospitalizations}
                  setFields={setPreviousSurgeriesOrHospitalizations}
                  idPrefix="previousSurgeriesOrHospitalizations"
                />
                {themeHr()}
              </div>

              <div className='mt-6 mb-6'>
                <DynamicInputField
                  label="Family History Of Chronic Diseases"
                  fields={familyHistoryOfChronicDiseases}
                  setFields={setFamilyHistoryOfChronicDiseases}
                  idPrefix="familyHistoryOfChronicDiseases"
                />
                {themeHr()}
              </div>


              <div className="w-20">
                {JSON.stringify(personData)}
              </div>



              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-3 py-2 text-sm font-semibold text-white dark:text-gray-200 shadow-sm hover:bg-indigo-500 dark:hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
