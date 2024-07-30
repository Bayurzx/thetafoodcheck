'use client'
import React from 'react';
import Image from 'next/image';
import { useHealthData } from '@/app/providers/userDataContext';


function ProfileViewTwo() {
    const { healthData } = useHealthData();
    

    return (
        <>
            <div className="container mx-auto my-5 p-5 overflow-auto">
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
                            <h1 className="text-gray-900 dark:text-gray-200 font-bold text-xl leading-8 my-1">{healthData?.name || 'N/A'}</h1>
                            <h3 className="text-gray-600 dark:text-gray-300 font-lg text-bold leading-6">User ID: {healthData?.userId || 'N/A'}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 leading-6">
                                {healthData ? `Gender: ${healthData.gender || 'N/A'}, Birthdate: ${healthData.birthdate || 'N/A'}` : 'No additional information available.'}
                            </p>
                            <ul className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-3">
                                    <span>Status</span>
                                    <span className="ml-auto">
                                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span>
                                    </span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Member since</span>
                                    <span className="ml-auto">Nov 07, 2016</span>
                                </li>
                            </ul>
                        </div>
                        {/* End of profile card */}
                        <div className="my-4" />
                    </div>

                    {/* Right Side */}
                    <div className="w-full md:w-9/12 mx-2 h-64">
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
                                        <div className="px-4 py-2 font-bold">Contact No.</div>
                                        <div className="px-4 py-2">N/A</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Current Address</div>
                                        <div className="px-4 py-2">N/A</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Permanent Address</div>
                                        <div className="px-4 py-2">N/A</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-bold">Email</div>
                                        <div className="px-4 py-2">
                                            <a className="text-blue-800 dark:text-blue-400" href="mailto:N/A">{healthData?.gender || 'N/A'}</a>
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
                        <div className="bg-white dark:bg-gray-900 p-3 shadow-sm rounded-sm h-64 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="flex items-center space-x-2 font-bold text-gray-900 dark:text-gray-200 leading-8 mb-3">
                                        <span className="text-green-500">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </span>
                                        <span className="tracking-wide">Experience</span>
                                    </div>
                                    <ul className="list-inside space-y-2">
                                        <li>
                                            <div className="text-teal-600 dark:text-teal-400">Owner at Her Company Inc.</div>
                                            <div className="text-gray-500 dark:text-gray-400 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div className="text-teal-600 dark:text-teal-400">Owner at Her Company Inc.</div>
                                            <div className="text-gray-500 dark:text-gray-400 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div className="text-teal-600 dark:text-teal-400">Owner at Her Company Inc.</div>
                                            <div className="text-gray-500 dark:text-gray-400 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div className="text-teal-600 dark:text-teal-400">Owner at Her Company Inc.</div>
                                            <div className="text-gray-500 dark:text-gray-400 text-xs">March 2020 - Now</div>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2 font-bold text-gray-900 dark:text-gray-200 leading-8 mb-3">
                                        <span className="text-green-500">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.042 12.042 0 0012 12c-3.315 0-6.16-1.68-6.16-1.68L12 14z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v10m0 0l6.16-3.422A12.042 12.042 0 0012 14c-3.315 0-6.16 1.68-6.16 1.68L12 14z" />
                                            </svg>
                                        </span>
                                        <span className="tracking-wide">Education</span>
                                    </div>
                                    <ul className="list-inside space-y-2">
                                        <li>
                                            <div className="text-teal-600 dark:text-teal-400">Masters in Computer Science</div>
                                            <div className="text-gray-500 dark:text-gray-400 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div className="text-teal-600 dark:text-teal-400">Bachelors in Computer Science</div>
                                            <div className="text-gray-500 dark:text-gray-400 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div className="text-teal-600 dark:text-teal-400">High School</div>
                                            <div className="text-gray-500 dark:text-gray-400 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div className="text-teal-600 dark:text-teal-400">High School</div>
                                            <div className="text-gray-500 dark:text-gray-400 text-xs">March 2020 - Now</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* End of Experience and education grid */}
                        <div className="my-4" />
                        {/* Experience and education */}
                        <div className="bg-white dark:bg-gray-900 p-3 shadow-sm rounded-sm h-64 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="flex items-center space-x-2 font-bold text-gray-900 dark:text-gray-200 leading-8 mb-3">
                                        <span className="text-green-500">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </span>
                                        <span className="tracking-wide">Experience</span>
                                    </div>
                                    <ul className="list-inside space-y-2">
                                        <li>
                                            <div className="text-teal-600 dark:text-teal-400">Owner at Her Company Inc.</div>
                                            <div className="text-gray-500 dark:text-gray-400 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div className="text-teal-600 dark:text-teal-400">Owner at Her Company Inc.</div>
                                            <div className="text-gray-500 dark:text-gray-400 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div className="text-teal-600 dark:text-teal-400">Owner at Her Company Inc.</div>
                                            <div className="text-gray-500 dark:text-gray-400 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div className="text-teal-600 dark:text-teal-400">Owner at Her Company Inc.</div>
                                            <div className="text-gray-500 dark:text-gray-400 text-xs">March 2020 - Now</div>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2 font-bold text-gray-900 dark:text-gray-200 leading-8 mb-3">
                                        <span className="text-green-500">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.042 12.042 0 0012 12c-3.315 0-6.16-1.68-6.16-1.68L12 14z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v10m0 0l6.16-3.422A12.042 12.042 0 0012 14c-3.315 0-6.16 1.68-6.16 1.68L12 14z" />
                                            </svg>
                                        </span>
                                        <span className="tracking-wide">Education</span>
                                    </div>
                                    <ul className="list-inside space-y-2">
                                        <li>
                                            <div className="text-teal-600 dark:text-teal-400">Masters in Computer Science</div>
                                            <div className="text-gray-500 dark:text-gray-400 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div className="text-teal-600 dark:text-teal-400">Bachelors in Computer Science</div>
                                            <div className="text-gray-500 dark:text-gray-400 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div className="text-teal-600 dark:text-teal-400">High School</div>
                                            <div className="text-gray-500 dark:text-gray-400 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div className="text-teal-600 dark:text-teal-400">High School</div>
                                            <div className="text-gray-500 dark:text-gray-400 text-xs">March 2020 - Now</div>
                                        </li>
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

export default ProfileViewTwo;
