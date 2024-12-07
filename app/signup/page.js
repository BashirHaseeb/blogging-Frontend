"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import TypewriterEffect from "@/components/Typewritter";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from 'next/navigation';


export default function SignUp() {
    const router = useRouter(); // Use the router at the top of the component

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://blog-b-lovat.vercel.app/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                toast.success('Signup successful!');
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                });

                // Redirect to the login page
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                toast.error(`Signup failed: ${result.message}`);
            }

        } catch (error) {
            toast.error('An error occurred during signup');
            console.error('Error during signup:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[90vh]">
            {/* Toaster Container */}
            <Toaster position="top-right" reverseOrder={false} />

            <motion.div
                className="w-full max-w-sm p-6 bg-white rounded-lg shadow-2xl shadow-slate-500 border-black border-2 text-black "
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2 }}
            >
                <TypewriterEffect
                    texts={[

                        " Create Account",

                    ]}
                />

                <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-4 mt-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    {/* Name Input */}
                    <motion.div
                        className="space-y-1 "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <label htmlFor="name" className="text-sm font-medium text-black">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-gray-200 w-full p-2.5 text-black border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </motion.div>

                    {/* Email Input */}
                    <motion.div
                        className="space-y-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        <label htmlFor="email" className="text-sm font-medium text-black">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-gray-200  w-full p-2.5 text-black border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </motion.div>

                    {/* Password Input */}
                    <motion.div
                        className="space-y-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                    >
                        <label htmlFor="password" className="text-sm font-medium text-black">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="bg-gray-200 w-full p-2.5 text-black border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        className="w-full py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition duration-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.5 }}
                    >
                        Sign Up
                    </motion.button>

                </motion.form>

                {/* Sign In Link */}
                <div className="text-center mt-4">
                    <p className="text-sm text-black">
                        Already have an account?{" "}
                        <Link href="/login" className="text-indigo-600 hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
