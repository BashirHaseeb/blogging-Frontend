"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import TypewriterEffect from "@/components/Typewritter";

export default function AdminPanel() {

    const [admins, setAdmins] = useState([]);
    const [users, setUsers] = useState([]);
    const [personalInfo, setPersonalInfo] = useState(null);

    useEffect(() => {
        // Load Lord Icon script dynamically
        const script = document.createElement('script');
        script.src = "https://cdn.lordicon.com/lordicon.js";
        script.async = true;
        document.body.appendChild(script);

        // Cleanup the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);


    // Fetch personal info
    useEffect(() => {
        async function fetchPersonalInfo() {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("https://blog-b-lovat.vercel.app/user/api/admin/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    console.log(data)

                    setPersonalInfo(data);
                    toast.success("Welcome back!");
                } else {
                    const error = await res.json();
                    toast.error(`Error fetching info: ${error.message || res.statusText}`);
                }
            } catch (err) {
                toast.error(`Error: ${err.message}`);
            }
        }
        fetchPersonalInfo();
    }, []);



    // Fetch users
    useEffect(() => {
        async function fetchUsers() {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("https://blog-b-lovat.vercel.app/user/api/admin/users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    const adminUsers = data.filter((user) => user.role === "admin");
                    const regularUsers = data.filter((user) => user.role !== "admin");

                    setAdmins(adminUsers);
                    setUsers(regularUsers);
                    toast.success("Users fetched successfully!");
                } else {
                    const error = await res.json();
                    toast.error(`Error fetching users: ${error.message || res.statusText}`);
                }
            } catch (err) {
                toast.error(`Error: ${err.message}`);
            }
        }
        fetchUsers();
    }, []);



    // Delete user
    const deleteUser = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`https://blog-b-lovat.vercel.app/user/api/admin/users/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                setAdmins(admins.filter((user) => user._id !== id));
                setUsers(users.filter((user) => user._id !== id));
                toast.success("User deleted successfully!");
            } else {
                const error = await res.json();
                toast.error(`Failed to delete user: ${error.message}`);
            }
        } catch (err) {
            toast.error(`Error: ${err.message}`);
        }
    };



    return (
        <div className="min-h-screen p-6">
            <Toaster position="bottom-center" reverseOrder={false} />
            <div className="max-w-7xl mx-auto">

                {/* Personal Info Section */}
                {personalInfo && (
                    <motion.div
                        className="mb-8 p-6 rounded-md shadow-xl shadow-green-500 mt-5"
                        initial={{ opacity: 0, x: 50 }} // Start off-screen and invisible
                        animate={{ opacity: 1, x: 0 }}  // Animate to visible and on-screen position
                        transition={{ duration: 0.8, ease: "easeOut" }} // Control duration and easing

                    >
                        <h1 className="text-5xl font-bold ">
                            Welcome Back! {personalInfo.name}

                        </h1>
                        <p className="text-xl mt-4">
                            Role: <span className="font-semibold ">{personalInfo.role}</span>
                        </p>
                        <p className="text-xl mt-4">
                            email: <span className="font-semibold text-blue-500">{personalInfo.email}</span>
                        </p>
                        <p className="text-gray-500 mb-10">
                            {personalInfo.role === "admin"
                                ? "You have full access to manage the users."
                                : "You have limited access."}
                        </p>

                        {/* <TypewriterEffect text=" Learning never exhausts the mind. – Leonardo da Vinci" /> */}
                        <p className="overflow-auto">
                            <TypewriterEffect
                                texts={[
                                    " Creativity is intelligence having fun. – Albert Einstein",
                                    " Learning never exhausts the mind. – Leonardo da Vinci",
                                    " The mind is everything. – Buddha"
                                ]}
                            />
                        </p>


                    </motion.div>
                )}

                {/* Admins Section */}
                <div className="mb-5 ">
                    <h2 className="text-2xl font-semibold mb-4 mt-12">Our Admins</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {admins.map((admin) => (
                            <motion.div
                                key={admin._id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="rounded-lg p-4 hover:shadow-xl hover:shadow-slate-500 transition-shadow cursor-pointer shadow-lg shadow-gray-500 bg-gray-100"
                            >
                                <h3 className="text-xl text-black font-semibold">{admin.name}</h3>
                                <p className="text-gray-500">{admin.email}</p>
                                <p className="text-green-600 font-semibold mt-2">Role: {admin.role}</p>
                                {/* <button
                                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    onClick={() => deleteUser(admin._id)}
                                >
                                    Delete
                                </button> */}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Users Section */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4 mt-12">Our Users</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {users.map((user) => (
                            <motion.div
                                key={user._id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="cursor-pointer shadow-lg shadow-slate-500 bg-gray-100 rounded-lg p-4 hover:shadow-xl transition-shadow hover:shadow-slate-500"
                            >
                                <h3 className="text-xl text-black font-semibold">{user.name}</h3>
                                <p className="text-gray-500">{user.email}</p>

                                <div className="flex justify-between">
                                    <p className="text-blue-600 font-semibold mt-2">Role: {user.role}</p>

                                    <div>
                                        <span onClick={() => deleteUser(user._id)}>
                                            <lord-icon className="icon w-10" src="https://cdn.lordicon.com/hwjcdycb.json" trigger="hover" stroke="bold" />
                                        </span>
                                        <span>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/fikcyfpp.json"
                                                trigger="hover"
                                            >
                                            </lord-icon>
                                        </span>
                                    </div>

                                </div>

                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}
