'use client'

import { PiBowlFood } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { FiGithub } from "react-icons/fi";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from 'react';
import { IconType } from 'react-icons';

interface ProviderButtonProps {
    provider: string;
    icon: IconType;
    label: string;
}


function OAuthLogin() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/home";
    const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

    const handleClick = async (providerName: string) => {
        setLoadingProvider(providerName);
        try {
            await signIn(providerName, { callbackUrl });
        } catch (error) {
            console.error("Sign-in error:", error);
        } finally {
            setLoadingProvider(null);
        }
    }

    const LoadingSpinner = () => (
        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
    );

    const ProviderButton: React.FC<ProviderButtonProps> = ({ provider, icon: Icon, label }) => (
        <button
            className={`group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 ${
                loadingProvider === provider ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => handleClick(provider)}
            disabled={loadingProvider === provider}
        >
            <div className="relative flex items-center space-x-4 justify-center">
                {loadingProvider === provider ? (
                    <LoadingSpinner />
                ) : (
                    <Icon className="absolute left-0 w-5" />
                )}
                <span className="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-[#EC4989] sm:text-base">
                    {loadingProvider === provider ? `Signing in with ${label}...` : `Continue with ${label}`}
                </span>
            </div>
        </button>
    );

    return (
        <div className="h-screen w-screen bg-gray-400">
            <div className="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center">
                <div className="relative container m-auto px-6">
                    <div className="m-auto md:w-7/12">
                        <div className="rounded-xl bg-white dark:bg-gray-800 shadow-xl">
                            <div className="p-8">
                                <div className="space-y-4">
                                    <PiBowlFood className="w-[70px] h-[70px] text-[#EC4989]" />
                                    <h2 className="mb-8 text-2xl text-cyan-900 dark:text-white font-bold text-center">
                                        Authenticate to access <br />
                                        <span className="text-[#EC4989]">FoodCheck AI</span>.
                                    </h2>
                                </div>

                                <div className="mt-10 grid space-y-4">
                                    <ProviderButton provider="google" icon={FcGoogle} label="Google" />
                                    <ProviderButton provider="github" icon={FiGithub} label="Github" />
                                </div>

                                <div className="mt-14 space-y-4 py-3 text-gray-600 dark:text-gray-400 text-center">
                                    <p className="text-xs">
                                        By proceeding, you agree to our
                                        <a href="/privacy-policy/" target="_blank" rel="noopener noreferrer" className="underline">Terms of Use</a>
                                        and confirm you have read our
                                        <a href="/tos/" target="_blank" rel="noopener noreferrer" className="underline">Privacy and Cookie Statement</a>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OAuthLogin