import Image from 'next/image';
import React from 'react';
import { LineChart } from './charts/line-chart';

function DashboardView() {
    return (
        <>
            <section className="bg-[#071e34] flex flex-col md:flex-row font-medium justify-center rounded-lg p-6">

                <section className="px-8 py-6 mx-5 my-5 mb-6 md:mb-0 w-64 bg-[#20354b] rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">2d ago</span>
                        <span className="text-emerald-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg>
                        </span>
                    </div>
                    <div className="mt-6 w-fit mx-auto">
                        <Image
                            className="rounded-full w-28"
                            height={100}
                            width={100}
                            src="https://avatars.githubusercontent.com/u/8538468?v=4"
                            alt="dashboard picture"
                        />
                    </div>
                    <div className="mt-8">
                        <h2 className="text-white font-bold text-2xl tracking-wide">Jonathan <br /> Smith</h2>
                    </div>
                    <p className="text-emerald-400 font-semibold mt-2.5">Active</p>
                    <div className="h-1 w-full bg-black mt-8 rounded-full">
                        <div className="h-1 rounded-full w-2/5 bg-yellow-500" />
                    </div>
                    <div className="mt-3 text-white text-sm">
                        <span className="text-gray-400 font-semibold">Storage:</span>
                        <span>40%</span>
                    </div>
                </section>

                <section className="px-8 py-6 mx-5 my-5 mb-6 md:mb-0 w-64 bg-[#20354b] rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">2d ago</span>
                        <span className="text-emerald-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg>
                        </span>
                    </div>
                    <div className="mt-6 w-fit mx-auto">
                        <Image
                            className="rounded-full w-28"
                            height={100}
                            width={100}
                            src="https://avatars.githubusercontent.com/u/8538468?v=4"
                            alt="dashboard picture"
                        />
                    </div>
                    <div className="mt-8">
                        <h2 className="text-white font-bold text-2xl tracking-wide">Jonathan <br /> Smith</h2>
                    </div>
                    <p className="text-emerald-400 font-semibold mt-2.5">Active</p>
                    <div className="h-1 w-full bg-black mt-8 rounded-full">
                        <div className="h-1 rounded-full w-2/5 bg-yellow-500" />
                    </div>
                    <div className="mt-3 text-white text-sm">
                        <span className="text-gray-400 font-semibold">Storage:</span>
                        <span>40%</span>
                    </div>
                </section>

            </section>



            <section className="bg-[#071e34] flex flex-col md:flex-row font-medium justify-center rounded-lg p-6">
                <section className="mx-5 flex-1 bg-[#20354b] rounded-2xl p-6 shadow-lg">
                    <LineChart type="line" height="100%" width="100%" />
                </section>
            </section>

        </>
    );
}

export default DashboardView;
