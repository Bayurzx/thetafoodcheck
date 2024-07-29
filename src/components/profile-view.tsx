import Image from 'next/image'
import React from 'react'

function ProfileView() {
    return (
        <>
            <div>ProfileView</div>
            <section className="p-20">
                <div className="container mx-auto">
                    <div className="flex justify-center">
                        <div className="flex flex-col gap-5 text-center">
                            <Image 
                                alt='Profile Image'
                                className="rounded-full bg-gray-50 h-52 w-56 mx-auto" 
                                src="https://avatars.githubusercontent.com/u/8538468?v=4" 
                                width={150}
                                height={150}
                            />
                            <div className="flex flex-col gap-3">
                                <h1 className="font-bold text-4xl">Maruf Sharia</h1>
                                <p className="text-gray-500 text-sm">Senior Full Stack Web Developer (Laravel, Vue, MySql)</p>
                            </div>
                            <a href="#" className="bg-gray-50 mx-auto w-32 text-center rounded-md p-2 border border-1 border-gray-100 hover:bg-white">Hire me</a>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default ProfileView