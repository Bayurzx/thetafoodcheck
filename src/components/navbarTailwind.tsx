'use client'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { HiBars3, HiOutlineBell, HiXMark } from "react-icons/hi2";
import DappsNavbar from '@/components/dapps-navbar'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from "react"
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation'
import Link from 'next/link';

// import { ThemeToggle } from "@/components/theme-toggle"
const ThemeToggle = dynamic(() => import('@/components/theme-toggle').then(module => module.ThemeToggle), {
    ssr: false, // Ensure this is only rendered on the client-side
})



const navigation = [
    { name: 'Home', href: '/home' },
    { name: 'Dashboard', href: '/home/dashboard' },
    { name: 'Form', href: '/home/form' },
    { name: 'Profile', href: '/home/profile' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function NavbarTaiwind() {
    const pathname = usePathname()

    const { data: session, status } = useSession()
    const [photo, setPhoto] = useState<string>('');

    useEffect(() => {
        if (status === "authenticated" && session.user) {

            setPhoto(session.user.image ?? "")
        }
    }, [status, session]);



    const handleSignOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        signOut({ callbackUrl: '/' }) // Redirect to home page after sign out
    }


    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <HiBars3 aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <HiXMark aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <Link href="/" passHref>
                                <div className="cursor-pointer">
                                    <Image
                                        className="h-8 w-auto"
                                        alt="Your Company"
                                        src="/foodcheck.svg"
                                        width={32}
                                        height={32}
                                    />
                                </div>
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => {
                                    const isCurrent = pathname === item.href;
                                    return (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            aria-current={isCurrent ? 'page' : undefined}
                                            className={classNames(
                                                isCurrent ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium',
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    )
                                })}
                                <div className="ml-5">
                                    <DappsNavbar />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* <button
                            type="button"
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <HiOutlineBell aria-hidden="true" className="h-6 w-6" />
                        </button> */}
                        <ThemeToggle />

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    {/* <Image
                                        src={photo}
                                        width={0}
                                        height={0}
                                        alt='Profile Picture'
                                        className="h-8 w-8 rounded-full"
                                        blurDataURL="/placeholder-user.jpg"
                                        placeholder="blur"
                                    /> */}

                                    <Image
                                        src={photo || '/placeholder-user.jpg'}
                                        height={0}
                                        width={0}
                                        alt="Profile Picture"
                                        className="h-8 w-8 rounded-full"
                                    />
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <MenuItem>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                        Your Profile
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                        Settings
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <Link href="#" onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                        Sign out
                                    </Link>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => {
                        const isCurrent = pathname === item.href;
                        return (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                aria-current={isCurrent ? 'page' : undefined}
                                className={classNames(
                                    isCurrent ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                )}
                            >
                                {item.name}
                            </DisclosureButton>
                        )
                    })}
                </div>
                <div className="ml-5">
                    <DappsNavbar />
                </div>

            </DisclosurePanel>
        </Disclosure>
    )
}
