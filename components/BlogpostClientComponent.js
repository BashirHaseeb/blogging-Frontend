"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CopyButton from "./CopyButton";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BlogpostClientComponent = ({ blog }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null for initial loading state
    const router = useRouter();

    useEffect(() => {
        // Client-side authentication check
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsAuthenticated(false);
                router.push("/login");
            } else {
                setIsAuthenticated(true);
            }
        }
    }, [router]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Render a fallback until authentication is determined
    }

    if (!isAuthenticated) {
        return null;
    }

    const renderers = {
        code({ node, inline, className, children, ...props }) {
            const language = className?.replace(/language-/, "") || "bash";
            const codeString = String(children).replace(/\n$/, "");

            return !inline ? (
                <div className="relative">
                    <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={language}
                        PreTag="div"
                        {...props}
                    >
                        {codeString}
                    </SyntaxHighlighter>
                    <CopyButton code={codeString} />
                </div>
            ) : (
                <code {...props}>{children}</code>
            );
        },
    };

    return (
        <div>
            <img
                src={blog.image || "/path/to/default/image.jpg"}
                className="w-full h-[400px] object-cover mb-6"
                alt="Blog Image"
            />

            <div className="max-w-4xl mx-auto py-10 px-5">
                <div className="border-b pb-4 mb-6">
                    <h1 className="text-3xl font-bold">{blog.title}</h1>
                    <p className="border-l-4 pl-2 text-sm italic mt-2">
                        {blog.description}
                    </p>
                    <p className="text-sm mt-1">
                        <span className="italic text-lg font-semibold">By:</span>{" "}
                        {blog.author} on {blog.date}
                    </p>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown components={renderers}>{blog.content}</ReactMarkdown>
                </div>

                <div className="mt-8 border-t pt-4">
                    <p className="text-sm">
                        Slug: <span className="font-mono text-blue-600">{blog.slug}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlogpostClientComponent;
