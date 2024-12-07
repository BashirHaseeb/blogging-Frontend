"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TypewriterEffect from "@/components/Typewritter";

export default function BlogClientComponent({ blogs }) {

    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsAuthenticated(false);
                router.push("/login");
            } else {
                setIsAuthenticated(true);
            }
        };

        checkAuth();
    }, [router]);

    if (!isAuthenticated) {
        return null; // Optionally render a loading spinner
    }

    return (
        <div className="min-h-screen">
            <section className="container mx-auto px-4 py-6">
                <div className="flex flex-col-reverse md:justify-center items-center gap-6 text-4xl font-bold text-center mb-20 p-2 pb-4 border-b-2 ">

                    <TypewriterEffect
                        texts={[
                            " Abdullah's Blog hub",
                        ]}
                    />
                    <img className="w-20 md:w-40 rounded-full" src="/logo.webp" alt="" />
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-10 md:px-24">
                    {blogs.map((blog) => (
                        <div
                            key={blog.slug}
                            className="cursor-pointer rounded-lg hover:shadow-xl transform transition-all hover:scale-105 border duration-300 border-gray-500 hover:border-yellow-300 hover:border-2 relative mb-14 shadow-lg">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="px-4 py-2 mb-14">
                                <h2 className="text-lg font-semibold mb-2">{blog.title}</h2>
                                <p className="text-sm mb-4">{blog.description}</p>
                                <div className="flex justify-between items-center font-semibold text-sm">
                                    <span>
                                        <span className="font-normal">By: </span> {blog.author}
                                    </span>
                                    <span>{blog.date}</span>
                                </div>
                            </div>
                            <div className="flex justify-center items-center my-1 mb-2 absolute bottom-1 w-full">
                                <Button variant="outline">
                                    <Link href={`/blogpost/${blog.slug}`}>Read More</Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
