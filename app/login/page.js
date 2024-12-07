"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import TypewriterEffect from "@/components/Typewritter";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";  // Import useRouter for navigation

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const router = useRouter();  // Initialize useRouter

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://blog-b-lovat.vercel.app/user/login", { // Corrected URL
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json(); // Parse the response JSON

            if (response.ok) {
                toast.success("Login successful");
                localStorage.setItem("token", result.token);  // Correct token reference
                setFormData({
                    email: "",
                    password: "",
                });
                // Redirect to a protected page (e.g., dashboard)
                setTimeout(() => {

                    router.push("/");
                }, 1000);


            } else {
                // Display the error message from the server
                toast.error(`Login failed: ${result.message || "Unknown error"}`);
                console.error("Error in login:", result.message);
            }

        } catch (error) {
            // Handle fetch errors
            toast.error("An error occurred during login");
            console.error("Error during login:", error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[90vh]">
            <Toaster position="top-right" reverseOrder={false} />
            <div className="flex flex-col gap-3">

                <motion.div
                    className="w-full max-w-sm p-6 bg-white rounded-lg shadow-2xl shadow-slate-500 border-black border-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2 }}
                >

                    <h1 className="text-black md:text-3xl text-xl font-bold text-center mb-3" >Login</h1>



                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        {/* Email Input */}
                        <motion.div
                            className="space-y-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
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
                                className="bg-gray-200 w-full p-2.5 text-black border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </motion.div>

                        {/* Password Input */}
                        <motion.div
                            className="space-y-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
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
                            Sign In
                        </motion.button>
                    </motion.form>

                    {/* Sign Up Link */}
                    <div className="text-center mt-4">
                        <p className="text-sm text-black">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-indigo-600 hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
