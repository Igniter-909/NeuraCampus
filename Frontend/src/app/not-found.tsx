"use client"

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuth";
import { useEffect, useState } from "react";

export default function NotFound() {
    const router = useRouter();
    const { getUser } = useAuth();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleBack = () => {
        const currentPath = window.location.pathname;
        const newPath = currentPath.split('/').slice(0, -1).join('/');
        router.replace(newPath || '/');
    };

    const handleHome = () => {
        router.replace('/');
    };

    if (!isClient) {
        return null; // or a loading skeleton
    }

    const user = getUser();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center space-y-6 p-8 bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
                <h1 className="text-9xl font-bold text-blue-600">404</h1>
                
                <div className="space-y-2">
                    <h2 className="text-3xl font-semibold text-gray-800">Oops! Page Not Found</h2>
                    <p className="text-gray-600">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>

                <div className="border-t border-gray-200 pt-6">
                    {user ? (
                        <div className="flex flex-col items-center gap-3">
                            <button 
                                onClick={handleBack}
                                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                Back
                            </button>
                            <span className="text-sm text-gray-500">or</span>
                            <button 
                                onClick={handleHome}
                                className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                            >
                                Go to Home Page
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={handleHome}
                            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Back to Home
                        </button>
                    )}
                </div>

                {user && (
                    <p className="text-sm text-gray-500 mt-4">
                        Logged in as {user.email}
                    </p>
                )}
            </div>
        </div>
    );
}