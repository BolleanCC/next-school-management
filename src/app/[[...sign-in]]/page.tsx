"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Image from "next/image";

const LoginPage = () => {

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating Books */}
                <div className="absolute top-[10%] left-[5%] animate-float-slow opacity-20">
                    <div className="w-16 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg transform rotate-12"></div>
                </div>
                <div className="absolute top-[60%] left-[15%] animate-float-medium opacity-20">
                    <div className="w-12 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-lg transform -rotate-6"></div>
                </div>
                <div className="absolute top-[40%] right-[10%] animate-float-slow opacity-20">
                    <div className="w-14 h-18 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg shadow-lg transform rotate-[-15deg]"></div>
                </div>

                {/* Floating Circles */}
                <div className="absolute top-[20%] right-[20%] w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse-slow"></div>
                <div className="absolute bottom-[20%] left-[10%] w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-pulse-slow animation-delay-2000"></div>
                <div className="absolute top-[70%] right-[15%] w-24 h-24 bg-indigo-200 rounded-full opacity-20 animate-pulse-slow animation-delay-4000"></div>

                {/* Pencils */}
                <div className="absolute top-[30%] left-[20%] animate-float-medium opacity-15">
                    <div className="w-2 h-24 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full shadow-md transform rotate-45"></div>
                </div>
                <div className="absolute bottom-[30%] right-[25%] animate-float-slow opacity-15">
                    <div className="w-2 h-20 bg-gradient-to-b from-red-400 to-red-600 rounded-full shadow-md transform -rotate-30"></div>
                </div>

                {/* Graduation Cap */}
                <div className="absolute top-[15%] right-[30%] animate-float-slow opacity-10">
                    <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 transform rotate-45"></div>
                        <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-amber-600 transform -translate-x-1/2"></div>
                    </div>
                </div>

                {/* Stars */}
                <div className="absolute top-[25%] left-[40%] animate-twinkle opacity-30">
                    <div className="text-yellow-400 text-2xl">⭐</div>
                </div>
                <div className="absolute top-[50%] right-[40%] animate-twinkle animation-delay-1000 opacity-30">
                    <div className="text-yellow-400 text-xl">⭐</div>
                </div>
                <div className="absolute bottom-[35%] left-[30%] animate-twinkle animation-delay-2000 opacity-30">
                    <div className="text-yellow-400 text-3xl">⭐</div>
                </div>
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md mx-4">
                <SignIn.Root>
                    <SignIn.Step
                        name="start"
                        className="bg-white/90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl flex flex-col gap-6 border border-white/20"
                    >
                        {/* Header */}
                        <div className="text-center space-y-2">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="relative">
                                    <Image
                                        src="/logo.png"
                                        alt="School Logo"
                                        width={48}
                                        height={48}
                                        className="drop-shadow-lg"
                                    />
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                School Management
                            </h1>
                            <p className="text-gray-500 text-sm">Welcome back! Please sign in to continue</p>
                        </div>

                        <Clerk.GlobalError className="text-sm text-red-500 bg-red-50 p-3 rounded-lg" />

                        {/* Username Field */}
                        <Clerk.Field name="identifier" className="flex flex-col gap-2">
                            <Clerk.Label className="text-sm font-medium text-gray-700">
                                Username
                            </Clerk.Label>
                            <Clerk.Input
                                type="text"
                                required
                                className="px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                                placeholder="Enter your username"
                            />
                            <Clerk.FieldError className="text-xs text-red-500" />
                        </Clerk.Field>

                        {/* Password Field */}
                        <Clerk.Field name="password" className="flex flex-col gap-2">
                            <Clerk.Label className="text-sm font-medium text-gray-700">
                                Password
                            </Clerk.Label>
                            <Clerk.Input
                                type="password"
                                required
                                className="px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                                placeholder="Enter your password"
                            />
                            <Clerk.FieldError className="text-xs text-red-500" />
                        </Clerk.Field>

                        {/* Submit Button */}
                        <SignIn.Action
                            submit
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                        >
                            Sign In
                        </SignIn.Action>

                        {/* Footer */}
                        <div className="text-center text-xs text-gray-400 pt-4 border-t border-gray-100">
                            Secure login powered by modern authentication
                        </div>
                    </SignIn.Step>
                </SignIn.Root>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                
                @keyframes float-medium {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(-5deg); }
                }
                
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1); opacity: 0.2; }
                    50% { transform: scale(1.1); opacity: 0.3; }
                }
                
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
                
                .animate-float-slow {
                    animation: float-slow 6s ease-in-out infinite;
                }
                
                .animate-float-medium {
                    animation: float-medium 4s ease-in-out infinite;
                }
                
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
                
                .animate-twinkle {
                    animation: twinkle 3s ease-in-out infinite;
                }
                
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default LoginPage;