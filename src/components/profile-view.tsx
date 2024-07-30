'use client'
import React from 'react';
import Image from 'next/image';
import { useHealthData } from '@/app/providers/userDataContext';
import { calculateBMI, calculateBMI_Imp } from '@/lib/fx/conversion';

function ProfileView() {
    const { healthData, authData } = useHealthData();

    return (
        <>
            <div className="container mx-auto my-5 p-5">
                <div className="md:flex no-wrap md:-mx-2">
                    {/* Left Side */}
                    <div className="w-full md:w-3/12 md:mx-2">
                        {/* Profile Card */}
                        <div className="bg-white dark:bg-gray-900 p-3 border-t-4 border-green-400">
                            <div className="image overflow-hidden">
                                <Image
                                    className="h-auto w-full mx-auto"
                                    src={healthData?.photo || '/placeholder-user.jpg'}
                                    alt="Profile Image"
                                    height={100}
                                    width={100}
                                />
                            </div>
                            <h1 className="text-gray-900 dark:text-gray-200 font-bold text-xl leading-8 my-4 text-center">{authData?.name || 'N/A'}</h1>
                            <h3 className="text-gray-600 dark:text-gray-300 font-lg text-bold leading-6 my-2 text-center">{authData?.email || 'N/A'}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 leading-6 my-2 text-center">
                                Signed in with {authData?.provider || 'N/A'}
                            </p>
                            <ul className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-3">
                                    <span>Status</span>
                                    <span className="ml-auto">
                                        <span className={`py-1 px-2 rounded text-white text-sm ${healthData ? 'bg-green-500' : 'bg-red-500'}`}>
                                            {healthData ? 'Active' : 'Inactive'}
                                        </span>
                                    </span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Member since</span>
                                    <span className="ml-auto">{authData?.timestamp || 'N/A'}</span>
                                </li>
                            </ul>
                        </div>
                        {/* End of profile card */}
                        <div className="my-4" />
                    </div>

                    {/* Right Side */}
                    <div className="w-full md:w-9/12 mx-2">
                        {/* Profile tab */}
                        {/* About Section */}
                        <div className="bg-white dark:bg-gray-900 p-3 shadow-sm rounded-sm">
                            <div className="flex items-center space-x-2 font-bold text-gray-900 dark:text-gray-200 leading-8 mb-8">
                                <span className="text-green-500">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <span className="tracking-wide text-2xl">About</span>
                            </div>
                            <div className="text-gray-700 dark:text-gray-300">
                                <div className="grid md:grid-cols-2 text-sm">
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">First Name</div>
                                        <div className="px-4 py-2">{healthData?.name.split(' ')[0] || 'N/A'}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Last Name</div>
                                        <div className="px-4 py-2">{healthData?.name.split(' ').slice(1).join(' ') || 'N/A'}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Gender</div>
                                        <div className="px-4 py-2">{healthData?.gender || 'N/A'}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">User ID</div>
                                        <div className="px-4 py-2">{healthData?.userId || 'N/A'}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Height</div>
                                        <div className="px-4 py-2">{healthData?.height || 'N/A'} {healthData?.heightUnit || ''}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Weight</div>
                                        <div className="px-4 py-2">{healthData?.weight || 'N/A'} {healthData?.weightUnit || ''}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">BMI</div>
                                        <div className="px-4 py-2">
                                            {healthData?.height && healthData?.weight ?
                                                (healthData.height.includes('cm') ?
                                                    calculateBMI_Imp(healthData.weight, healthData.height) :
                                                    calculateBMI(healthData.weight, healthData.height))
                                                : 'N/A'}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Birthday</div>
                                        <div className="px-4 py-2">{healthData?.birthdate || 'N/A'}</div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* End of about section */}
                        <div className="my-4" />
                        {/* Experience and education */}
                        <div className="bg-white dark:bg-gray-900 p-3 shadow-sm rounded-sm overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div className='p-5'>
                                    <div className="flex items-center space-x-2 font-bold text-gray-900 dark:text-gray-200 leading-8 mb-3">
                                        <span className="text-green-500">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </span>
                                        <span className="tracking-wide">Allergies and Sensitivities</span>
                                    </div>
                                    <ul className="list-inside space-y-2">
                                        {healthData?.allergiesAndSensitivities?.map((allergy, index) => (
                                            <li key={index}>
                                                <div className="text-teal-600 dark:text-teal-400">{allergy}</div>
                                                <div className="text-gray-500 dark:text-gray-400 text-xs">Sensitive</div>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                                <div className='p-5'>
                                    <div className="flex items-center space-x-2 font-bold text-gray-900 dark:text-gray-200 leading-8 mb-3">
                                        <span className="text-green-500">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </span>
                                        <span className="tracking-wide">Medications</span>
                                    </div>
                                    <ul className="list-inside space-y-2">
                                        {healthData?.medications?.map((medication, index) => (
                                            <li key={index}>
                                                <div className="text-teal-600 dark:text-teal-400">{medication}</div>
                                                <div className="text-gray-500 dark:text-gray-400 text-xs">Medication</div>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </div>
                        </div>
                        {/* End of Experience and education grid */}
                        <div className="my-4" />
                        {/* Experience and education */}
                        <div className="bg-white dark:bg-gray-900 p-3 shadow-sm rounded-sm overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div className='p-5'>
                                    <div className="flex items-center space-x-2 font-bold text-gray-900 dark:text-gray-200 leading-8 mb-3">
                                        <span className="text-green-500">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </span>
                                        <span className="tracking-wide">Medical Conditions</span>
                                    </div>
                                    <ul className="list-inside space-y-2">
                                        {healthData?.medicalConditions?.map((condition, index) => (
                                            <li key={index}>
                                                <div className="text-teal-600 dark:text-teal-400">{condition}</div>
                                                <div className="text-gray-500 dark:text-gray-400 text-xs">Medical Condition</div>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                                <div className='p-5'>
                                    <div className="flex items-center space-x-2 font-bold text-gray-900 dark:text-gray-200 leading-8 mb-3">
                                        <span className="text-green-500">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </span>
                                        <span className="tracking-wide">Nutrient Deficiencies</span>
                                    </div>
                                    <ul className="list-inside space-y-2">
                                        {healthData?.nutrientDeficiencies?.map((deficiency, index) => (
                                            <li key={index}>
                                                <div className="text-teal-600 dark:text-teal-400">{deficiency}</div>
                                                <div className="text-gray-500 dark:text-gray-400 text-xs">Nutrient Deficiency</div>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </div>
                        </div>
                        {/* End of Experience and education grid */}
                        <div className="my-4" />
                        {/* Experience and education */}
                        <div className="bg-white dark:bg-gray-900 p-3 shadow-sm rounded-sm overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div className='p-5'>
                                    <div className="flex items-center space-x-2 font-bold text-gray-900 dark:text-gray-200 leading-8 mb-3">
                                        <span className="text-green-500">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </span>
                                        <span className="tracking-wide">Previous Surgeries Or Hospitalizations</span>
                                    </div>
                                    <ul className="list-inside space-y-2">
                                        {healthData?.previousSurgeriesOrHospitalizations?.map((surgery, index) => (
                                            <li key={index}>
                                                <div className="text-teal-600 dark:text-teal-400">{surgery}</div>
                                                <div className="text-gray-500 dark:text-gray-400 text-xs">Previous Surgery or Hospitalization</div>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                                <div className='p-5'>
                                    <div className="flex items-center space-x-2 font-bold text-gray-900 dark:text-gray-200 leading-8 mb-3">
                                        <span className="text-green-500">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </span>
                                        <span className="tracking-wide">Family History Of Chronic Diseases</span>
                                    </div>
                                    <ul className="list-inside space-y-2">
                                        {healthData?.familyHistoryOfChronicDiseases?.map((disease, index) => (
                                            <li key={index}>
                                                <div className="text-teal-600 dark:text-teal-400">{disease}</div>
                                                <div className="text-gray-500 dark:text-gray-400 text-xs">Chronic Disease in Family</div>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </div>
                        </div>
                        {/* End of Experience and education grid */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileView;
